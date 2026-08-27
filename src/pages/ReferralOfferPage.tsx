import { useState } from 'react';
import { Gift, Share2, Clipboard, Users, ArrowRight, Award, ShieldAlert, CheckCircle2, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import './PageCommon.css';
import './ReferralOfferPage.css';

export default function ReferralOfferPage() {
    const [copied, setCopied] = useState(false);

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <>
            {/* Hero Section */}
            <div className="page-hero">
                <div className="page-hero__bg" />
                <div className="container">
                    <div className="referral-nav-back">
                        <Link to="/offers" className="btn btn-ghost btn-sm referral-back-link">
                            <ChevronLeft size={16} /> অফারসমূহ (All Offers)
                        </Link>
                    </div>
                    <span className="section-badge">
                        <Gift size={12} /> রেফার করুন, পুরষ্কার জিতুন
                    </span>
                    <h1 className="page-hero__title referral-title-bn">
                        রেফার করুন, <span className="highlight">পুরষ্কার জিতুন</span>
                    </h1>
                    <p className="page-hero__sub referral-date">
                        প্রকাশিত হয়েছে: ৯:৩১ PM, জুলাই ৯, ২০২৬
                    </p>
                </div>
            </div>

            {/* Main Content Layout */}
            <section className="section referral-section">
                <div className="container referral-layout">

                    {/* Left / Main Column */}
                    <div className="referral-main">
                        <div className="referral-card">

                            {/* Cover Image */}
                            <div className="referral-cover-wrap">
                                <img src="/RMC_Prize.jpg" alt="Offer Cover" className="referral-cover-img" />
                                <div className="referral-cover-glow" />
                            </div>

                            {/* Intro Texts */}
                            <div className="referral-intro">
                                <h3 className="referral-welcome-msg">
                                    Bitnetworkbd Ltd নিয়ে এলো সকল গ্রাহকদের জন্য রেফারাল প্রোগ্রাম।
                                </h3>
                                <p className="referral-intro-desc">
                                    এখন Bitnetworkbd Ltd এর সংযোগ নতুন কাউকে রেফার করেই পেয়ে যান মাসিক বিল এ ২০০ টাকা ডিস্কাউন্ট। এছাড়া থাকছে রিডিমেবল পয়েন্টস যা দিয়ে আপনি পাচ্ছেন আকর্ষনীয় সকল গ্যাজেটস।
                                    <br />
                                    এছাড়া রেফারে নতুন সংযোগ নিলেই কানেকশন চার্জ এ থাকছে ৫০০ টাকা ডিস্কাউন্ট।
                                </p>
                            </div>

                            {/* Instructions */}
                            <div className="referral-content-block">
                                <h4 className="referral-block-title">
                                    <span className="icon-badge-inline"><Users size={16} /></span> নির্দেশনাঃ
                                </h4>
                                <div className="referral-steps">
                                    <div className="referral-step-item">
                                        <div className="referral-step-num">১</div>
                                        <div className="referral-step-body">
                                            <p>রেফার করতে হলে গ্রাহকদের প্রাথমিক ভাবে এই গুগল ফর্মটি ফিল আপ করতে হবেঃ</p>

                                            {/* Sign Up Button (Mimicking the image but highly polished) */}
                                            <div className="referral-signup-btn-container">
                                                <a
                                                    href="https://forms.gle/XKVF5uAg7BtHJPh18"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="referral-signup-btn"
                                                >
                                                    <span>Sign Up</span>
                                                    <span className="referral-btn-icon-wrap">
                                                        <ArrowRight size={14} fill="currentColor" />
                                                    </span>
                                                </a>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="referral-step-item">
                                        <div className="referral-step-num">২</div>
                                        <div className="referral-step-body">
                                            <p>ফর্ম এ রেফারাল আইডি তে যিনি রেফার করছেন তার User ID টি দিতে হবে যেমনঃ <strong>30xxxx</strong></p>
                                        </div>
                                    </div>

                                    <div className="referral-step-item">
                                        <div className="referral-step-num">৩</div>
                                        <div className="referral-step-body">
                                            <p>সাবমিট করার পর নতুন গ্রাহককে <strong>Bitnetworkbd Ltd</strong> থেকে সংযোগ নিয়ে বিস্তারিত জানানো হবে।</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Reward Points Info */}
                            <div className="referral-content-block">
                                <h4 className="referral-block-title">
                                    <span className="icon-badge-inline"><Award size={16} /></span> রিওয়ার্ডঃ
                                </h4>
                                <p className="referral-reward-txt">
                                    প্রতিটি সাক্সেসফুল রেফারে রেফারার ১০ পয়েন্ট করে পাবেন। তিনি পয়েন্ট জমিয়ে তা যেকোনো সময় রিডিম করতে পারবেন। তিনি রিডিম করে আমাদের এভেইলএবল প্রোডাক্ট লিস্ট থেকে একটি প্রোডাক্ট নিতে পারবেন।
                                </p>
                            </div>

                            {/* Points Table */}
                            <div className="referral-content-block">
                                <h4 className="referral-block-title">
                                    <span className="icon-badge-inline"><Gift size={16} /></span> লিস্টঃ
                                </h4>
                                <div className="referral-table-container">
                                    <table className="referral-table-bn">
                                        <thead>
                                            <tr>
                                                <th>প্রোডাক্ট</th>
                                                <th>যত পয়েন্ট দরকার</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <div className="product-cell-wrap">
                                                        <strong>Power Bank</strong>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className="points-badge">50 Points</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="product-cell-wrap">
                                                        <strong>Repeater/Range Extender</strong>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className="points-badge">100 Points</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="product-cell-wrap">
                                                        <strong>Dual Band Non Gigabit Router</strong>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className="points-badge">150 Points</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="product-cell-wrap">
                                                        <strong>Dual Band Gigabit Router</strong>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className="points-badge">200 Points</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Terms and Conditions of Campaign */}
                            <div className="referral-content-block">
                                <h4 className="referral-block-title">
                                    <span className="icon-badge-inline"><CheckCircle2 size={16} /></span> শর্ত সমূহঃ
                                </h4>
                                <ol className="referral-terms-list">
                                    <li>রেফারার কে অবশ্যই <strong>Bitnetworkbd Ltd</strong> ইউজার হতে হবে।</li>
                                    <li>কানেকশন চার্জ এর ক্ষেত্রে ডিস্কাউন্ট আমাদের Economy বা তার পরের প্যাকেজগুলোর ক্ষেত্রে প্রযোজ্য।</li>
                                    <li>রেজিষ্ট্রেশন এর ক্ষেত্রে অবশ্যই ইউজার আইডি দিতে হবে।</li>
                                    <li>একজন গ্রাহক রেজিষ্ট্রেশন এর পর সংযোগ এক্টিভ হলেই সেটি একটি সাক্সেসফুল রেফার হিসেবে কাউন্ট হবে।</li>
                                    <li>নতুন সংযোগ এর ক্ষেত্রে গ্রাহক কে সংযোগ ফি এবং রানিং মাসের বিল প্রদান করতে হবে।</li>
                                    <li>রেফারার এর বিলিং ডিস্কাউন্ট যে মাসে রেফার করছেন তার পরের মাসে বিলিং এ এডজাস্ট হবে।</li>
                                    <li>একজন গ্রাহক প্রতি মাসে একবারই পয়েন্ট রিডিম করতে পারবেন। রিওয়ার্ড গ্রহনের পর সমপরিমান পয়েন্ট কেটে নেওয়া হবে।</li>
                                    <li>এই ছবিতে দেওয়া প্রোডাক্টগুলো কেবলমাত্র উদাহরণের জন্য ব্যবহার করা হয়েছে এবং এগুলি আসল পণ্যটির প্রতিনিধিত্ব করে না।</li>
                                    <li>শুধুমাত্র আমাদের দেওয়া ফর্ম লিংক এর ক্ষেত্রেই এই অফারটি প্রযোজ্য হবে।</li>
                                    <li>আমাদের অন্য যেকোনো রানিং অফারের সাথে এই অফার এডজাস্ট বা মডিফাই করা যাবে না।</li>
                                </ol>
                            </div>

                            {/* Note / Disclaimer */}
                            <div className="referral-note-box">
                                <div className="referral-note-header">
                                    <ShieldAlert size={18} />
                                    <span>বিঃদ্রঃ</span>
                                </div>
                                <p>
                                    Bitnetworkbd Ltd এই রেফারাল প্রোগ্রামটির শর্ত এবং নিয়মাবলী সংযোগ, পরিবর্তন কিংবা বন্ধ করার অধিকার রাখে।
                                </p>
                            </div>

                        </div>
                    </div>

                    {/* Right / Sidebar Column (Share widget) */}
                    <aside className="referral-sidebar">
                        <div className="referral-sidebar-card">
                            <h3 className="sidebar-card-title">
                                <Share2 size={18} /> SHARE THIS CAMPAIGN
                            </h3>
                            <p className="sidebar-card-desc">
                                Share this amazing offer with your friends and family on social media!
                            </p>
                            <div className="referral-share-buttons">
                                <a
                                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="share-btn share-btn--facebook"
                                >
                                    <span className="share-btn-icon">f</span> Facebook-এ শেয়ার করুন
                                </a>
                                <a
                                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent('রেফার করুন, পুরষ্কার জিতুন! Bitnetworkbd Ltd এর চমৎকার রেফারাল অফার দেখুন: ' + window.location.href)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="share-btn share-btn--whatsapp"
                                >
                                    <span className="share-btn-icon">w</span> WhatsApp-এ পাঠান
                                </a>
                                <button
                                    onClick={handleShare}
                                    className="share-btn share-btn--copy"
                                >
                                    <Clipboard size={14} /> {copied ? 'লিংক কপি হয়েছে!' : 'লিংক কপি করুন'}
                                </button>
                            </div>
                        </div>

                        <div className="referral-sidebar-card secondary-card">
                            <div className="pricing-promo-head">
                                <Gift size={22} className="pricing-promo-icon" />
                                <h4>Need a new plan?</h4>
                            </div>
                            <p>Explore our high-speed internet packages starting from only 890 TK/month.</p>
                            <Link to="/pricing" className="btn btn-primary btn-sm btn-full">
                                View Pricing Packages <ArrowRight size={14} />
                            </Link>
                        </div>
                    </aside>

                </div>
            </section>
        </>
    );
}
