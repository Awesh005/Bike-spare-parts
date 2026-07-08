import { Link } from 'react-router-dom';
import {
  FiFacebook, FiTwitter, FiInstagram, FiYoutube,
  FiMapPin, FiPhone, FiMail, FiClock
} from 'react-icons/fi';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">

          {/* Brand */}
          <div className="footer__brand">
            <img src="/images/logo.png" alt="Moto Hub" className="footer__logo" />
            <p className="footer__tagline">
              Premium Bike Parts &amp; Accessories for Every Rider.
            </p>
            <div className="footer__socials">
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FiFacebook />
              </a>
              <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <FiTwitter />
              </a>
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FiInstagram />
              </a>
              <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <FiYoutube />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer__col">
            <h5 className="footer__heading">Quick Links</h5>
            <ul className="footer__links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/shop">Shop</Link></li>
              <li><Link to="/parts">Parts</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="footer__col">
            <h5 className="footer__heading">Categories</h5>
            <ul className="footer__links">
              <li><Link to="/shop?cat=engine">Engine Parts</Link></li>
              <li><Link to="/shop?cat=brakes">Brakes</Link></li>
              <li><Link to="/shop?cat=tyres">Tyres</Link></li>
              <li><Link to="/shop?cat=chains">Chains</Link></li>
              <li><Link to="/shop?cat=helmets">Helmets</Link></li>
              <li><Link to="/shop?cat=lights">Lights</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="footer__col">
            <h5 className="footer__heading">Customer Service</h5>
            <ul className="footer__links">
              <li><Link to="/shop">Track Order</Link></li>
              <li><Link to="/shop">Returns &amp; Refunds</Link></li>
              <li><Link to="/shop">Privacy Policy</Link></li>
              <li><Link to="/shop">Terms &amp; Conditions</Link></li>
              <li><Link to="/shop">FAQs</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer__col footer__col--contact">
            <h5 className="footer__heading">Contact</h5>
            <ul className="footer__contact-list">
              <li><FiMapPin /><span>Ranchi, Jharkhand, India</span></li>
              <li><FiPhone /><a href="tel:+919876543210">+91 9876543210</a></li>
              <li><FiMail /><a href="mailto:support@ridexgarage.com">support@ridexgarage.com</a></li>
              <li><FiClock /><span>Mon – Sat : 9:00 AM – 8:00 PM</span></li>
            </ul>
            <div className="footer__payment">
              <p className="footer__payment-title">Payment Methods</p>
              <img src="/images/visacard.jpeg" alt="Payment Methods" />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer__bottom">
          <p>© {year} Moto Hub. All Rights Reserved.</p>
          <div className="footer__bottom-links">
            <Link to="/shop">Privacy Policy</Link>
            <span>|</span>
            <Link to="/shop">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
