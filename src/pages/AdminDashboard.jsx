import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, FileText, Plus, Search, Filter, Trash2, TrendingUp, BookOpen, ChevronRight } from 'lucide-react';
import { useExams } from '../context/ExamContext';
import { toast } from 'react-toastify';
import ExamWizard from '../components/ExamWizard';

const AdminDashboard = () => {
  const { exams, deleteExam } = useExams();
  const [showWizard, setShowWizard] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');

  const filteredExams = exams
    .filter(exam => 
      exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.subject.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === 'asc') return a.title.localeCompare(b.title);
      return b.title.localeCompare(a.title);
    });

  const toggleSort = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    toast.info(`Sorted by title: ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`);
  };

  const stats = [
    { label: 'Total Students', value: '1,284', change: '+12%', icon: <Users size={20} /> },
    { label: 'Active Exams', value: exams.length.toString(), change: '+3', icon: <FileText size={20} /> },
    { label: 'Avg. Pass Rate', value: '76%', change: '+5%', icon: <TrendingUp size={20} /> },
  ];

  return (
    <div style={{ padding: '8rem 2rem 4rem', maxWidth: '1400px', margin: '0 auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 700 }}>Admin <span className="gradient-text">Console</span></h1>
          <p style={{ color: 'var(--text-muted)' }}>Manage your institution's examination lifecycle.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/admin/questions" className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
            <BookOpen size={20} /> Question Bank
          </Link>
          <button className="btn-primary" onClick={() => setShowWizard(true)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Plus size={20} /> Create New Exam
          </button>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
        {stats.map((stat, i) => (
          <div key={i} className="glass card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div style={{ color: 'var(--primary)' }}>{stat.icon}</div>
              <span style={{ color: '#10b981', fontSize: '0.85rem', fontWeight: 600 }}>{stat.change}</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>{stat.label}</p>
            <p style={{ fontSize: '1.75rem', fontWeight: 700 }}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="glass" style={{ padding: '2rem', borderRadius: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem' }}>Recent & Scheduled Exams</h2>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ position: 'relative' }}>
              <Search style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={16} />
              <input 
                type="text" 
                className="input-field" 
                placeholder="Search exams..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ padding: '8px 12px 8px 2.5rem', width: '250px', fontSize: '0.85rem' }} 
              />
            </div>
            <button onClick={toggleSort} className="btn-secondary" style={{ padding: '8px 12px', borderRadius: '10px' }}><Filter size={18} /></button>
          </div>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--glass-border)' }}>
              <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 500, fontSize: '0.9rem' }}>Exam Name</th>
              <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 500, fontSize: '0.9rem' }}>Date</th>
              <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 500, fontSize: '0.9rem' }}>Questions</th>
              <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 500, fontSize: '0.9rem' }}>Status</th>
              <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 500, fontSize: '0.9rem' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredExams.map((exam) => (
              <tr key={exam.id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                <td style={{ padding: '1.25rem 1rem', fontWeight: 600 }}>{exam.title}</td>
                <td style={{ padding: '1.25rem 1rem', color: 'var(--text-muted)' }}>{exam.date}</td>
                <td style={{ padding: '1.25rem 1rem' }}>{exam.questionIds?.length || 0}</td>
                <td style={{ padding: '1.25rem 1rem' }}>
                  <span style={{ 
                    padding: '4px 12px', 
                    borderRadius: '20px', 
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    background: exam.status === 'Active' ? 'rgba(16, 185, 129, 0.1)' : (exam.status === 'Completed' ? 'rgba(255,255,255,0.05)' : 'rgba(99, 102, 241, 0.1)'),
                    color: exam.status === 'Active' ? '#10b981' : (exam.status === 'Completed' ? 'var(--text-muted)' : 'var(--primary)')
                  }}>
                    {exam.status}
                  </span>
                </td>
                <td style={{ padding: '1.25rem 1rem', display: 'flex', gap: '0.5rem' }}>
                   <Link to={`/admin/results/${exam.id}`} className="btn-secondary" style={{ padding: '6px 12px', fontSize: '0.75rem', textDecoration: 'none' }}>
                     Results
                   </Link>
                   <button 
                    onClick={() => deleteExam(exam.id)}
                    className="btn-secondary" 
                    style={{ padding: '6px 12px', fontSize: '0.75rem', color: '#ef4444' }}
                   >
                     <Trash2 size={14} />
                   </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {showWizard && <ExamWizard onClose={() => setShowWizard(false)} />}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
