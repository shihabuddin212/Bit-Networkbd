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

export interface TestimonialItem {
    id: string;
    name: string;
    role: string;
    rating: number;
    text: string;
    initials: string;
    color: string;
}

export function renderIcon(iconName: string, props: any = {}) {
    const IconComponent = (Icons as any)[iconName];
    if (!IconComponent) {
        const Fallback = (Icons as any)['Wifi'];
        return React.createElement(Fallback, props);
    }
    return React.createElement(IconComponent, props);
}

const API_BASE = '/api';

const RESOURCE_MAP: Record<string, string> = {
    services: 'services',
    offers: 'offers',
    articles: 'articles',
    pricing: 'pricing',
    coverage: 'coverage',
    messages: 'messages',
    testimonials: 'testimonials',
};

// In-memory cache. Starts empty; populated from the API as soon as it responds.
const cache: Record<string, any[]> = {
    services: [],
    offers: [],
    articles: [],
    pricing: [],
    coverage: [],
    messages: [],
    testimonials: [],
};

const fetchedOnce: Record<string, boolean> = {};

function notifyUpdate() {
    window.dispatchEvent(new Event('local-db-updated'));
}

async function fetchResource(key: string) {
    try {
        const res = await fetch(`${API_BASE}/${RESOURCE_MAP[key]}`);
        if (!res.ok) throw new Error(`bad status ${res.status}`);
        const data = await res.json();
        if (Array.isArray(data)) {
            cache[key] = data;
            notifyUpdate();
        }
    } catch (err) {
        console.warn(`[db] failed to load "${key}" from API`, err);
    }
}

function ensureFetched(key: string) {
    if (!fetchedOnce[key]) {
        fetchedOnce[key] = true;
        fetchResource(key);
    }
}

async function saveResource(key: string, data: any[]) {
    cache[key] = data;
    notifyUpdate();
    try {
        const res = await fetch(`${API_BASE}/${RESOURCE_MAP[key]}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error(`bad status ${res.status}`);
    } catch (err) {
        console.error(`[db] failed to save "${key}" to API`, err);
    }
}

export const db = {
    getServices: (): ServiceItem[] => { ensureFetched('services'); return cache.services; },
    saveServices: (data: ServiceItem[]) => { saveResource('services', data); },

    getOffers: (): OfferItem[] => { ensureFetched('offers'); return cache.offers; },
    saveOffers: (data: OfferItem[]) => { saveResource('offers', data); },

    getArticles: (): ArticleItem[] => { ensureFetched('articles'); return cache.articles; },
    saveArticles: (data: ArticleItem[]) => { saveResource('articles', data); },

    getPricingPlans: (): PricingPlanItem[] => { ensureFetched('pricing'); return cache.pricing; },
    savePricingPlans: (data: PricingPlanItem[]) => { saveResource('pricing', data); },

    getCoverageAreas: (): string[] => { ensureFetched('coverage'); return cache.coverage; },
    saveCoverageAreas: (data: string[]) => { saveResource('coverage', data); },

    getMessages: (): MessageItem[] => { ensureFetched('messages'); return cache.messages; },
    saveMessages: (data: MessageItem[]) => { saveResource('messages', data); },

    getTestimonials: (): TestimonialItem[] => { ensureFetched('testimonials'); return cache.testimonials; },
    saveTestimonials: (data: TestimonialItem[]) => { saveResource('testimonials', data); },
};
