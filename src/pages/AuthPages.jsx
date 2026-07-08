import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import './AuthPages.css';

export function LoginPage() {
  useEffect(() => { document.title = 'Login | Moto Hub'; }, []);
  return (
    <div className="auth-page">
      <div className="auth-card">
        <img src="/images/logo.png" alt="Moto Hub" className="auth-logo" />
        <h2>Welcome Back</h2>
        <p className="auth-sub">Login to your Moto Hub account</p>
        <form className="auth-form" onSubmit={(e) => { e.preventDefault(); alert('Login backend integration coming soon!'); }}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input type="email" className="form-control" placeholder="you@example.com" required />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" placeholder="••••••••" required />
          </div>
          <div className="auth-forgot"><a href="#">Forgot password?</a></div>
          <button type="submit" className="btn btn-primary auth-submit">
            Login <FiArrowRight />
          </button>
        </form>
        <p className="auth-switch">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export function RegisterPage() {
  useEffect(() => { document.title = 'Register | Moto Hub'; }, []);
  return (
    <div className="auth-page">
      <div className="auth-card">
        <img src="/images/logo.png" alt="Moto Hub" className="auth-logo" />
        <h2>Create Account</h2>
        <p className="auth-sub">Join the Moto Hub community today</p>
        <form className="auth-form" onSubmit={(e) => { e.preventDefault(); alert('Registration backend integration coming soon!'); }}>
          <div className="auth-form__row">
            <div className="form-group">
              <label className="form-label">First Name</label>
              <input type="text" className="form-control" placeholder="John" required />
            </div>
            <div className="form-group">
              <label className="form-label">Last Name</label>
              <input type="text" className="form-control" placeholder="Doe" required />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input type="email" className="form-control" placeholder="you@example.com" required />
          </div>
          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input type="tel" className="form-control" placeholder="+91 XXXXX XXXXX" />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" placeholder="Min. 8 characters" required minLength={8} />
          </div>
          <button type="submit" className="btn btn-primary auth-submit">
            Create Account <FiArrowRight />
          </button>
        </form>
        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
