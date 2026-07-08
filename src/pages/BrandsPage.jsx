import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { brands } from '../data/products';
import { FiArrowRight } from 'react-icons/fi';

export default function BrandsPage() {
  useEffect(() => { document.title = 'Brands | Moto Hub'; }, []);
  return (
    <div style={{ padding: '2rem 0 5rem' }}>
      <div style={{ background: 'linear-gradient(rgba(5,5,5,.85),rgba(5,5,5,.85)), url(/images/2nd bike.png) center/cover', padding: '5rem 0', textAlign: 'center', marginBottom: '3rem', borderBottom: '1px solid var(--clr-border)' }}>
        <div className="container">
          <h1 style={{ fontFamily:'Outfit,sans-serif', fontSize:'clamp(2.5rem,5vw,4rem)', fontWeight: 900 }}>Our Brands</h1>
          <p style={{ color: 'var(--clr-text-muted)' }}>Official Parts from India's Top Motorcycle Brands</p>
        </div>
      </div>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px,1fr))', gap: '1.5rem' }}>
          {brands.map((b) => (
            <Link key={b.name} to={`/shop?q=${b.name}`} style={{ background:'var(--clr-bg-card)', border:'1px solid var(--clr-border)', borderRadius:'var(--radius-md)', padding:'2.5rem 1.5rem', textAlign:'center', display:'flex', flexDirection:'column', alignItems:'center', gap:'.75rem', transition:'all var(--trans)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor='var(--clr-primary)'; e.currentTarget.style.transform='translateY(-5px)'; e.currentTarget.style.boxShadow='var(--shadow-red)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='var(--clr-border)'; e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='none'; }}
            >
              <img src={b.logo} alt={b.name} style={{ maxHeight:'70px', objectFit:'contain', maxWidth:'150px' }} loading="lazy" />
              <span style={{ color:'var(--clr-text)', fontWeight:700, fontSize:'.9rem', letterSpacing:'.5px' }}>{b.name}</span>
              <span style={{ color:'var(--clr-primary)', fontSize:'.8rem', display:'flex', alignItems:'center', gap:'.3rem' }}>Shop <FiArrowRight /></span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
