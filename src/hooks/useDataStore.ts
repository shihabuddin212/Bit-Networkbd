import { useState, useEffect } from 'react';
import { db } from '../utils/db';
import type { ServiceItem, OfferItem, ArticleItem, PricingPlanItem, MessageItem } from '../utils/db';

export function useDataStore() {
    const [services, setServices] = useState<ServiceItem[]>([]);
    const [offers, setOffers] = useState<OfferItem[]>([]);
    const [articles, setArticles] = useState<ArticleItem[]>([]);
    const [pricingPlans, setPricingPlans] = useState<PricingPlanItem[]>([]);
    const [coverageAreas, setCoverageAreas] = useState<string[]>([]);
    const [messages, setMessages] = useState<MessageItem[]>([]);

    const loadAll = () => {
        setServices(db.getServices());
        setOffers(db.getOffers());
        setArticles(db.getArticles());
        setPricingPlans(db.getPricingPlans());
        setCoverageAreas(db.getCoverageAreas());
        setMessages(db.getMessages());
    };

    useEffect(() => {
        loadAll();

        const handleUpdate = () => {
            loadAll();
        };

        window.addEventListener('local-db-updated', handleUpdate);
        return () => {
            window.removeEventListener('local-db-updated', handleUpdate);
        };
    }, []);

    return {
        services,
        offers,
        articles,
        pricingPlans,
        coverageAreas,
        messages,
        updateServices: (data: ServiceItem[]) => {
            db.saveServices(data);
            setServices(data);
        },
        updateOffers: (data: OfferItem[]) => {
            db.saveOffers(data);
            setOffers(data);
        },
        updateArticles: (data: ArticleItem[]) => {
            db.saveArticles(data);
            setArticles(data);
        },
        updatePricingPlans: (data: PricingPlanItem[]) => {
            db.savePricingPlans(data);
            setPricingPlans(data);
        },
        updateCoverageAreas: (data: string[]) => {
            db.saveCoverageAreas(data);
            setCoverageAreas(data);
        },
        updateMessages: (data: MessageItem[]) => {
            db.saveMessages(data);
            setMessages(data);
        }
    };
}
