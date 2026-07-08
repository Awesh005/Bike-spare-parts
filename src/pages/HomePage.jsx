import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import HeroSlider from '../components/ui/HeroSlider';
import ProductCard from '../components/ui/ProductCard';
import { products, brands, getBestSellers, getNewArrivals } from '../data/products';
import './HomePage.css';

// Simple scroll-reveal hook
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); obs.unobserve(el); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

const categories = [
  { label: 'Engine Parts', img: '/images/engine.png',   to: '/shop?cat=engine',  },
  { label: 'Brakes',       img: '/images/break.jpeg',   to: '/shop?cat=brakes',  },
  { label: 'Chains',       img: '/images/chain.jpeg',   to: '/shop?cat=chains',  },
  { label: 'Tyres',        img: '/images/tyre.jpeg',    to: '/shop?cat=tyres',   },
  { label: 'Lights',       img: '/images/light.png',    to: '/shop?cat=lights',  },
  { label: 'Helmets',      img: '/images/helmet.jpeg',  to: '/shop?cat=helmets', },
];

const features = [
  { icon: '⚙️', title: 'Genuine Parts',   desc: '100% authentic & high quality products direct from manufacturers.' },
  { icon: '🚚', title: 'Fast Delivery',   desc: 'Quick & safe delivery at your doorstep within 2-5 business days.' },
  { icon: '🔄', title: 'Easy Returns',    desc: '7-day hassle-free return & refund policy. No questions asked.' },
  { icon: '🎧', title: 'Support 24/7',    desc: 'Our expert team is here to help you anytime, every day of the week.' },
];

const testimonials = [
  { name: 'Srijan Singh',   stars: 5, text: 'Great quality products and super fast delivery. Highly recommended!' },
  { name: 'Aman Singh',     stars: 5, text: 'Perfect parts for my bike. Performance improved a lot. Thanks MOTOHUB!' },
  { name: 'Vikram Patel',   stars: 5, text: 'Very reliable store for bike parts. Genuine products at best prices.' },
];

const newArrivals = [
  { img: '/images/111.jpeg',  name: 'Acerbis Handguard', price: '₹1,199' },
  { img: '/images/222.jpeg',  name: 'NGK Spark Plug',    price: '₹249'   },
  { img: '/images/555.jpeg',  name: 'K&N Air Filter',    price: '₹3,499' },
  { img: '/images/333.jpeg',  name: 'Radiator Guard',    price: '₹1,249' },
  { img: '/images/444.jpeg',  name: 'Wing Mirror',       price: '₹899'   },
  { img: '/images/666.jpeg',  name: 'Tank Pad',          price: '₹299'   },
];

function Section({ children, className = '' }) {
  const ref = useReveal();
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

export default function HomePage() {
  const bestSellers = getBestSellers();

  // Page title
  useEffect(() => { document.title = 'Moto Hub — Premium Bike Parts & Accessories'; }, []);

  return (
    <div className="homepage">
      {/* ── Hero ── */}
      <HeroSlider />

      {/* ── Brands Marquee ── */}
      <section className="brands-bar">
        <div className="brands-marquee">
          <div className="brands-track">
            {[...brands, ...brands].map((b, i) => (
              <img key={i} src={b.logo} alt={b.name} className="brand-logo" loading="lazy" />
            ))}
          </div>
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="section homepage__categories">
        <div className="container">
          <Section>
            <div className="section-header">
              <h2 className="section-title">Popular Categories</h2>
              <Link to="/parts" className="view-link">View All <FiArrowRight /></Link>
            </div>
          </Section>
          <div className="categories-grid">
            {categories.map((cat, i) => (
              <Link key={cat.label} to={cat.to} className="cat-card reveal" style={{ '--i': i }}>
                <div className="cat-card__img-wrap">
                  <img src={cat.img} alt={cat.label} loading="lazy" />
                </div>
                <h5 className="cat-card__label">{cat.label}</h5>
                <span className="cat-card__explore">Explore <FiArrowRight /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Best Sellers ── */}
      <section className="section homepage__bestsellers">
        <div className="container">
          <Section>
            <div className="section-header">
              <h2 className="section-title">Best Sellers</h2>
              <Link to="/shop" className="view-link">View All <FiArrowRight /></Link>
            </div>
          </Section>
          <div className="products-grid">
            {bestSellers.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose ── */}
      <section className="section homepage__why">
        <div className="container">
          <Section>
            <h2 className="section-title section-title--center">Why Choose Moto Hub?</h2>
          </Section>
          <div className="features-grid">
            {features.map((f, i) => (
              <div key={f.title} className="feature-card reveal" style={{ '--i': i }}>
                <div className="feature-card__icon">{f.icon}</div>
                <div>
                  <h4 className="feature-card__title">{f.title}</h4>
                  <p  className="feature-card__desc">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Summer Sale Banner ── */}
      <Section>
        <section className="summer-sale-banner">
          <div className="container summer-sale-banner__content">
            <h2>SUMMER RIDER SALE</h2>
            <h3>UP TO 40% OFF</h3>
            <Link to="/shop" className="btn btn-primary sale-cta">
              SHOP NOW <FiArrowRight />
            </Link>
          </div>
        </section>
      </Section>

      {/* ── New Arrivals ── */}
      <section className="section">
        <div className="container">
          <Section>
            <div className="section-header">
              <h2 className="section-title">New Arrivals</h2>
              <Link to="/shop" className="view-link">View All <FiArrowRight /></Link>
            </div>
          </Section>
          <div className="arrivals-grid">
            {newArrivals.map((item, i) => (
              <div key={i} className="arrival-card reveal" style={{ '--i': i }}>
                <div className="arrival-card__img-wrap">
                  <img src={item.img} alt={item.name} loading="lazy" />
                </div>
                <h5 className="arrival-card__name">{item.name}</h5>
                <p  className="arrival-card__price">{item.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── KTM Banner ── */}
      <Section>
        <section className="ktm-banner">
          <div className="container ktm-banner__inner">
            <div className="ktm-banner__content">
              <h2>KTM RC 390</h2>
              <h4>PERFORMANCE ACCESSORIES AVAILABLE</h4>
              <Link to="/shop" className="btn btn-primary">
                Explore Collection <FiArrowRight />
              </Link>
            </div>
            <img src="/images/2nd bike.png" alt="KTM RC 390" className="ktm-banner__bike anim-float" />
          </div>
        </section>
      </Section>

      {/* ── Testimonials ── */}
      <section className="section homepage__testimonials">
        <div className="container">
          <Section>
            <h2 className="section-title section-title--center">What Riders Say</h2>
          </Section>
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <div key={t.name} className="testimonial-card reveal" style={{ '--i': i }}>
                <img src="/images/image.jpeg" alt={t.name} className="testimonial-card__avatar" loading="lazy" />
                <div className="testimonial-card__body">
                  <h4>{t.name}</h4>
                  <div className="rating">
                    {Array.from({ length: t.stars }).map((_, j) => (
                      <span key={j} className="text-gold">★</span>
                    ))}
                  </div>
                  <p>{t.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Club Banner ── */}
      <Section>
        <section className="club-banner">
          <div className="container club-banner__inner">
            <div className="club-banner__text">
              <h2>JOIN MOTOHUB CLUB</h2>
              <p>Exclusive Discounts, Early Access to Offers &amp; More.</p>
            </div>
            <Link to="/register" className="btn btn-primary club-banner__btn">
              JOIN NOW <FiArrowRight />
            </Link>
            <img src="/images/2nd bike.png" alt="Bike" className="club-banner__bike" loading="lazy" />
          </div>
        </section>
      </Section>

      {/* ── Newsletter ── */}
      <section className="section">
        <div className="container">
          <div className="newsletter-box">
            <div className="newsletter-box__text">
              <h2>STAY UPDATED</h2>
              <p>Get Latest Deals &amp; Offers Directly To Your Inbox.</p>
            </div>
            <form
              className="newsletter-box__form"
              onSubmit={(e) => {
                e.preventDefault();
                const el = e.target.querySelector('input');
                if (el.value) {
                  alert(`Thanks! ${el.value} subscribed successfully.`);
                  el.value = '';
                }
              }}
            >
              <input
                type="email"
                placeholder="Enter Your Email"
                className="form-control newsletter-box__input"
                required
              />
              <button type="submit" className="btn btn-primary">SUBSCRIBE</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
