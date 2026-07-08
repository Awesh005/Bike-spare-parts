import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingBag, FiEye, FiStar } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import './ProductCard.css';

function StarRating({ rating, count }) {
  return (
    <div className="pc-rating">
      {[1,2,3,4,5].map((s) => (
        <FiStar
          key={s}
          className={s <= rating ? 'star star--filled' : 'star star--empty'}
        />
      ))}
      {count && <span className="pc-review-count">({count})</span>}
    </div>
  );
}

export default function ProductCard({ product }) {
  const { addItem, cart } = useCart();
  const [wishlist, setWishlist] = useState(false);
  const [added, setAdded] = useState(false);

  const inCart = cart.some((i) => i.id === product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addItem({
      id:       product.id,
      name:     product.shortName || product.name,
      price:    product.price,
      image:    product.images[0],
      slug:     product.slug,
      color:    '',
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    setWishlist((v) => !v);
  };

  return (
    <div className="product-card">
      {/* Badge */}
      {product.badge && (
        <span className="pc-badge badge badge-red">{product.badge}</span>
      )}
      {product.discount > 0 && (
        <span className="pc-discount badge badge-dark">-{product.discount}%</span>
      )}

      {/* Image */}
      <Link to={`/product/${product.slug}`} className="pc-img-wrap">
        <img
          src={product.images[0]}
          alt={product.name}
          className="pc-img"
          loading="lazy"
        />
        {/* Hover overlay */}
        <div className="pc-overlay">
          <button
            className={`pc-action-btn ${wishlist ? 'pc-action-btn--active' : ''}`}
            onClick={handleWishlist}
            aria-label="Add to wishlist"
          >
            <FiHeart />
          </button>
          <Link
            to={`/product/${product.slug}`}
            className="pc-action-btn"
            aria-label="Quick view"
          >
            <FiEye />
          </Link>
        </div>
      </Link>

      {/* Info */}
      <div className="pc-body">
        <StarRating rating={product.rating} count={product.reviews} />

        <Link to={`/product/${product.slug}`} className="pc-name">
          {product.shortName || product.name}
        </Link>

        <div className="pc-price-row">
          <span className="pc-price">₹{product.price.toLocaleString('en-IN')}</span>
          {product.originalPrice > product.price && (
            <span className="pc-original">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="pc-actions">
          <button
            className={`btn pc-cart-btn ${added ? 'pc-cart-btn--added' : ''}`}
            onClick={handleAddToCart}
            disabled={added}
          >
            <FiShoppingBag />
            {added ? 'Added!' : inCart ? 'In Cart' : 'Add to Cart'}
          </button>
          <Link to={`/product/${product.slug}`} className="btn btn-ghost pc-view-btn">
            View
          </Link>
        </div>
      </div>
    </div>
  );
}
