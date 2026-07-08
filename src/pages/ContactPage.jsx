import { useEffect, useState } from 'react';
import { FiPhone, FiMail, FiMapPin, FiClock, FiSend } from 'react-icons/fi';
import './ContactPage.css';

export default function ContactPage() {
  useEffect(() => { document.title = 'Contact | Moto Hub'; }, []);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    e.target.reset();
  };

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="container">
          <h1>Get In Touch</h1>
          <p>We're here to help with any questions about products, orders or services.</p>
        </div>
      </section>

      <div className="container contact-layout">
        {/* Info Cards */}
        <div className="contact-info-grid">
          {[
            { icon: <FiMapPin />, title: 'Our Location',    text: 'Ranchi, Jharkhand, India 834001' },
            { icon: <FiPhone />,  title: 'Phone Number',    text: '+91 9876543210' },
            { icon: <FiMail />,   title: 'Email Address',   text: 'support@ridexgarage.com' },
            { icon: <FiClock />,  title: 'Business Hours',  text: 'Mon – Sat: 9:00 AM – 8:00 PM' },
          ].map((info) => (
            <div key={info.title} className="contact-info-card">
              <div className="contact-info-card__icon">{info.icon}</div>
              <div>
                <h4>{info.title}</h4>
                <p>{info.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="contact-form-wrap">
          <h2>Send Us a Message</h2>
          {submitted && (
            <div className="contact-success">✅ Your message has been sent! We'll get back to you within 24 hours.</div>
          )}
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-form__row">
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input type="text" className="form-control" placeholder="John Doe" required />
              </div>
              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input type="email" className="form-control" placeholder="john@example.com" required />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Subject</label>
              <input type="text" className="form-control" placeholder="Order inquiry, Product question..." />
            </div>
            <div className="form-group">
              <label className="form-label">Message *</label>
              <textarea className="form-control contact-form__textarea" placeholder="Tell us how we can help..." required rows={5} />
            </div>
            <button type="submit" className="btn btn-primary contact-form__submit">
              <FiSend /> Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
