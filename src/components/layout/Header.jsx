import { useState, useEffect, useCallback, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import {
  FiPhone, FiMail, FiMapPin, FiUser,
  FiSearch, FiHeart, FiShoppingBag, FiMenu, FiX, FiChevronDown
} from 'react-icons/fi';
import ThemeToggle from '../ui/ThemeToggle';
import './Header.css';

const navLinks = [
  { label: 'Home',        to: '/' },
  { label: 'About Us',    to: '/about' },
  { label: 'Shop',        to: '/shop' },
  { label: 'Parts',       to: '/parts' },
  { label: 'Accessories', to: '/accessories' },
  { label: 'Brands',      to: '/brands' },
  { label: 'Garage',      to: '/garage' },
  { label: 'Contact',     to: '/contact' },
];

export default function Header() {
  const { cartCount } = useCart();
  const [scrolled,    setScrolled]    = useState(false);
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [searchOpen,  setSearchOpen]  = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [prevCount,   setPrevCount]   = useState(cartCount);
  const [cartBump,    setCartBump]    = useState(false);
  const searchRef = useRef(null);
  const navigate  = useNavigate();

  // Navbar scroll effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Cart badge pop animation
  useEffect(() => {
    if (cartCount !== prevCount) {
      setCartBump(true);
      const t = setTimeout(() => setCartBump(false), 400);
      setPrevCount(cartCount);
      return () => clearTimeout(t);
    }
  }, [cartCount, prevCount]);

  // Close menu on route change
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // Focus search input when opened
  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  // Close menu on Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') { setMenuOpen(false); setSearchOpen(false); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      {/* ── Top Bar ──────────────────────────────────────── */}
      <div className="top-bar">
        <div className="container top-bar__inner">
          <div className="top-bar__left">
            <a href="tel:+919876543210"><FiPhone />&nbsp;+91 9876543210</a>
            <a href="mailto:support@ridexgarage.com"><FiMail />&nbsp;support@ridexgarage.com</a>
          </div>
          <div className="top-bar__center">
            🚚 Free Shipping on orders above ₹999
          </div>
          <div className="top-bar__right">
            <Link to="/shop"><FiMapPin />&nbsp;Track Order</Link>
            <Link to="/login"><FiUser />&nbsp;Login</Link>
            <Link to="/register"><FiUser />&nbsp;Register</Link>
          </div>
        </div>
      </div>

      {/* ── Main Navbar ───────────────────────────────────── */}
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} role="navigation">
        <div className="container navbar__inner">
          {/* Logo */}
          <Link to="/" className="navbar__brand" onClick={closeMenu}>
            <img src="/images/logo.png" alt="Moto Hub Logo" />
          </Link>

          {/* Desktop Nav */}
          <ul className="navbar__links">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `navbar__link ${isActive ? 'navbar__link--active' : ''}`
                  }
                  end={link.to === '/'}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Icons */}
          <div className="navbar__actions">
            <button
              className="icon-btn"
              onClick={() => setSearchOpen((v) => !v)}
              aria-label="Search"
            >
              <FiSearch />
            </button>
            <Link to="/shop" className="icon-btn" aria-label="Wishlist">
              <FiHeart />
            </Link>
            <Link to="/cart" className="icon-btn icon-btn--cart" aria-label="Cart">
              <FiShoppingBag />
              {cartCount > 0 && (
                <span className={`cart-badge ${cartBump ? 'cart-badge--bump' : ''}`}>
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Hamburger */}
            <ThemeToggle />
            <button
              className="hamburger"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>

        {/* Search Bar Slide-down */}
        <div className={`search-bar ${searchOpen ? 'search-bar--open' : ''}`}>
          <form onSubmit={handleSearch} className="container search-bar__form">
            <FiSearch className="search-bar__icon" />
            <input
              ref={searchRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for parts, helmets, tyres..."
              className="search-bar__input"
            />
            <button type="submit" className="btn btn-primary search-bar__btn">
              Search
            </button>
            <button
              type="button"
              className="icon-btn"
              onClick={() => setSearchOpen(false)}
              aria-label="Close search"
            >
              <FiX />
            </button>
          </form>
        </div>
      </nav>

      {/* ── Mobile Menu ───────────────────────────────────── */}
      <div
        className={`mobile-menu ${menuOpen ? 'mobile-menu--open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <ul className="mobile-menu__links">
          {navLinks.map((link, i) => (
            <li key={link.to} style={{ '--i': i }}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `mobile-menu__link ${isActive ? 'mobile-menu__link--active' : ''}`
                }
                onClick={closeMenu}
                end={link.to === '/'}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="mobile-menu__footer">
          <Link to="/login" className="btn btn-outline" onClick={closeMenu}>Login</Link>
          <Link to="/register" className="btn btn-primary" onClick={closeMenu}>Register</Link>
        </div>
      </div>

      {/* Mobile Overlay */}
      {menuOpen && (
        <div
          className="mobile-overlay"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
    </>
  );
}
