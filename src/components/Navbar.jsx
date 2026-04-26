import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Layout } from 'lucide-react';

const Navbar = ({ user, logout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="glass" style={{
      position: 'fixed',
      top: '1rem',
      left: '1rem',
      right: '1rem',
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0.75rem 2rem',
      margin: '0 auto',
      maxWidth: '1400px'
    }}>
      <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{
          width: '32px',
          height: '32px',
          background: 'linear-gradient(135deg, #6366f1, #ec4899)',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
          color: 'white'
        }}>O</div>
        <span style={{ fontWeight: 700, fontSize: '1.25rem', color: 'white', letterSpacing: '-0.02em' }}>OnlyExams</span>
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        {user ? (
          <>
            <Link to={user.role === 'admin' ? '/admin' : '/student'} className="nav-link" style={{ 
              color: 'var(--text-muted)', 
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.9rem'
            }}>
              <Layout size={18} />
              Dashboard
            </Link>
            <div style={{ height: '20px', width: '1px', background: 'var(--glass-border)' }}></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '0.85rem', fontWeight: 600 }}>{user.name}</p>
                <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{user.role.toUpperCase()}</p>
              </div>
              <button onClick={handleLogout} className="btn-secondary" style={{ padding: '8px', borderRadius: '10px' }}>
                <LogOut size={18} />
              </button>
            </div>
          </>
        ) : (
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link to="/login" className="btn-secondary" style={{ textDecoration: 'none', fontSize: '0.9rem', padding: '10px 20px' }}>Login</Link>
            <Link to="/register" className="btn-primary" style={{ textDecoration: 'none', fontSize: '0.9rem', padding: '10px 24px' }}>Get Started</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
