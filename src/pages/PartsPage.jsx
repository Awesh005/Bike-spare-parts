import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { products, categories } from '../data/products';
import ProductCard from '../components/ui/ProductCard';
import { FiArrowRight } from 'react-icons/fi';

export default function PartsPage() {
  useEffect(() => { document.title = 'Parts | Moto Hub'; }, []);
  const parts = products.filter((p) => ['engine','brakes','chains','tyres'].includes(p.category));
  return (
    <div style={{ padding: '2rem 0 5rem' }}>
      <div style={{ background: 'linear-gradient(rgba(5,5,5,.85),rgba(5,5,5,.85)), url(/images/engine.png) center/cover', padding: '5rem 0', textAlign: 'center', marginBottom: '3rem' }}>
        <div className="container">
          <h1 style={{ fontFamily:'Outfit,sans-serif', fontSize:'clamp(2.5rem,5vw,4rem)', fontWeight: 900 }}>Bike Parts</h1>
          <p style={{ color: 'var(--clr-text-muted)' }}>Engine, Brakes, Chains &amp; Tyres — All Genuine</p>
        </div>
      </div>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">All Parts</h2>
          <Link to="/shop" className="view-link">Full Shop <FiArrowRight /></Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
          {parts.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </div>
  );
}
