import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/layout/Layout';

// Lazy-load all pages for code splitting
const HomePage        = lazy(() => import('./pages/HomePage'));
const ShopPage        = lazy(() => import('./pages/ShopPage'));
const ProductPage     = lazy(() => import('./pages/ProductPage'));
const CartPage        = lazy(() => import('./pages/CartPage'));
const AboutPage       = lazy(() => import('./pages/AboutPage'));
const BrandsPage      = lazy(() => import('./pages/BrandsPage'));
const PartsPage       = lazy(() => import('./pages/PartsPage'));
const AccessoriesPage = lazy(() => import('./pages/AccessoriesPage'));
const GaragePage      = lazy(() => import('./pages/GaragePage'));
const ContactPage     = lazy(() => import('./pages/ContactPage'));
const LoginPage       = lazy(() => import('./pages/AuthPages').then(m => ({ default: m.LoginPage })));
const RegisterPage    = lazy(() => import('./pages/AuthPages').then(m => ({ default: m.RegisterPage })));

// Loading spinner
function PageLoader() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      color: '#777',
    }}>
      <div style={{
        width: '36px',
        height: '36px',
        border: '3px solid #222',
        borderTop: '3px solid #ff2020',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
      }} />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <CartProvider>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="shop"        element={<ShopPage />} />
                <Route path="product/:slug" element={<ProductPage />} />
                <Route path="cart"        element={<CartPage />} />
                <Route path="about"       element={<AboutPage />} />
                <Route path="brands"      element={<BrandsPage />} />
                <Route path="parts"       element={<PartsPage />} />
                <Route path="accessories" element={<AccessoriesPage />} />
                <Route path="garage"      element={<GaragePage />} />
                <Route path="contact"     element={<ContactPage />} />
                <Route path="login"       element={<LoginPage />} />
                <Route path="register"    element={<RegisterPage />} />
                {/* 404 */}
                <Route path="*" element={
                  <div style={{ textAlign:'center', padding:'8rem 2rem', color:'#777' }}>
                    <h1 style={{ fontSize:'4rem', fontWeight:900, color:'#ff2020' }}>404</h1>
                    <p style={{ fontSize:'1.2rem', margin:'1rem 0 2rem' }}>Page not found</p>
                    <a href="/" style={{ background:'#ff2020', color:'#fff', padding:'.875rem 2rem', borderRadius:'6px', fontWeight:700, textDecoration:'none' }}>
                      Go Home
                    </a>
                  </div>
                } />
              </Route>
            </Routes>
          </Suspense>
        </CartProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
