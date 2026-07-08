import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FiArrowLeft, FiShoppingBag, FiHeart, FiStar, FiPlus, FiMinus, FiZap } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { getProductBySlug, products } from '../data/products';
import ProductCard from '../components/ui/ProductCard';
import './ProductPage.css';

export default function ProductPage() {
  const { slug } = useParams();
  const navigate  = useNavigate();
  const { addItem } = useCart();

  const product = getProductBySlug(slug);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity,      setQuantity]      = useState(1);
  const [added,         setAdded]         = useState(false);
  const [wishlist,      setWishlist]      = useState(false);
  const [activeTab,     setActiveTab]     = useState('description');

  useEffect(() => {
    if (product) {
      document.title = `${product.shortName || product.name} | Moto Hub`;
      setSelectedImage(0);
      setSelectedColor(product.colors[0] || '');
      setQuantity(1);
      setAdded(false);
    }
  }, [slug, product]);

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Product Not Found</h2>
        <p>The product you're looking for doesn't exist.</p>
        <button className="btn btn-primary" onClick={() => navigate('/shop')}>
          Back to Shop
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem({
      id:       product.id,
      name:     product.shortName || product.name,
      price:    product.price,
      image:    product.images[0],
      slug:     product.slug,
      color:    selectedColor,
      quantity,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  // Related products (same category, exclude current)
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="product-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="product-breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/shop">Shop</Link>
          <span>/</span>
          <span>{product.shortName || product.name}</span>
        </nav>

        {/* Back Button */}
        <button className="btn btn-ghost product-back-btn" onClick={() => navigate(-1)}>
          <FiArrowLeft /> Back
        </button>

        {/* Main Product */}
        <div className="product-layout">
          {/* Gallery */}
          <div className="product-gallery">
            <div className="product-gallery__main">
              {product.badge && (
                <span className="product-gallery__badge badge badge-red">
                  {product.badge}
                </span>
              )}
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="product-gallery__img"
              />
            </div>
            <div className="product-gallery__thumbs">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  className={`product-thumb ${selectedImage === i ? 'product-thumb--active' : ''}`}
                  onClick={() => setSelectedImage(i)}
                  aria-label={`View image ${i + 1}`}
                >
                  <img src={img} alt="" loading="lazy" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="product-info">
            {product.badge && (
              <span className="badge badge-red mb">{product.badge}</span>
            )}
            <h1 className="product-info__name">{product.name}</h1>

            {/* Rating */}
            <div className="product-info__rating">
              {[1,2,3,4,5].map((s) => (
                <FiStar
                  key={s}
                  className={s <= product.rating ? 'star star--filled' : 'star star--empty'}
                  style={{ fontSize: '1rem' }}
                />
              ))}
              <span className="product-info__reviews">({product.reviews} Reviews)</span>
            </div>

            {/* Price */}
            <div className="product-info__price-row">
              <span className="product-info__price">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice > product.price && (
                <>
                  <span className="product-info__original">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="badge badge-red">-{product.discount}%</span>
                </>
              )}
            </div>

            {/* Features */}
            <ul className="product-info__features">
              {product.features.map((f) => (
                <li key={f}>✅ {f}</li>
              ))}
            </ul>

            {/* Colors */}
            {product.colors.length > 0 && (
              <div className="product-info__section">
                <p className="product-info__label">Color: <strong>{selectedColor}</strong></p>
                <div className="product-colors">
                  {product.colors.map((c) => (
                    <button
                      key={c}
                      className={`color-chip ${selectedColor === c ? 'color-chip--active' : ''}`}
                      onClick={() => setSelectedColor(c)}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Compatibility */}
            {product.compatibility.length > 0 && (
              <div className="product-info__section">
                <p className="product-info__label">Compatible With</p>
                <div className="product-compatibility">
                  {product.compatibility.map((c) => (
                    <span key={c} className="compat-chip">{c}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="product-info__section">
              <p className="product-info__label">Quantity</p>
              <div className="qty-control">
                <button
                  className="qty-btn"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                >
                  <FiMinus />
                </button>
                <span className="qty-value">{quantity}</span>
                <button
                  className="qty-btn"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                >
                  <FiPlus />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="product-info__actions">
              <button
                className={`btn btn-primary product-cart-btn ${added ? 'product-cart-btn--added' : ''}`}
                onClick={handleAddToCart}
                disabled={added}
              >
                <FiShoppingBag />
                {added ? 'Added to Cart!' : 'Add to Cart'}
              </button>
              <button
                className="btn btn-outline product-buy-btn"
                onClick={handleBuyNow}
              >
                <FiZap /> Buy Now
              </button>
              <button
                className={`btn btn-ghost product-wish-btn ${wishlist ? 'product-wish-btn--active' : ''}`}
                onClick={() => setWishlist((v) => !v)}
                aria-label="Add to wishlist"
              >
                <FiHeart />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="trust-badges">
              <div className="trust-badge"><span>🚚</span> Free Delivery above ₹999</div>
              <div className="trust-badge"><span>🔄</span> 7-Day Returns</div>
              <div className="trust-badge"><span>🛡️</span> Genuine Product</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="product-tabs">
          <div className="product-tabs__nav">
            {['description', 'specifications', 'reviews'].map((tab) => (
              <button
                key={tab}
                className={`product-tab-btn ${activeTab === tab ? 'product-tab-btn--active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          <div className="product-tabs__content">
            {activeTab === 'description' && (
              <p className="product-desc-text">{product.description}</p>
            )}
            {activeTab === 'specifications' && (
              <ul className="product-specs-list">
                <li><strong>Category:</strong> {product.category}</li>
                <li><strong>SKU:</strong> MH-{product.id.toString().padStart(4, '0')}</li>
                <li><strong>In Stock:</strong> {product.inStock ? '✅ Yes' : '❌ No'}</li>
                {product.colors.length > 0 && (
                  <li><strong>Colors:</strong> {product.colors.join(', ')}</li>
                )}
                {product.compatibility.length > 0 && (
                  <li><strong>Compatibility:</strong> {product.compatibility.join(', ')}</li>
                )}
              </ul>
            )}
            {activeTab === 'reviews' && (
              <div className="product-reviews-placeholder">
                <p>⭐ {product.rating}/5 based on {product.reviews} reviews</p>
                <p className="text-muted" style={{ marginTop: '.5rem', color: 'var(--clr-text-muted)', fontSize: '.9rem' }}>
                  Review system coming soon. Rate this product after purchase.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section className="related-products">
            <div className="section-header">
              <h2 className="section-title">Related Products</h2>
              <Link to="/shop" className="view-link">View All</Link>
            </div>
            <div className="related-grid">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
