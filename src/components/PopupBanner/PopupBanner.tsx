import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ExternalLink, ArrowRight } from 'lucide-react';
import './PopupBanner.css';

export default function PopupBanner() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if popup was already shown in this session
        const hasSeenPopup = sessionStorage.getItem('bit_popup_seen');
        if (!hasSeenPopup) {
            // Show popup after a slight delay on initial site visit
            const timer = setTimeout(() => {
                setIsOpen(true);
            }, 600);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        sessionStorage.setItem('bit_popup_seen', 'true');
    };

    const handleBannerClick = () => {
        handleClose();
        navigate('/offers/referral');
    };

    const handleSignUpClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        handleClose();
        window.open('https://forms.gle/XKVF5uAg7BtHJPh18', '_blank', 'noopener,noreferrer');
    };

    if (!isOpen) return null;

    return (
        <div className="popup-overlay" onClick={handleClose}>
            <div
                className="popup-container animate-popup-in"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-label="Special Offer Announcement"
            >
                {/* Close Button */}
                <button
                    className="popup-close-btn"
                    onClick={handleClose}
                    aria-label="Close modal"
                >
                    <X size={20} />
                </button>

                {/* Banner Content / Clickable image area */}
                <div className="popup-banner-body" onClick={handleBannerClick}>
                    <div className="popup-image-wrap">
                        <img
                            src="/RMC_Prize.jpg"
                            alt="Bitnetworkbd Referral Special Offer"
                            className="popup-banner-img"
                        />
                        <div className="popup-image-glow" />
                    </div>

                    <div className="popup-footer-bar">
                        <div className="popup-text-group">
                            <span className="popup-badge">বিশেষ অফার (Special Offer)</span>
                            <h4 className="popup-title">রেফার করুন, আকর্ষনীয় সব পুরষ্কার জিতুন!</h4>
                        </div>
                        <div className="popup-actions">
                            <button
                                className="btn btn-outline btn-sm popup-btn-details"
                                onClick={handleBannerClick}
                            >
                                বিস্তারিত দেখুন <ArrowRight size={14} />
                            </button>
                            <button
                                className="btn btn-primary btn-sm popup-btn-signup"
                                onClick={handleSignUpClick}
                            >
                                Sign Up <ExternalLink size={14} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
