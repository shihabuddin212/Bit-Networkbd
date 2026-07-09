import React from 'react';
import * as Icons from 'lucide-react';

export interface ServiceItem {
    id: string;
    iconName: string;
    title: string;
    description: string;
    badge: string | null;
}

export interface OfferItem {
    id: string;
    title: string;
    badge: string;
    description: string;
    iconName: string;
    highlights: string[];
    ctaText: string;
    ctaLink: string;
}

export interface ArticleItem {
    id: string;
    title: string;
    category: 'Home' | 'Enterprise' | 'Support' | 'Guide';
    date: string;
    readTime: string;
    author: string;
    summary: string;
    content: string[];
    iconName: string;
    featuredPlan?: string;
    ctaText?: string;
    ctaLink?: string;
}

export interface PricingPlanItem {
    id: string;
    name: string;
    speed: string;
    price: number;
    period: string;
    features: string[];
    featured: boolean;
    badge?: string;
    color: string;
}

export interface MessageItem {
    id: string;
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    date: string;
    status: 'unread' | 'read' | 'replied' | 'resolved';
    notes?: string;
}

// Icon Helper Component
export function renderIcon(iconName: string, props: any = {}) {
    const IconComponent = (Icons as any)[iconName];
    if (!IconComponent) {
        // fallback
        const Fallback = (Icons as any)['Wifi'];
        return React.createElement(Fallback, props);
    }
    return React.createElement(IconComponent, props);
}

// Default initial data
const defaultServices: ServiceItem[] = [
    {
        id: 's-1',
        iconName: 'Wifi',
        title: 'Home Broadband',
        description: 'High-speed fiber internet for residential users. Stream, game, and browse without limits.',
        badge: 'Popular',
    },
    {
        id: 's-2',
        iconName: 'Shield',
        title: 'Network Security',
        description: 'Enterprise-grade firewall and threat protection to keep your network safe 24/7.',
        badge: null,
    },
    {
        id: 's-3',
        iconName: 'Building2',
        title: 'Corporate / SME Internet',
        description: 'Scalable business internet solutions tailored for SMEs and large corporations.',
        badge: 'Business',
    },
    {
        id: 's-4',
        iconName: 'Server',
        title: 'Dedicated Server Hosting',
        description: 'High-performance dedicated servers with 99.9% uptime and managed support.',
        badge: null,
    },
    {
        id: 's-5',
        iconName: 'Network',
        title: 'Network Solutions',
        description: 'Complete network infrastructure design, installation, and management services.',
        badge: null,
    },
    {
        id: 's-6',
        iconName: 'Camera',
        title: 'CCTV System Solutions',
        description: 'Smart surveillance systems with remote monitoring and cloud storage capabilities.',
        badge: null,
    },
    {
        id: 's-7',
        iconName: 'Database',
        title: 'Data Connectivity',
        description: 'Reliable point-to-point and multi-site data connectivity for seamless operations.',
        badge: null,
    },
    {
        id: 's-8',
        iconName: 'Globe',
        title: 'Dedicated Internet',
        description: 'Unshared, dedicated bandwidth with guaranteed symmetric speeds for critical use.',
        badge: 'Enterprise',
    },
];

const defaultOffers: OfferItem[] = [
    {
        id: 'refer-and-win',
        title: 'রেফার করুন, পুরষ্কার জিতুন',
        badge: 'New Campaign',
        description: 'Rm Communication Ltd নিয়ে এলো সকল গ্রাহকদের জন্য রেফারাল প্রোগ্রাম। এখন সংযোগ নতুন কাউকে রেফার করেই পেয়ে যান আকর্ষণীয় সব পুরস্কার ও বিল ডিস্কাউন্ট।',
        iconName: 'Trophy',
        highlights: [
            'নতুন সংযোগ রেফারে আকর্ষনীয় সব পুরষ্কার',
            'রেফারে নতুন সংযোগ নিলেই ৫০০ টাকা ডিস্কাউন্ট',
            'সহজ ৩টি ধাপে রেফার করার প্রক্রিয়া'
        ],
        ctaText: 'বিস্তারিত দেখুন',
        ctaLink: '/offers/referral'
    },
    {
        id: 'double-bandwidth',
        title: 'Double Bandwidth Boost',
        badge: 'Limited Time',
        description: 'Get twice the speed for the first 2 months when you prepay for 6 months on any retail packages. Ideal for experiencing high-speed fiber.',
        iconName: 'Zap',
        highlights: [
            'Applicable on Silver+ to Sapphire+ plans',
            'Free upgraded optical client terminal',
            'Zero throttle contention guarantee'
        ],
        ctaText: 'View Rates & Get Boost',
        ctaLink: '/pricing'
    },
    {
        id: 'free-gigabit-router',
        title: 'Free Dual-Band Gigabit Router',
        badge: 'Popular',
        description: 'Subscribe to our Sapphire+ (200 Mbps) or higher standard packages and receive a premium dual-band Gigabit Wi-Fi router for free.',
        iconName: 'Gift',
        highlights: [
            'Premium dual-band (2.4GHz & 5GHz) router',
            'Supports high-density spatial coverage',
            'Fully owned and maintained by RM'
        ],
        ctaText: 'Choose Premium Plan',
        ctaLink: '/pricing'
    },
    {
        id: 'zero-installation',
        title: 'Zero Installation Fee Campaign',
        badge: 'Hot Deal',
        description: 'Prepay for 3 months in advance on any RM fiber optic connection and completely waive the standard installation & setup charges.',
        iconName: 'Award',
        highlights: [
            'Saves 1,500 TK setup fees',
            'Includes free optical fiber cable layout',
            'Priority fast-track activation status'
        ],
        ctaText: 'Claim Free Installation',
        ctaLink: '/contact'
    }
];

const defaultArticles: ArticleItem[] = [
    {
        id: 'why-choose-rm-com',
        title: "Why RM Communication Ltd is Dhaka's Premier Choice: Speed, Security, and Compliance",
        category: 'Guide',
        date: 'July 7, 2026',
        readTime: '6 min read',
        author: 'RM Executive Editorial',
        iconName: 'Shield',
        summary: "A comprehensive review of how RM Communication's premium internet packages, BTRC-compliant operations, robust privacy policies, and transparent terms of service create the ultimate worry-free connectivity experience.",
        content: [
            "In today's demanding digital ecosystem, an internet service provider (ISP) must deliver more than just megabits per second. True quality lies in the combination of reliable speed, ironclad security, transparent rules, and compliance with national guidelines. RM Communication Ltd. stands out as a leading telecom provider in Dhaka, offering an ecosystem that beautifully aligns state-of-the-art services with BTRC regulatory standards.",
            "Let's talk about performance first. RM Communication delivers pure, unshared optical fiber connections straight to your router. Our retail packages—ranging from Silver+ (50 Mbps for 890 TK/month) to Sky+ (300 Mbps for 4,200 TK/month)—are priced according to official BTRC tariff guidelines, ensuring no arbitrary price hikes. Higher-tier options like the Sapphire+ (200 Mbps) or Star+ (250 Mbps) include premium dual-band Wi-Fi routers for free, optimizing your indoor spatial coverage and eliminating lagging. For business clients, our Dedicated Internet Access (DIA) provides a 1:1 contention ratio with customized firewall policies to ensure smooth corporate transitions.",
            "Transparency is another cornerstone of our service, detailed clearly within our Terms and Conditions. To maintain network integrity and prevent cyber security liabilities, we enforce a strict policy against connection reselling and third-party sharing. This keeps our fiber nodes clean, ensures each home gets 100% of their allocated bandwidth, and aligns with subscriber identification protocols. All hardware provided remains company property, backed by standard SLAs to guarantee immediate troubleshooting or replacement if hardware issues arise.",
            "Furthermore, our Privacy Policy is fully optimized to align with the Information and Communication Technology (ICT) Act 2006 (Amended) and the Cyber Security Act of Bangladesh. By employing secured databases, firewall interceptions, and strictly authorized staff access, we guarantee your personal credentials and browsing security are protected at all times. While we cooperate transparently with official law enforcement warrants under BTRC regulations, we never share, lease, or sell your subscriber details to advertising networks or third-party brokers.",
            "When you choose RM Communication Ltd., you are investing in a licensed, lawful, and lightning-fast digital backbone. From our 24/7 dedicated support staff to our seamless online client billing portals, every component of RM is engineered to give you complete peace of mind. Check our pricing page to choose the right package for your home or business today."
        ],
        featuredPlan: 'Sky+ (300 Mbps Core Fiber)',
        ctaText: 'Explore All Packages',
        ctaLink: '/pricing'
    },
    {
        id: 'fiber-advantage',
        title: "Why RM Fiber Optic is Changing Dhaka's Home Internet Experience",
        category: 'Home',
        date: 'July 5, 2026',
        readTime: '5 min read',
        author: 'RM Technology Insights',
        iconName: 'Wifi',
        summary: 'Discover the technical and general benefits of true fiber-to-the-home (FTTH) networks, symmetric bandwidth, and how our premium retail packages exceed local standards.',
        content: [
            "For home internet users in Dhaka, a stable internet connection is no longer a luxury—it is the central nervous system of daily life. From remote work and high-definition video conferencing to competitive gaming, the speed and consistency of your connection decide your productivity and recreation quality. This is where RM Communication Ltd.'s Fiber-To-The-Home (FTTH) network excels.",
            "Unlike traditional broadband providers that use low-cost copper coaxial cables that degrade speed, RM Communication uses pure glass fiber optic cabling directly into your residence. This technology supports symmetric speeds, meaning your upload speed is just as fast as your download speed. Whether you are sending massive assets for work or streaming live gaming streams on YouTube, you experience zero throttling.",
            "Our most popular package, Platinum+ (100 Mbps for 1,260 TK/month), represents the ideal sweet spot for modern smart homes. It offers ample overhead so that multiple devices can stream 4K content, run corporate VPNs, and download large files concurrently without any latency spikes. All retail packages, starting from Silver+ (50 Mbps) up to Sky+ (300 Mbps), receive unthrottled fiber optical pipes directly from our main switches, backed by automatic redundancy routings.",
            "Choosing RM Communication means joining a network engineered for the future. We provide free installation, premium optical network terminals (ONUs), and 24/7 dedicated support staff, making it the most sensible, high-value decision for your household digital needs."
        ],
        featuredPlan: 'Platinum+ (100 Mbps)',
        ctaText: 'View Retail Packages',
        ctaLink: '/pricing'
    },
    {
        id: 'sme-connectivity',
        title: 'Dedicated vs. Shared Bandwidth: Driving SME and Corporate Scalability',
        category: 'Enterprise',
        date: 'June 28, 2026',
        readTime: '6 min read',
        author: 'RM Network Engineering',
        iconName: 'Building2',
        summary: 'An depth comparison of dedicated internet access (DIA) versus consumer broadband packages, revealing why SME growth requires guaranteed Service Level Agreements (SLAs).',
        content: [
            "In the corporate landscape, downtime translates directly into lost revenue. If your office connection slows down during high-traffic hours, communication lines halt, web operations fail, and customer satisfaction drops. Many businesses mistakenly rely on consumer-grade broadband packages, unaware of the contention ratios that govern them.",
            "Consumer packages operate on a shared bandwidth system, where your bandwidth is distributed among neighborhood users. During peak hours, speeds can drop. For SMEs and corporate offices, RM Communication Ltd. offers Dedicated Internet Access (DIA). Our Dedicated Internet provides a direct, unshared point-to-point link with a 1:1 contention ratio. This guarantees you get 100% of the purchased bandwidth at all times, with zero drops.",
            "In addition, our Dedicated Enterprise packages feature enterprise-grade firewall protection, redundant multi-routing fiber backbones, and guaranteed Service Level Agreements (SLAs). We maintain a 99.9% network uptime commitment monitored by our Network Operations Center (NOC) in Dhaka. Your connectivity is also fortified against cybersecurity loops, ensuring your corporate server hosting remains clean.",
            "By selecting a dedicated BTRC-approved SME package from RM Communication, you invest in predictable performance. We assign a dedicated network account manager to your corporate subscription, managing everything from routing configurations to hardware upgrades."
        ],
        featuredPlan: 'Enterprise Dedicated Pack',
        ctaText: 'Contact Enterprise Team',
        ctaLink: '/contact'
    },
    {
        id: 'wifi-optimization',
        title: 'How to Optimize Your Home Wi-Fi: Practical Tips from RM Support Specialists',
        category: 'Support',
        date: 'June 20, 2026',
        readTime: '4 min read',
        author: 'RM Customer Care Team',
        iconName: 'HelpCircle',
        summary: 'Is your Wi-Fi lagging in the bedroom? Read our technical support guide on how to place routers, avoid electronic interference, and maximize optical fiber speeds.',
        content: [
            "You just subscribed to one of our premium fiber packages, but you notice your speeds are slower when you go into the far corner of your home. Before requesting a technician visit, it is critical to understand that Wi-Fi signal strength is heavily influenced by physical layout barriers.",
            "Wi-Fi routers transmit data using radio frequencies, which degrade when passing through brick walls, structural concrete pillars, glass partitions, and metal mirrors. To solve this, always place your router in a high, central location of your flat rather than hidden inside cupboards or low on the floor. Keeping it away from electric ovens, cordless phones, and smart appliances also prevents signal crosstalk.",
            "Another common problem is channel noise. In dense Dhaka neighborhoods, dozens of Wi-Fi routers operate on matching frequencies. Our customer support recommends switching older routers to the 5GHz frequency band, which offers significantly wider channels and less interference compared to the crowded 2.4GHz band. Higher packages, like Sapphire+ (200 Mbps) and Star+ (250 Mbps), include dual-band Wi-Fi routers for free to automatically manage this traffic.",
            "At RM Communication, we configure optimized router set-ups during installation. If you still encounter dead zones, our technical crew offers full-home mesh Wi-Fi design surveys to set up seamless roaming routers across your entire premises."
        ],
        featuredPlan: 'Sapphire+ (200 Mbps with Free Dual-Band Router)',
        ctaText: 'Talk to Support Team',
        ctaLink: '/contact'
    },
    {
        id: 'cybersecurity-isp',
        title: 'The Role of Modern ISPs in Securing Business and Personal Data',
        category: 'Guide',
        date: 'June 12, 2026',
        readTime: '7 min read',
        author: 'RM Information Security Office',
        iconName: 'Shield',
        summary: 'How RM Communication integrates security firewalls, filters malicious traffic, and protects subscriber privacy under the Bangladesh Cyber Security guidelines.',
        content: [
            "The modern internet is filled with cybersecurity alerts, credential harvesters, and ransomware threats. While users are often instructed to install antivirus systems on their devices, the first line of defense should be configured at the internet gateway level—the Internet Service Provider (ISP).",
            "At RM Communication Ltd., network security is not an optional addon; it is embedded into our fiber infrastructure. We run active firewall filtering to intercept known malicious domains, phishing payloads, and botnet controls at our core gate before they reach your router. This provides background shield coverage for all household and business devices.",
            "Furthermore, our Network Solutions department works directly with SMEs to design custom virtual private networks (VPNs), secure intranets, and perimeter defenses. This compliance satisfies the BTRC security licensing parameters and ensures data protection conforming to the Cyber Security laws of Bangladesh.",
            "While we do not log user data contents, our security team works 24/7 to mitigate large DDoS attacks on our enterprise circuits. Keeping your routing paths clean at the source is how RM Communication keeps you connected safely."
        ],
        featuredPlan: 'Enterprise SME Firewall Plans',
        ctaText: 'Explore Business Security',
        ctaLink: '/about'
    }
];

const defaultPricingPlans: PricingPlanItem[] = [
    {
        id: 'p-1',
        name: 'Silver+',
        speed: '50 Mbps',
        price: 890,
        period: 'month',
        features: ['50 Mbps Download', '50 Mbps Upload', 'Unlimited Data', 'Free Installation', 'Email Support'],
        featured: false,
        color: '#94a3b8',
    },
    {
        id: 'p-2',
        name: 'Gold+',
        speed: '80 Mbps',
        price: 1050,
        period: 'month',
        features: ['80 Mbps Download', '80 Mbps Upload', 'Unlimited Data', 'Free Installation', 'Phone Support'],
        featured: false,
        color: '#f59e0b',
    },
    {
        id: 'p-3',
        name: 'Platinum+',
        speed: '100 Mbps',
        price: 1260,
        period: 'month',
        features: ['100 Mbps Download', '100 Mbps Upload', 'Unlimited Data', 'Free Installation', 'Priority Support'],
        featured: true,
        badge: 'Most Popular',
        color: '#00c6ff',
    },
    {
        id: 'p-4',
        name: 'Diamond+',
        speed: '150 Mbps',
        price: 1575,
        period: 'month',
        features: ['150 Mbps Download', '150 Mbps Upload', 'Unlimited Data', 'Free Installation', '24/7 Support'],
        featured: false,
        color: '#60a5fa',
    },
    {
        id: 'p-5',
        name: 'Sapphire+',
        speed: '200 Mbps',
        price: 2100,
        period: 'month',
        features: ['200 Mbps Download', '200 Mbps Upload', 'Unlimited Data', 'Free Router', '24/7 Priority Support'],
        featured: false,
        color: '#818cf8',
    },
    {
        id: 'p-6',
        name: 'Star+',
        speed: '250 Mbps',
        price: 3150,
        period: 'month',
        features: ['250 Mbps Download', '250 Mbps Upload', 'Unlimited Data', 'Free Router', 'Dedicated Support'],
        featured: false,
        color: '#a78bfa',
    },
    {
        id: 'p-7',
        name: 'Sky+',
        speed: '300 Mbps',
        price: 4200,
        period: 'month',
        features: ['300 Mbps Download', '300 Mbps Upload', 'Unlimited Data', 'Free Router', 'Dedicated Manager'],
        featured: false,
        badge: 'Max Speed',
        color: '#c084fc',
    },
];

const defaultAreas: string[] = [
    'Mirpur', 'Pallabi', 'Kafrul', 'Agargaon', 'Sher-e-Bangla Nagar',
    'Mohammadpur', 'Dhanmondi', 'Kalabagan', 'Green Road', 'Tejgaon',
    'Farmgate', 'Bijoy Sarani', 'Uttara', 'Turag', 'Khilkhet',
    'Badda', 'Rampura', 'Banasree', 'Aftabnagar', 'Gulshan',
    'Banani', 'Niketan', 'Baridhara', 'Bashundhara', 'Demra',
    'Jatrabari', 'Mugda', 'Motijheel', 'Malibagh', 'Shantinagar',
];

const defaultMessages: MessageItem[] = [
    {
        id: 'msg-1',
        name: 'Kazi Mahbub',
        email: 'mahbub@gmail.com',
        phone: '01811223344',
        subject: 'new-connection',
        message: 'Hello, I want to take a new Platinum+ connection at Lalbagh area. Please call me as soon as possible.',
        date: '2026-07-09 14:30',
        status: 'unread',
    },
    {
        id: 'msg-2',
        name: 'Samina Chowdhury',
        email: 'samina.c@yahoo.com',
        phone: '01712345678',
        subject: 'corporate',
        message: 'Looking for a dedicated internet package for our 30-person office in Dhanmondi. Need price list and details about backup links.',
        date: '2026-07-08 17:15',
        status: 'read',
        notes: 'Called Samina and sent corporate pricing proposal via email. Waiting for feedback.'
    }
];

// Helper functions for Database operations
function getStored<T>(key: string, defaultValue: T): T {
    const stored = localStorage.getItem(key);
    if (!stored) {
        localStorage.setItem(key, JSON.stringify(defaultValue));
        return defaultValue;
    }
    try {
        return JSON.parse(stored);
    } catch (error) {
        return defaultValue;
    }
}

function setStored<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
    // Dispatch a storage event so dynamic state hooks in current window can listen
    window.dispatchEvent(new Event('local-db-updated'));
}

export const db = {
    getServices: () => getStored<ServiceItem[]>('rm_services', defaultServices),
    saveServices: (data: ServiceItem[]) => setStored<ServiceItem[]>('rm_services', data),

    getOffers: () => {
        const stored = getStored<OfferItem[]>('rm_offers', defaultOffers);
        // Always sync the refer-and-win offer with the latest defaultOffers data
        // so stale cached versions (e.g. with old company name) are replaced.
        const latestRefer = defaultOffers.find((o) => o.id === 'refer-and-win');
        if (latestRefer) {
            const idx = stored.findIndex((o) => o.id === 'refer-and-win');
            if (idx === -1) {
                const updated = [latestRefer, ...stored];
                setStored<OfferItem[]>('rm_offers', updated);
                return updated;
            } else {
                // Overwrite stale cached entry with fresh defaults
                const updated = [...stored];
                updated[idx] = latestRefer;
                setStored<OfferItem[]>('rm_offers', updated);
                return updated;
            }
        }
        return stored;
    },
    saveOffers: (data: OfferItem[]) => setStored<OfferItem[]>('rm_offers', data),

    getArticles: () => getStored<ArticleItem[]>('rm_articles', defaultArticles),
    saveArticles: (data: ArticleItem[]) => setStored<ArticleItem[]>('rm_articles', data),

    getPricingPlans: () => getStored<PricingPlanItem[]>('rm_pricing', defaultPricingPlans),
    savePricingPlans: (data: PricingPlanItem[]) => setStored<PricingPlanItem[]>('rm_pricing', data),

    getCoverageAreas: () => getStored<string[]>('rm_coverage', defaultAreas),
    saveCoverageAreas: (data: string[]) => setStored<string[]>('rm_coverage', data),

    getMessages: () => getStored<MessageItem[]>('rm_messages', defaultMessages),
    saveMessages: (data: MessageItem[]) => setStored<MessageItem[]>('rm_messages', data),
};
