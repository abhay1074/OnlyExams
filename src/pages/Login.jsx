import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login, user } = useAuth();

  React.useEffect(() => {
    if (user) {
      navigate(user.role === 'admin' ? '/admin' : '/student');
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mock authentication logic
    if (email === 'admin@onlyexams.com' && password === 'admin') {
      login({ name: 'Admin User', email, role: 'admin', id: '1' });
      toast.success('Welcome back, Admin!');
      navigate('/admin');
    } else if (email === 'student@onlyexams.com' && password === 'student') {
      login({ name: 'Abhay Yadav', email, role: 'student', id: '2' });
      toast.success('Welcome to OnlyExams!');
      navigate('/student');
    } else {
      toast.error('Invalid credentials. Try admin@onlyexams.com / admin');
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <motion.div 
        className="glass card"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ width: '100%', maxWidth: '450px', padding: '3rem' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Login</h2>
          <p style={{ color: 'var(--text-muted)' }}>Access your examination dashboard</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ position: 'relative' }}>
            <Mail style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={18} />
            <input 
              type="email" 
              className="input-field" 
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ paddingLeft: '3rem' }}
              required
            />
          </div>

          <div style={{ position: 'relative' }}>
            <Lock style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={18} />
            <input 
              type="password" 
              className="input-field" 
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ paddingLeft: '3rem' }}
              required
            />
          </div>

          <button type="submit" className="btn-primary" style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            Sign In <ArrowRight size={18} />
          </button>
        </form>

        <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Don't have an account? <Link to="/register" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>Sign up</Link>
        </div>

        <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', fontSize: '0.8rem' }}>
          <p style={{ color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Demo Credentials:</p>
          <p>Admin: admin@onlyexams.com / admin</p>
          <p>Student: student@onlyexams.com / student</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
