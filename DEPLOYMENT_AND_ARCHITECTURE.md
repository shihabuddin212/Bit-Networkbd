# Bitnetworkbd Ltd. - Architecture & Deployment Guide

This documentation provides a comprehensive operational overview of the **Bitnetworkbd Ltd.** website. It explains the technology stack, mock database model, client-side routing logic, and system architecture, followed by a step-by-step guide for hosting on a **Linux Ubuntu Server** behind an **Nginx reverse proxy**, along with domain mapping, SSL setup, and full **GitHub production repository push guidelines**.

---

## 1. Technology Stack Overview

The application is built as a **Single Page Application (SPA)** following modern, highly scalable frontend development standards.

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Core Framework** | React 19.x & TypeScript | Structural UI rendering and strictly typed script interfaces. |
| **Project Build Tool** | Vite 8.x | High-performance bundling and Hot Module Replacement (HMR). |
| **Routing System** | React Router Dom v7 | Client-side page navigation and sub-path loading. |
| **Styling Engine** | Vanilla CSS3 (Custom Variables) | A unified, lightweight design system based on dynamic CSS variables for theme management (Day & Night modes). |
| **Icon Library** | Lucide React | Modern, customizable vector icon components. |
| **Interactive Utilities** | React CountUp & Intersection Observer | Smooth number counters and scroll-triggered animations. |

---

## 2. System Architecture & Folder Layout

The project layout organizes routing, shared components, global hooks, and data definitions in isolated modules:

```text
bit-networkbd/
├── public/                 # Static media assets (e.g. RMC_Prize.jpg, favicon)
├── src/
│   ├── admin/              # Admin Panel Dashboard, logins, and settings
│   │   ├── sections/       # Tab views: Services, Offers, Articles, Pricing, Coverage, Messages, Testimonials
│   │   ├── AdminLogin.tsx  # Secure login portal (Bit@admin1234) with session timeout
│   │   ├── AdminPanel.tsx  # Admin desktop layout shell & section router
│   │   └── admin.css       # Dedicated dashboard custom styling
│   ├── components/         # Shared presentation layouts (Navbar, Footer, Topbar, PopupBanner, etc.)
│   ├── hooks/              # Global custom hooks (useDataStore.ts, useTheme.ts)
│   ├── pages/              # User-facing landing pages (Home, Offers, Referral, Pricing, Contact, Policy pages)
│   ├── utils/
│   │   └── db.ts           # Mock database controller & global storage keys
│   ├── App.tsx             # Root routing router config & SiteLayout wrapper
│   ├── index.css           # Global custom theme tokens (Day & Night setups)
│   └── main.tsx            # Initial entry point mounting React
├── package.json            # Executable build scripts & metadata
└── DEPLOYMENT_AND_ARCHITECTURE.md # Architecture & deployment documentation
```

---

## 3. Database Layer: Client-Side Stateful Mocking

To eliminate complex API backend components for this setup, the project implements a **local client-side mock datastore** utilizing `localStorage`.

### How Data Synchronization Works
1. **Initial Hydration (`db.ts`):** 
   When the browser loads a page, `db.ts` checks for existing records in the browser's `localStorage` (keys: `rm_services`, `rm_offers`, `rm_articles`, `rm_pricing`, `rm_coverage`, `rm_messages`, `rm_testimonials`). If absent, it hydrates the cache using the predefined static arrays inside the file.
2. **Global Event Broadcasting:**
   Updates made in the admin panel write directly to `localStorage` using `setStored<T>()` and dispatch a window-level custom event helper:
   ```typescript
   window.dispatchEvent(new Event('local-db-updated'));
   ```
3. **Reactive State Synchronization (`useDataStore.ts` & `useEffect` hook wrappers):**
   Components (like the client `OffersPage` or `PricingPage`) register an event listener for `local-db-updated` upon mounting. When triggered, they automatically fetch the modified payloads, causing the UI to re-render dynamically.

---

## 4. Routing Engine & Navigation Details

Navigation is handled via **React Router DOM v7** on the client side. No server-side routing is processed by node.

### A. Routing Split
Inside `src/App.tsx`, routes are split into two flows based on the path:
* **Admin Control Flow:** If the current path is prefixed with `/admin`, it bypasses the standard layout shell and renders the `<AdminPage />` directly.
* **Client Portal Flow:** Renders the main user site template (including `<PopupBanner />`, `<TopBar />`, `<Navbar />`, `<main>` view window, `<Footer />`, and `<ScrollTopBtn />`).

```typescript
function AppRoutes() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  if (isAdmin) {
    return <AdminPage />;
  }
  return <SiteLayout />;
}
```

### B. Admin Authorization Access & 2-Hour Session Security
* Authorization is configured in `src/admin/AdminPage.tsx` using `localStorage` flags (`rm_admin_auth` and timestamp `rm_admin_auth_timestamp`).
* **Credentials:** `admin@bitnetworkbd.com` / `Bit@admin1234`
* **Session Duration:** 2 hours maximum duration before automatic timeout and logout.

---

## 5. Linux Ubuntu Server Production Deployment Guide

Vite compiles static CSS, JavaScript, and HTML into the `dist` directory. Instead of running a node execution server in production, you compile the project and serve it via **Nginx** for optimal performance and safety.

### Step 1: Install Dependencies on Ubuntu
Connect to your Ubuntu server via SSH and install Node.js and Nginx:
```bash
# Update local packages
sudo apt update && sudo apt upgrade -y

# Install Node.js (v20 LTS recommended)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Nginx and Git
sudo apt-get install -y nginx git
```

### Step 2: Clone & Pre-build the Application on Server
1. Clone your project repository into the server (`/var/www/` layout is standard):
   ```bash
   sudo git clone https://github.com/shihabuddin212/Bit-Networkbd.git /var/www/bit-networkbd
   cd /var/www/bit-networkbd
   ```
2. Install npm dependencies and compile:
   ```bash
   sudo npm install
   sudo npm run build
   ```
   *Note: This generates a distributable static compilation in `/var/www/bit-networkbd/dist`, which Nginx will serve directly.*

---

## 6. Nginx Web Server Setup

Since React Router handles routing dynamically within the browser (client-side), **Nginx must redirect all sub-path page requests (like `/offers` or `/pricing`) back to `/index.html`**.

### Step 1: Add a New Nginx Configuration Block
Create a virtual host configuration file for Nginx:
```bash
sudo nano /etc/nginx/sites-available/bitnetworkbd
```

### Step 2: Paste the Configuration Block
Paste the following template (substitute `bitnetworkbd.com` with your domain name):
```nginx
server {
    listen 80;
    listen [::]:80;

    server_name bitnetworkbd.com www.bitnetworkbd.com;

    # Point to the Vite static compiled folder
    root /var/www/bit-networkbd/dist;
    index index.html;

    # Gzip Compression configurations for fast load times
    gzip on;
    gzip_vary on;
    gzip_min_length 10240;
    gzip_proxied any;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/x-javascript application/xml;
    gzip_disable "MSIE [1-6]\.";

    # Cache Control for Static Assets
    location ~* \.(?:ico|css|js|gif|jpe?g|png|svg|woff2?|eot|ttf|otf)$ {
        expires 6M;
        access_log off;
        add_header Cache-Control "public, max-age=15552000, inherit";
    }

    # Core Router Redirect (CRITICAL FOR REACT CLIENT ROUTER)
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Custom Error Pages
    error_page 404 /index.html;
}
```

### Step 3: Enable the Site & Restart Nginx
1. Link your setup configuration to the enabled site modules:
   ```bash
   sudo ln -s /etc/nginx/sites-available/bitnetworkbd /etc/nginx/sites-enabled/
   ```
2. Verify syntax configuration validity:
   ```bash
   sudo nginx -t
   ```
3. Restart Nginx to load changes:
   ```bash
   sudo systemctl restart nginx
   ```

---

## 7. Connecting Your Domain

To point a custom domain name (e.g., `bitnetworkbd.com`) to your Ubuntu server:

1. **Log in** to your domain registrar dashboard (e.g., Namecheap, GoDaddy, Cloudflare, etc.).
2. Navigate to the **DNS Zone Editor / Advanced DNS Settings**.
3. Create the following records:
   - **Type A Record:**
     * Name/Host: `@`
     * Value: `<Your-Server-Public-IP-Address>`
     * TTL: `Automatic / 3600`
   - **Type CNAME Record:**
     * Name/Host: `www`
     * Value: `bitnetworkbd.com` (your main domain)
     * TTL: `Automatic / 3600`
4. Wait for DNS propagation (normally takes 5 minutes up to a couple of hours globally).

---

## 8. Installing Let's Encrypt SSL (HTTPS Security)

1. Install **Certbot** and its Nginx module wrapper:
   ```bash
   sudo apt install certbot python3-certbot-nginx -y
   ```
2. Fetch your secure SSL certificate:
   ```bash
   sudo certbot --nginx -d bitnetworkbd.com -d www.bitnetworkbd.com
   ```
3. When prompted, select **Redirect** to route all HTTP traffic automatically to HTTPS.
4. Test auto-renewal:
   ```bash
   sudo certbot renew --dry-run
   ```

---

## 9. GitHub Production Repository Push Guide

To manage source control and push your production-level code to GitHub using the terminal, follow the steps below:

### Option A: Create a New Repository from the Command Line
If you are initializing a fresh git repository locally:

```bash
# 1. Add README title
echo "# Bit-Networkbd" >> README.md

# 2. Initialize Git repository
git init

# 3. Stage all files (or README)
git add .

# 4. Create initial commit
git commit -m "first commit"

# 5. Set main branch
git branch -M main

# 6. Link to GitHub remote repository
git remote add origin https://github.com/shihabuddin212/Bit-Networkbd.git

# 7. Push production code to GitHub
git push -u origin main
```

---

### Option B: Push an Existing Repository from the Command Line
If your local project is already a Git repository and you want to connect and push to the new remote repo:

```bash
# 1. Add files and commit changes
git add .
git commit -m "Production release for Bitnetworkbd Ltd"

# 2. Add remote origin URL
git remote add origin https://github.com/shihabuddin212/Bit-Networkbd.git

# 3. Rename current branch to main
git branch -M main

# 4. Push to remote main branch
git push -u origin main
```

---

*Your Bitnetworkbd Ltd React application is now production-ready, fully tested, documented, and configured for git deployment!*
