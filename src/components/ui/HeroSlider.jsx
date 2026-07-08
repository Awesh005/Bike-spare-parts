import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import './HeroSlider.css';

const slides = [
  {
    id: 1,
    label: 'BEST SELLER',
    tag: 'Performance Upgrade',
    title: ['AKRAPOVIC', 'EXHAUST', 'SYSTEM'],
    desc: 'Experience the roar of pure performance. Crafted from titanium for maximum power gains.',
    price: '₹4,999',
    cta: { label: 'Shop Now', to: '/product/akrapovic-performance-exhaust-pipe' },
    salePercent: '40%',
  },
  {
    id: 2,
    label: 'NEW ARRIVAL',
    tag: 'Premium Protection',
    title: ['STUDDS', 'CHROME', 'HELMET'],
    desc: 'ISI certified full-face helmet built for riders who demand safety without sacrificing style.',
    price: '₹2,499',
    cta: { label: 'Shop Now', to: '/product/studds-chrome-eco-helmet' },
    salePercent: '17%',
  },
  {
    id: 3,
    label: 'HOT DEAL',
    tag: 'Engine Excellence',
    title: ['K&N AIR', 'FILTER', 'KIT'],
    desc: 'Increase airflow up to 50% with the world\'s most trusted reusable performance filter.',
    price: '₹3,499',
    cta: { label: 'Shop Now', to: '/product/kn-high-performance-air-filter' },
    salePercent: '13%',
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [dir, setDir] = useState('next');

  const go = useCallback((idx, direction = 'next') => {
    if (animating) return;
    setDir(direction);
    setAnimating(true);
    setTimeout(() => {
      setCurrent(idx);
      setAnimating(false);
    }, 500);
  }, [animating]);

  const next = useCallback(() => {
    go((current + 1) % slides.length, 'next');
  }, [current, go]);

  const prev = useCallback(() => {
    go((current - 1 + slides.length) % slides.length, 'prev');
  }, [current, go]);

  // Autoplay
  useEffect(() => {
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [next]);

  const slide = slides[current];

  return (
    <section className="hero" aria-label="Hero slider">
      {/* Background */}
      <div className="hero__bg">
        <div className="hero__bg-overlay" />
        <img
          src="/images/1st bike.png"
          alt=""
          className="hero__bg-img"
          aria-hidden="true"
        />
      </div>

      {/* Content */}
      <div className="container hero__container">
        <div className={`hero__content hero__content--${dir} ${animating ? 'hero__content--out' : 'hero__content--in'}`}>
          <span className="hero__label">{slide.label}</span>
          <p  className="hero__tag">{slide.tag}</p>
          <h1 className="hero__title">
            {slide.title.map((line, i) => (
              <span key={i} className={i === 1 ? 'hero__title--red' : ''}>{line}</span>
            ))}
          </h1>
          <p className="hero__desc">{slide.desc}</p>
          <div className="hero__price-row">
            <span className="hero__price">{slide.price}</span>
            <span className="hero__sale-chip">SAVE {slide.salePercent}</span>
          </div>
          <div className="hero__btns">
            <Link to={slide.cta.to} className="btn btn-primary hero__btn-shop">
              {slide.cta.label}
            </Link>
            <Link to="/brands" className="btn btn-outline hero__btn-brands">
              View Brands
            </Link>
          </div>
        </div>

        {/* Sale Badge */}
        <div className="hero__badge">
          <small>UP TO</small>
          <span>{slide.salePercent}</span>
          <strong>OFF SALE</strong>
        </div>
      </div>

      {/* Controls */}
      <div className="hero__controls">
        <button onClick={prev} className="hero__arrow" aria-label="Previous">
          <FiChevronLeft />
        </button>
        <div className="hero__dots">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`hero__dot ${i === current ? 'hero__dot--active' : ''}`}
              onClick={() => go(i, i > current ? 'next' : 'prev')}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
        <button onClick={next} className="hero__arrow" aria-label="Next">
          <FiChevronRight />
        </button>
      </div>

      {/* Progress bar */}
      <div className="hero__progress-bar" key={current} />
    </section>
  );
}
