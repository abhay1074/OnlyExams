import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Building } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    institution: '',
    password: '',
    role: 'student'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    register({
      name: formData.name,
      email: formData.email,
      role: formData.role,
      id: Date.now().toString()
    });
    toast.success('Account created successfully!');
    navigate(formData.role === 'admin' ? '/admin' : '/student');
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
        style={{ width: '100%', maxWidth: '500px', padding: '3rem' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Get Started</h2>
          <p style={{ color: 'var(--text-muted)' }}>Create your OnlyExams account</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ position: 'relative' }}>
            <User style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={18} />
            <input 
              type="text" 
              className="input-field" 
              placeholder="Full Name" 
              style={{ paddingLeft: '3rem' }} 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required 
            />
          </div>

          <div style={{ position: 'relative' }}>
            <Mail style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={18} />
            <input 
              type="email" 
              className="input-field" 
              placeholder="Email address" 
              style={{ paddingLeft: '3rem' }} 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required 
            />
          </div>

          <div style={{ position: 'relative' }}>
            <Building style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={18} />
            <input 
              type="text" 
              className="input-field" 
              placeholder="Institution Name" 
              style={{ paddingLeft: '3rem' }} 
              value={formData.institution}
              onChange={(e) => setFormData({...formData, institution: e.target.value})}
              required 
            />
          </div>

          <div style={{ position: 'relative' }}>
            <Lock style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={18} />
            <input 
              type="password" 
              className="input-field" 
              placeholder="Create Password" 
              style={{ paddingLeft: '3rem' }} 
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required 
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <label style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              cursor: 'pointer', 
              flex: 1,
              background: formData.role === 'student' ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
              border: `1px solid ${formData.role === 'student' ? 'var(--primary)' : 'var(--glass-border)'}`,
              padding: '12px', 
              borderRadius: '12px' 
            }}>
              <input 
                type="radio" 
                name="role" 
                value="student" 
                checked={formData.role === 'student'} 
                onChange={() => setFormData({...formData, role: 'student'})}
              /> Student
            </label>
            <label style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              cursor: 'pointer', 
              flex: 1,
              background: formData.role === 'admin' ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
              border: `1px solid ${formData.role === 'admin' ? 'var(--primary)' : 'var(--glass-border)'}`,
              padding: '12px', 
              borderRadius: '12px' 
            }}>
              <input 
                type="radio" 
                name="role" 
                value="admin" 
                checked={formData.role === 'admin'} 
                onChange={() => setFormData({...formData, role: 'admin'})}
              /> Admin
            </label>
          </div>

          <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }}>
            Create Account
          </button>
        </form>

        <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>Log in</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
