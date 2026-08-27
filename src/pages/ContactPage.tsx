import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, Building2, GitBranch } from 'lucide-react';
import { db } from '../utils/db';
import type { MessageItem } from '../utils/db';
import './PageCommon.css';
import './ContactPage.css';

export default function ContactPage() {
  const location = useLocation();
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle');

  useEffect(() => {
    const state = location.state as { plan?: string } | null;
    if (state?.plan) {
      setForm((f) => ({
        ...f,
        subject: 'new-connection',
        message: `Hello, I would like to subscribe to the "${state.plan}" package. Please get back to me.`,
      }));
    }
  }, [location.state]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    const newMsg: MessageItem = {
      id: `msg-${Date.now()}`,
      name: form.name,
      email: form.email,
      phone: form.phone,
      subject: form.subject,
      message: form.message,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'unread'
    };

    const stored = db.getMessages();
    db.saveMessages([newMsg, ...stored]);

    setTimeout(() => {
      setStatus('done');
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 1000);
  };

  return (
    <>
      <div className="page-hero">
        <div className="page-hero__bg" />
        <div className="container">
          <span className="section-badge">Contact Us</span>
          <h1 className="page-hero__title">Get in <span className="highlight">Touch</span></h1>
          <p className="page-hero__sub">Have questions? Want to get connected? Our team is here to help you 24/7.</p>
        </div>
      </div>

      <section className="section contact-section">
        <div className="container contact-section__layout">

          {/* Info side */}
          <div className="contact-section__info">
            <h2 className="section-title" style={{ textAlign: 'left', fontSize: '1.75rem' }}>
              We're Here to <span className="highlight">Help</span>
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: '2rem' }}>
              Whether you're looking to sign up, need technical support, or have billing questions — reach out to us and we'll respond promptly.
            </p>

            <div className="contact-section__cards">

              {/* Support Hours */}
              <div className="contact-section__card">
                <div className="contact-section__card-icon">
                  <Clock size={20} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="contact-section__card-label">Support Hours</p>
                  <p className="contact-section__card-value">24/7 — Always Available</p>
                </div>
              </div>

              {/* Corporate Office */}
              <div className="contact-section__card contact-section__card--office">
                <div className="contact-section__card-icon" style={{ background: 'rgba(0,198,255,0.1)', border: '1px solid rgba(0,198,255,0.2)', alignSelf: 'flex-start', marginTop: '2px' }}>
                  <Building2 size={20} strokeWidth={1.5} />
                </div>
                <div style={{ flex: 1 }}>
                  <p className="contact-section__card-label" style={{ fontSize: '0.72rem', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                    Corporate Office
                  </p>
                  <div className="contact-section__office-row">
                    <MapPin size={13} style={{ color: 'var(--color-accent-primary)', flexShrink: 0, marginTop: '3px' }} />
                    <span>89/ 3 Water Works Road, Posta area of Lalbagh, Chawkbazar, Dhaka 1211</span>
                  </div>
                  <div className="contact-section__office-row">
                    <Phone size={13} style={{ color: 'var(--color-accent-primary)', flexShrink: 0 }} />
                    <span>Phone: <a href="tel:09639116116" className="contact-section__card-link">09639116116</a></span>
                  </div>
                  <div className="contact-section__office-row">
                    <Phone size={13} style={{ color: 'var(--color-accent-primary)', flexShrink: 0 }} />
                    <span>
                      Mobile:&nbsp;
                      <a href="tel:01749090930" className="contact-section__card-link">01749090930</a>
                      <span style={{ margin: '0 4px', color: 'var(--color-text-muted)' }}>|</span>
                      <a href="tel:01911223006" className="contact-section__card-link">01911223006</a>
                    </span>
                  </div>
                  <div className="contact-section__office-row">
                    <Mail size={13} style={{ color: 'var(--color-accent-primary)', flexShrink: 0 }} />
                    <a href="mailto:noc@msonlinebd.com" className="contact-section__card-link">noc@msonlinebd.com</a>
                  </div>
                </div>
              </div>

              {/* Branch Office */}
              <div className="contact-section__card contact-section__card--office">
                <div className="contact-section__card-icon" style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)', color: '#a78bfa', alignSelf: 'flex-start', marginTop: '2px' }}>
                  <GitBranch size={20} strokeWidth={1.5} />
                </div>
                <div style={{ flex: 1 }}>
                  <p className="contact-section__card-label" style={{ fontSize: '0.72rem', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                    Branch Office
                  </p>
                  <div className="contact-section__office-row">
                    <MapPin size={13} style={{ color: '#a78bfa', flexShrink: 0, marginTop: '3px' }} />
                    <span>Dc Road-Sorno Tower, Gopalganj, Bangladesh</span>
                  </div>
                  <div className="contact-section__office-row">
                    <Phone size={13} style={{ color: '#a78bfa', flexShrink: 0 }} />
                    <span>
                      Contact:&nbsp;
                      <a href="tel:09639116116" className="contact-section__card-link">09639116116</a>
                      <span style={{ margin: '0 6px', color: 'var(--color-text-muted)' }}>Or</span>
                      <a href="tel:01749090930" className="contact-section__card-link">01749090930</a>
                    </span>
                  </div>
                  <div className="contact-section__office-row">
                    <Mail size={13} style={{ color: '#a78bfa', flexShrink: 0 }} />
                    <a href="mailto:admin@bitnetworkbd.com" className="contact-section__card-link">admin@bitnetworkbd.com</a>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Contact form */}
          <div className="contact-section__form-wrap">
            {status === 'done' ? (
              <div className="contact-section__success">
                <CheckCircle size={48} />
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                <button className="btn btn-primary" onClick={() => setStatus('idle')}>Send Another</button>
              </div>
            ) : (
              <form className="contact-section__form" onSubmit={handleSubmit} id="contact-form">
                <h3 className="contact-section__form-title">Send us a Message</h3>
                <div className="contact-section__row">
                  <div className="contact-section__field">
                    <label htmlFor="name">Full Name *</label>
                    <input id="name" name="name" type="text" value={form.name} onChange={handleChange} placeholder="Your full name" required />
                  </div>
                  <div className="contact-section__field">
                    <label htmlFor="email">Email *</label>
                    <input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" required />
                  </div>
                </div>
                <div className="contact-section__row">
                  <div className="contact-section__field">
                    <label htmlFor="phone">Phone</label>
                    <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="01xxxxxxxxx" />
                  </div>
                  <div className="contact-section__field">
                    <label htmlFor="subject">Subject *</label>
                    <select id="subject" name="subject" value={form.subject} onChange={handleChange} required>
                      <option value="">Select subject</option>
                      <option value="new-connection">New Connection</option>
                      <option value="technical-support">Technical Support</option>
                      <option value="billing">Billing Query</option>
                      <option value="corporate">Corporate Package</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="contact-section__field">
                  <label htmlFor="message">Message *</label>
                  <textarea id="message" name="message" value={form.message} onChange={handleChange} rows={5} placeholder="Tell us how we can help..." required />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending...' : <><Send size={16} /> Send Message</>}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
