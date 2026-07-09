# RM Communication Ltd. - Architecture & Deployment Guide

This documentation provides a comprehensive operational overview of the **RM Communication Ltd.** website. It explains the technology stack, mock database model, client-side routing logic, and system architecture, followed by a step-by-step guide for hosting on a **Linux Ubuntu Server** behind an **Nginx reverse proxy**, along with domain mapping and SSL setup.

---

## 1. Technology Stack Overview

The application is built as a **Single Page Application (SPA)** following modern, highly scalable frontend development standards.

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Core Framework** | React 19.x & TypeScript | Structural UI rendering and strictly typed script interfaces. |
| **Project Build Tool** | Vite 8.x | High-performance bundling and Hot Module Replacement (HMR). |
| **Routing System** | React Router Dom v7 | Client-side page navigation and sub-path loading. |
| **Styling Engine** | Vanilla CSS3 (Custom Variables) | A unified, lightweight design system based on dynamic CSS variables for theme management. |
| **Icon Library** | Lucide React | Modern, customizable vector icon components. |
| **Interactive Utilities** | React CountUp & Intersection Observer | Smooth number counters and scroll-triggered animations. |

---

## 2. System Architecture & Folder Layout

The project layout organizes routing, shared components, global hooks, and data definitions in isolated modules:

```text
rm-communication-ltd/
├── public/                 # Static media assets (e.g. RMC_Prize.jpg, favicon)
├── src/
│   ├── admin/              # Admin Panel Dashboard, logins, and settings
│   │   ├── sections/       # Tab views: Services, Offers, Articles, Pricing, Coverage
│   │   ├── AdminLogin.tsx  # Secure mock-login portal
│   │   ├── AdminPanel.tsx  # Admin desktop layout shell & section router
│   │   └── admin.css       # Dedicated dashboard custom styling
│   ├── components/         # Shared presentation layouts (Navbar, Footer, Topbar, etc.)
│   ├── hooks/              # Global custom hooks (useDataStore.ts, useTheme.ts)
│   ├── pages/              # User-facing landing pages (Home, Offers, Pricing, Policy pages)
│   ├── utils/
│   │   └── db.ts           # Mock database controller & global storage keys
│   ├── App.tsx             # Root routing router config
│   ├── index.css           # Global custom theme tokens (day/night setups)
│   └── main.tsx            # Initial entry point mounting React
├── package.json            # Executable build scripts & metadata
└── DEPLOYMENT_AND_ARCHITECTURE.md # (This file)
```

---

## 3. Database Layer: Client-Side Stateful Mocking

To eliminate complex API backend components for this static setup, the project implements a **local client-side mock datastore** utilizing `localStorage`.

### How Data Synchronization Works
1. **Initial Hydration (`db.ts`):** 
   When the browser loads a page, `db.ts` checks for existing records in the browser's `localStorage` (keys: `rm_services`, `rm_offers`, `rm_articles`, etc.). If absent, it hydrates the cache using the predefined static arrays inside the file (`defaultOffers`, `defaultPricingPlans`, etc.).
2. **Global Event Broadcasting:**
   Updates made in the admin panel write directly to `localStorage` using `setStored<T>()` and dispatch a window-level custom event helper:
   ```typescript
   window.dispatchEvent(new Event('local-db-updated'));
   ```
3. **Reactive State Synchronization (`useDataStore.ts` & `useEffect` hook wrappers):**
   Components (like the client `OffersPage` or `PricingPage`) register an event listener for `local-db-updated` upon mounting. When triggered, they automatically fetch the modified payloads, causing the UI to re-render.

---

## 4. Routing Engine & Navigation Details

Navigation is handled via **React Router DOM v7** on the client side. No server-side routing is processed by node.

### A. Routing Split
Inside `src/App.tsx`, routes are split into two flows based on the path:
* **Admin Control Flow:** If the current path prefixed with `/admin`, it bypasses the standard layout shell and renders the `<AdminPage />` directly.
* **Client Portal Flow:** Renders the main user site template (including `<TopBar />`, `<Navbar />`, `<main>` view window, `<Footer />`, and `<ScrollTopBtn />`).

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

### B. Admin Authorization Access (Mock Auth Flow)
* Authorization is configured in `src/admin/AdminPage.tsx` using `localStorage` flags (`rm_admin_auth`).
* If not authenticated, the app prompts the user with the `<AdminLogin />` page. Once correct credentials match, the authentication flag is marked as `true`, rendering the interactive `<AdminPanel />` section manager.

---

## 5. Linux Ubuntu Server Production Deployment Guide

Vite designs the output to compile entirely into static CSS, JavaScript, and HTML. Therefore, instead of running a heavy node execution process in production, you can compile the project locally or on-server and serve it via **Nginx** for optimal latency and safety.

### Step 1: Install Dependencies on Ubuntu
Connect to your Ubuntu server via SSH and install Node.js and Nginx:
```bash
# Update local packages
sudo apt update && sudo apt upgrade -y

# Install Node.js (V20 LTS recommended)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Nginx and Git
sudo apt-get install -y nginx git
```

### Step 2: Clone & Pre-build the Application on Server
1. Clone your project repository into the server (`/var/www/` layout is standard):
   ```bash
   sudo git clone https://github.com/your-username/rm-communication-ltd.git /var/www/rm-comm
   cd /var/www/rm-comm
   ```
2. Install npm dependencies and compile:
   ```bash
   sudo npm install
   sudo npm run build
   ```
   *Note: This generates a distributable, highly compressed folder named `dist` (located at `/var/www/rm-comm/dist`), which Nginx will serve directly.*

---

## 6. Nginx Web Server Setup

Since React Router handles routing dynamically within the browser (client-side), **Nginx must redirect all sub-path page requests (like `/offers` or `/pricing`) back to `/index.html`**. Otherwise, Nginx will attempt to look for physical directories (e.g. `/offers/index.html`) on the server directory and return a **404 Not Found** error.

### Step 1: Add a New Nginx Configuration Block
Create a virtual host configuration file for Nginx:
```bash
sudo nano /etc/nginx/sites-available/rmcommunication
```

### Step 2: Paste the Configuration Block
Paste the following template (substitute `example.com` with your real domain name):
```nginx
server {
    listen 80;
    listen [::]:80;

    server_name example.com www.example.com;

    # Point to the Vite static compiled folder
    root /var/www/rm-comm/dist;
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
   sudo ln -s /etc/nginx/sites-available/rmcommunication /etc/nginx/sites-enabled/
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

To point a custom domain name (e.g., `rmcommunicationltd.com`) to your Ubuntu server:

1. **Log in** to your domain registrar dashboard (e.g., Namecheap, GoDaddy, Cloudflare, etc.).
2. Navigate to the **DNS Zone Editor / Advanced DNS Settings**.
3. Create the following records:
   - **Type A Record:**
     * Name/Host: `@`
     * Value: `<Your-Server-Public-IP-Address>`
     * TTL: `Automatic / 3600`
   - **Type CNAME Record:**
     * Name/Host: `www`
     * Value: `example.com` (your main domain)
     * TTL: `Automatic / 3600`
4. Wait for propagation (DNS changes normally take from 5 minutes up to a couple of hours globally).

---

## 8. Installing Let's Encrypt SSL (HTTPS Security)

Having an SSL certificate is mandatory for SEO, secure password inputs in the admin panel, and browser compliance.

1. Install **Certbot** and its Nginx module wrapper:
   ```bash
   sudo apt install certbot python3-certbot-nginx -y
   ```
2. Fetch your secure SSL certificate:
   ```bash
   sudo certbot --nginx -d example.com -d www.example.com
   ```
3. Certbot will prompt you with questions (e.g., email address, accepting terms). When asked whether to redirect all HTTP traffic to HTTPS, select **Redirect** (usually option `2`). This configures Nginx automatically to route `http://` secure requests into `https://`.
4. Test the certificate auto-renewal cronjob:
   ```bash
   sudo certbot renew --dry-run
   ```
   *Certbot automatically sets up a background script to renew your certificates automatically before they expire (every 90 days).*

Your RM Communication React website is now securely hosted, configured for client-side routing, and running at `https://example.com`!
