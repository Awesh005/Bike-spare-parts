import { useEffect, useState } from 'react';
import { FiTool, FiCheckCircle } from 'react-icons/fi';
import './GaragePage.css';

const services = [
  { icon: '🔧', name: 'Oil Change',          desc: 'Full synthetic or mineral, your choice.', price: '₹299' },
  { icon: '🛞', name: 'Tyre Change',         desc: 'Mounting, balancing & alignment.', price: '₹149/tyre' },
  { icon: '🔩', name: 'Chain Lubrication',   desc: 'Clean, adjust & lubricate chain.', price: '₹99' },
  { icon: '🏥', name: 'Full Bike Service',   desc: 'Comprehensive 30-point checkup.', price: '₹999' },
  { icon: '⚡', name: 'Electrical Repair',   desc: 'Wiring, battery & lights.', price: '₹499+' },
  { icon: '🎨', name: 'Body & Paint',        desc: 'Dents, scratches & custom paint.', price: 'On Quote' },
];

export default function GaragePage() {
  useEffect(() => { document.title = 'Garage | Moto Hub'; }, []);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    e.target.reset();
  };

  return (
    <div className="garage-page">
      {/* Hero */}
      <section className="garage-hero">
        <div className="container garage-hero__content">
          <span className="badge badge-red">OUR GARAGE</span>
          <h1>Expert Bike Service &amp; Repair</h1>
          <p>From oil changes to full overhauls — our certified mechanics have you covered.</p>
        </div>
      </section>

      {/* Services */}
      <section className="section">
        <div className="container">
          <h2 className="section-title" style={{ justifyContent:'center', marginBottom:'2.5rem' }}>Our Services</h2>
          <div className="garage-services-grid">
            {services.map((svc) => (
              <div key={svc.name} className="garage-service-card">
                <div className="garage-service-card__icon">{svc.icon}</div>
                <div>
                  <h4>{svc.name}</h4>
                  <p>{svc.desc}</p>
                  <span className="garage-service-card__price">{svc.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="section garage-booking">
        <div className="container">
          <div className="garage-booking__wrap">
            <div className="garage-booking__left">
              <h2>Book a Service Appointment</h2>
              <p>Fill in the form and our team will call you within 2 hours to confirm your slot.</p>
              <ul className="garage-booking__perks">
                {['Free pickup & drop within 10km','Certified mechanics only','Genuine spare parts used','Digital job card & invoice'].map((p) => (
                  <li key={p}><FiCheckCircle className="text-red" /> {p}</li>
                ))}
              </ul>
            </div>
            <div className="garage-booking__form-wrap">
              {submitted && (
                <div className="contact-success" style={{ marginBottom: '1.5rem' }}>
                  ✅ Booking received! We'll call you within 2 hours.
                </div>
              )}
              <form className="garage-booking__form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Your Name *</label>
                  <input type="text" className="form-control" placeholder="Full name" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone Number *</label>
                  <input type="tel" className="form-control" placeholder="+91 XXXXX XXXXX" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Bike Make &amp; Model *</label>
                  <input type="text" className="form-control" placeholder="e.g. KTM Duke 390" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Service Required *</label>
                  <select className="form-control" required style={{ cursor: 'pointer' }}>
                    <option value="">Select a service</option>
                    {services.map((s) => <option key={s.name}>{s.name}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Preferred Date</label>
                  <input type="date" className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width:'100%', justifyContent:'center', padding:'.875rem' }}>
                  <FiTool /> Book Appointment
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
