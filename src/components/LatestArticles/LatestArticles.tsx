import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { Calendar, Clock, User, ArrowRight, X, Sparkles, BookOpen } from 'lucide-react';
import { db, renderIcon } from '../../utils/db';
import type { ArticleItem } from '../../utils/db';
import './LatestArticles.css';

export default function LatestArticles() {
    const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
    const [activeArticle, setActiveArticle] = useState<ArticleItem | null>(null);
    const [latestArticles, setLatestArticles] = useState<ArticleItem[]>([]);

    useEffect(() => {
        const load = () => setLatestArticles(db.getArticles().slice(0, 3));
        load();
        window.addEventListener('local-db-updated', load);
        return () => window.removeEventListener('local-db-updated', load);
    }, []);

    return (
        <section className="latest-articles section" id="latest-articles" ref={ref}>
            <div className="container">
                <div className={`section-header ${inView ? 'animate-fade-in-up' : 'pre-animate'}`}>
                    <span className="section-badge">
                        <BookOpen size={12} /> News &amp; Updates
                    </span>
                    <h2 className="section-title">
                        Latest <span className="highlight">Articles</span> &amp; Insights
                    </h2>
                    <p className="section-subtitle">
                        Explore our expert opinions, technical guides, legal compliance updates, and promotional packages.
                    </p>
                </div>

                <div className="latest-articles__grid">
                    {latestArticles.map((article, i) => (
                        <article
                            key={article.id}
                            className={`latest-articles__card card ${inView ? 'animate-fade-in-up' : 'pre-animate'}`}
                            style={{ animationDelay: `${i * 0.08}s` }}
                            onClick={() => setActiveArticle(article)}
                        >
                            <div className="latest-articles__card-header">
                                <span className="latest-articles__card-category">{article.category}</span>
                                <div className="latest-articles__card-icon-wrap">
                                    {renderIcon(article.iconName, { size: 18 })}
                                </div>
                            </div>

                            <div className="latest-articles__card-body">
                                <h3 className="latest-articles__card-title">{article.title}</h3>
                                <p className="latest-articles__card-summary">{article.summary}</p>
                            </div>

                            <div className="latest-articles__card-meta">
                                <div className="latest-articles__card-meta-item">
                                    <Calendar size={13} />
                                    <span>{article.date}</span>
                                </div>
                                <div className="latest-articles__card-meta-item">
                                    <Clock size={13} />
                                    <span>{article.readTime}</span>
                                </div>
                            </div>

                            <div className="latest-articles__card-footer">
                                <span className="latest-articles__card-read-more">
                                    Read Article <ArrowRight size={14} />
                                </span>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="latest-articles__cta">
                    <Link to="/articles" className="btn btn-outline btn-lg">
                        View All Articles <ArrowRight size={16} />
                    </Link>
                </div>
            </div>

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
                            {activeArticle.content.map((paragraph: string, index: number) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                            {activeArticle.featuredPlan && (
                                <div className="article-modal__cta-box">
                                    <div className="article-modal__cta-text-side">
                                        <h3><Sparkles size={16} /> Recommended Package</h3>
                                        <p>Upgrade to <strong>{activeArticle.featuredPlan}</strong> for standard symmetric optimization.</p>
                                    </div>
                                    <Link to={activeArticle.ctaLink || '/pricing'} className="btn btn-primary" onClick={() => setActiveArticle(null)}>
                                        {activeArticle.ctaText} <ArrowRight size={15} />
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
