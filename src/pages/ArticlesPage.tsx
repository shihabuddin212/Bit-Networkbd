import { useState, useEffect } from 'react';
import { Calendar, Clock, User, ArrowRight, X, Sparkles } from 'lucide-react';
import { db, renderIcon } from '../utils/db';
import type { ArticleItem } from '../utils/db';
import './PageCommon.css';
import './ArticlesPage.css';

export default function ArticlesPage() {
    const [articles, setArticles] = useState<ArticleItem[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<'All' | 'Home' | 'Enterprise' | 'Support' | 'Guide'>('All');
    const [activeArticle, setActiveArticle] = useState<ArticleItem | null>(null);

    useEffect(() => {
        setArticles(db.getArticles());
        const handler = () => setArticles(db.getArticles());
        window.addEventListener('local-db-updated', handler);
        return () => window.removeEventListener('local-db-updated', handler);
    }, []);

    const filteredArticles = selectedCategory === 'All'
        ? articles
        : articles.filter(art => art.category === selectedCategory);

    return (
        <>
            <div className="page-hero">
                <div className="page-hero__bg" />
                <div className="container">
                    <span className="section-badge">Resource Hub</span>
                    <h1 className="page-hero__title">Articles &amp; <span className="highlight">Insights</span></h1>
                    <p className="page-hero__sub">
                        Convincing research, technical updates, and guidance from the networking experts at RM Communication Ltd.
                    </p>
                </div>
            </div>

            <section className="section articles-section">
                <div className="container">
                    {/* Category Filter */}
                    <div className="articles-filters">
                        {['All', 'Home', 'Enterprise', 'Support', 'Guide'].map((cat) => (
                            <button
                                key={cat}
                                className={`articles-filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(cat as any)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Grid Layout */}
                    <div className="articles-grid">
                        {filteredArticles.map((article) => (
                            <article key={article.id} className="article-card" onClick={() => setActiveArticle(article)}>
                                <div className="article-card__header">
                                    <div className="article-card__category">{article.category}</div>
                                    <div className="article-card__icon-wrapper">
                                        {renderIcon(article.iconName, { size: 18 })}
                                    </div>
                                </div>
                                <div className="article-card__body">
                                    <h2 className="article-card__title">{article.title}</h2>
                                    <p className="article-card__summary">{article.summary}</p>
                                </div>
                                <div className="article-card__meta">
                                    <div className="article-card__meta-item">
                                        <Calendar size={13} />
                                        <span>{article.date}</span>
                                    </div>
                                    <div className="article-card__meta-item">
                                        <Clock size={13} />
                                        <span>{article.readTime}</span>
                                    </div>
                                </div>
                                <div className="article-card__footer">
                                    <span className="article-card__read-more">
                                        Read Article <ArrowRight size={14} />
                                    </span>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Article Detail Modal */}
            {activeArticle && (
                <div className="article-modal" onClick={() => setActiveArticle(null)}>
                    <div className="article-modal__content" onClick={(e) => e.stopPropagation()}>
                        <button className="article-modal__close" onClick={() => setActiveArticle(null)} aria-label="Close modal">
                            <X size={20} />
                        </button>
                        <header className="article-modal__header">
                            <span className="article-category-badge">{activeArticle.category}</span>
                            <h1 className="article-modal__title">{activeArticle.title}</h1>
                            <div className="article-modal__meta">
                                <div className="article-modal__meta-item"><User size={14} /><span>{activeArticle.author}</span></div>
                                <div className="article-modal__meta-item"><Calendar size={14} /><span>{activeArticle.date}</span></div>
                                <div className="article-modal__meta-item"><Clock size={14} /><span>{activeArticle.readTime}</span></div>
                            </div>
                        </header>
                        <div className="article-modal__body">
                            {activeArticle.content.map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                            {activeArticle.featuredPlan && (
                                <div className="article-modal__cta-box">
                                    <div className="article-modal__cta-text-side">
                                        <h3><Sparkles size={16} /> Recommended Package</h3>
                                        <p>Upgrade to <strong>{activeArticle.featuredPlan}</strong> for standard symmetric optimization.</p>
                                    </div>
                                    <a href={activeArticle.ctaLink} className="btn btn-primary" onClick={() => setActiveArticle(null)}>
                                        {activeArticle.ctaText} <ArrowRight size={15} />
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
