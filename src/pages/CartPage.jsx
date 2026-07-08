import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiTrash2, FiPlus, FiMinus, FiShoppingBag, FiArrowLeft } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import './CartPage.css';

export default function CartPage() {
  const { cart, removeItem, updateQty, clearCart, cartTotal } = useCart();
  const navigate = useNavigate();

  useEffect(() => { document.title = 'Cart | Moto Hub'; }, []);

  const shipping = cartTotal >= 999 ? 0 : 99;
  const grandTotal = cartTotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="cart-empty">
            <FiShoppingBag className="cart-empty__icon" />
            <h2>Your Cart is Empty</h2>
            <p>Looks like you haven't added anything yet. Start exploring our collection!</p>
            <Link to="/shop" className="btn btn-primary">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        {/* Header */}
        <div className="cart-header">
          <button className="btn btn-ghost" onClick={() => navigate(-1)}>
            <FiArrowLeft /> Continue Shopping
          </button>
          <h1 className="cart-title">Shopping Cart <span>({cart.length} item{cart.length !== 1 ? 's' : ''})</span></h1>
          <button className="btn btn-ghost cart-clear-btn" onClick={clearCart}>
            <FiTrash2 /> Clear All
          </button>
        </div>

        <div className="cart-layout">
          {/* Items */}
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item._key} className="cart-item">
                <Link to={`/product/${item.slug}`} className="cart-item__img-wrap">
                  <img src={item.image} alt={item.name} loading="lazy" />
                </Link>

                <div className="cart-item__info">
                  <Link to={`/product/${item.slug}`} className="cart-item__name">
                    {item.name}
                  </Link>
                  {item.color && (
                    <span className="cart-item__meta">Color: {item.color}</span>
                  )}
                  <span className="cart-item__price-unit">
                    ₹{item.price.toLocaleString('en-IN')} each
                  </span>
                </div>

                <div className="cart-item__qty-control">
                  <button
                    className="qty-btn"
                    onClick={() => updateQty(item._key, item.quantity - 1)}
                    aria-label="Decrease"
                    disabled={item.quantity <= 1}
                  >
                    <FiMinus />
                  </button>
                  <span className="qty-value">{item.quantity}</span>
                  <button
                    className="qty-btn"
                    onClick={() => updateQty(item._key, item.quantity + 1)}
                    aria-label="Increase"
                  >
                    <FiPlus />
                  </button>
                </div>

                <div className="cart-item__total">
                  ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                </div>

                <button
                  className="cart-item__remove"
                  onClick={() => removeItem(item._key)}
                  aria-label="Remove item"
                >
                  <FiTrash2 />
                </button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="cart-summary">
            <h3 className="cart-summary__title">Order Summary</h3>

            <div className="cart-summary__rows">
              <div className="cart-summary__row">
                <span>Subtotal</span>
                <span>₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="cart-summary__row">
                <span>Shipping</span>
                <span className={shipping === 0 ? 'text-green' : ''}>
                  {shipping === 0 ? 'FREE 🎉' : `₹${shipping}`}
                </span>
              </div>
              {shipping > 0 && (
                <p className="cart-summary__shipping-note">
                  Add ₹{(999 - cartTotal).toLocaleString('en-IN')} more to get FREE shipping!
                </p>
              )}
              <div className="divider" />
              <div className="cart-summary__row cart-summary__row--total">
                <span>Total</span>
                <span>₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              className="btn btn-primary cart-checkout-btn"
              onClick={() => alert('Checkout flow coming soon! Integrate with your backend.')}
            >
              Proceed to Checkout
            </button>

            {/* Trust */}
            <div className="cart-trust">
              <span>🔒 Secure Checkout</span>
              <span>🚚 Fast Delivery</span>
              <span>🔄 Easy Returns</span>
            </div>

            <img src="/images/visacard.jpeg" alt="Payment Methods" className="cart-payment-img" />
          </div>
        </div>
      </div>
    </div>
  );
}
