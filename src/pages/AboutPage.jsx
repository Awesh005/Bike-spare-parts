import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiTarget, FiUsers, FiAward, FiTruck } from 'react-icons/fi';
import './AboutPage.css';

const stats = [
  { num: '10,000+', label: 'Happy Customers' },
  { num: '5,000+',  label: 'Products Listed' },
  { num: '50+',     label: 'Top Brands' },
  { num: '99%',     label: 'Satisfaction Rate' },
];

const team = [
  { name: 'Srijan Singh',   role: 'Founder & CEO',       img: '/images/image.jpeg' },
  { name: 'Aman Singh',     role: 'Head of Operations',  img: '/images/image.jpeg' },
  { name: 'Vikram Patel',   role: 'Lead Mechanic',       img: '/images/image.jpeg' },
];

const values = [
  { icon: <FiTarget />, title: 'Our Mission',  desc: 'To provide every rider with genuine, high-quality bike parts and accessories at the best prices, delivered fast.' },
  { icon: <FiAward />,  title: 'Our Vision',   desc: 'Becoming India\'s most trusted one-stop shop for motorcycles, parts, accessories and garage services.' },
  { icon: <FiUsers />,  title: 'Our Community',desc: 'We ride too. We build genuine relationships with riders, enthusiasts and mechanics who share our passion.' },
  { icon: <FiTruck />,  title: 'Our Promise',  desc: 'Authentic products. Transparent pricing. No compromises. Ever.' },
];

export default function AboutPage() {
  useEffect(() => { document.title = 'About Us | Moto Hub'; }, []);

  return (
    <div className="about-page">
      {/* Banner */}
      <section className="about-hero">
        <div className="about-hero__overlay" />
        <div className="container about-hero__content">
          <span className="badge badge-red">ABOUT US</span>
          <h1>WE LIVE &amp; BREATHE BIKES</h1>
          <p>Founded by riders, for riders. Moto Hub is your ultimate destination for genuine motorcycle parts, accessories and garage services across India.</p>
          <Link to="/shop" className="btn btn-primary">
            Shop Now <FiArrowRight />
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="about-stats">
        <div className="container about-stats__grid">
          {stats.map((s) => (
            <div key={s.label} className="about-stat">
              <span className="about-stat__num">{s.num}</span>
              <span className="about-stat__label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="section">
        <div className="container about-story">
          <div className="about-story__img-wrap">
            <img src="/images/bikeee1.jpeg" alt="Moto Hub Story" loading="lazy" />
          </div>
          <div className="about-story__text">
            <span className="about-eyebrow">OUR STORY</span>
            <h2>Built by Riders, for Riders</h2>
            <p>Moto Hub was born in a garage in Ranchi, Jharkhand — where a group of bike enthusiasts couldn't find genuine parts without compromising on quality or price.</p>
            <p>We built the platform we always wished existed: a one-stop shop with transparent pricing, genuine products sourced directly from manufacturers, and lightning-fast delivery.</p>
            <p>Today, we serve over 10,000 riders across India and we're just getting started. Every product we list is one we'd trust on our own bikes.</p>
            <Link to="/contact" className="btn btn-primary">Get In Touch <FiArrowRight /></Link>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section about-values">
        <div className="container">
          <h2 className="section-title" style={{ justifyContent: 'center', marginBottom: '2.5rem' }}>What We Stand For</h2>
          <div className="about-values__grid">
            {values.map((v) => (
              <div key={v.title} className="about-value-card">
                <div className="about-value-card__icon">{v.icon}</div>
                <h4>{v.title}</h4>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section">
        <div className="container">
          <h2 className="section-title" style={{ justifyContent: 'center', marginBottom: '2.5rem' }}>Meet the Team</h2>
          <div className="about-team">
            {team.map((m) => (
              <div key={m.name} className="about-team-card">
                <img src={m.img} alt={m.name} loading="lazy" />
                <h4>{m.name}</h4>
                <p>{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
