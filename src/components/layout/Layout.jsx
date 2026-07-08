import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { FiArrowUp } from 'react-icons/fi';

export default function Layout() {
  const { pathname } = useLocation();
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  // Show scroll-to-top button
  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  // Calculate top padding based on whether top-bar is visible
  const topPad = window.innerWidth <= 480 ? '72px' : '110px';

  return (
    <>
      <Header />
      <main style={{ paddingTop: topPad }} id="main-content">
        <Outlet />
      </main>
      <Footer />

      {/* Scroll-to-top */}
      <button
        className={`scroll-top ${showScrollTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <FiArrowUp />
      </button>
    </>
  );
}
