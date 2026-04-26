import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Zap, BarChart3, Users } from 'lucide-react';

const Landing = () => {
  return (
    <div style={{ padding: '8rem 2rem 4rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 style={{ fontSize: '4.5rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.5rem' }} className="gradient-text">
            The Future of <br />Digital Examinations
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto 2.5rem', lineHeight: 1.6 }}>
            Empowering institutions with secure, fast, and automated examination management. 
            Experience 10x faster results and 64% cost reduction.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
            <Link to="/register" className="btn-primary" style={{ fontSize: '1.1rem', padding: '16px 36px', textDecoration: 'none' }}>
              Create Institution Account
            </Link>
            <Link to="/login" className="btn-secondary" style={{ fontSize: '1.1rem', padding: '16px 36px', textDecoration: 'none' }}>
              Student Login
            </Link>
          </div>
        </motion.div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '2rem', 
          marginTop: '6rem' 
        }}>
          {[
            { icon: <Shield size={32} color="#6366f1" />, title: 'Secure & Anti-Cheat', desc: 'Advanced proctoring and browser locking to ensure exam integrity.' },
            { icon: <Zap size={32} color="#ec4899" />, title: 'Instant Evaluation', desc: 'Automatic grading for objective questions with real-time feedback.' },
            { icon: <BarChart3 size={32} color="#8b5cf6" />, title: 'Deep Analytics', desc: 'Comprehensive performance reports and student progress tracking.' },
            { icon: <Users size={32} color="#10b981" />, title: 'Scalable Platform', desc: 'Easily manage 10,000+ students simultaneously without lag.' },
          ].map((feature, i) => (
            <motion.div
              key={i}
              className="glass card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              style={{ textAlign: 'left' }}
            >
              <div style={{ marginBottom: '1.5rem' }}>{feature.icon}</div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>{feature.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.5 }}>{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Landing;
