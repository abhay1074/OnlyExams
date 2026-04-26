import React from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, BarChart2, Users, Target, Download } from 'lucide-react';
import { useExams } from '../context/ExamContext';

const AdminResults = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { exams, results } = useExams();
  
  const exam = exams.find(e => e.id === id);
  const examResults = results.filter(r => r.examId === id);

  const avgScore = examResults.length > 0 
    ? Math.round(examResults.reduce((acc, r) => acc + (r.score / r.total) * 100, 0) / examResults.length)
    : 0;

  const highestScore = examResults.length > 0
    ? Math.max(...examResults.map(r => Math.round((r.score / r.total) * 100)))
    : 0;

  return (
    <div style={{ padding: '8rem 2rem 4rem', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ marginBottom: '3rem' }}>
        <button onClick={() => navigate('/admin')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', marginBottom: '1rem' }}>
          <ChevronLeft size={20} /> Back to Dashboard
        </button>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 700 }}>{exam?.title} <span className="gradient-text">Analytics</span></h1>
            <p style={{ color: 'var(--text-muted)' }}>Detailed performance breakdown for {examResults.length} candidates.</p>
          </div>
          <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Download size={18} /> Export CSV
          </button>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
        <div className="glass card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div style={{ color: 'var(--primary)' }}><Users size={20} /></div>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Participants</p>
          <p style={{ fontSize: '1.75rem', fontWeight: 700 }}>{examResults.length}</p>
        </div>
        <div className="glass card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div style={{ color: 'var(--secondary)' }}><BarChart2 size={20} /></div>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Average Score</p>
          <p style={{ fontSize: '1.75rem', fontWeight: 700 }}>{avgScore}%</p>
        </div>
        <div className="glass card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div style={{ color: '#10b981' }}><Target size={20} /></div>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Highest Score</p>
          <p style={{ fontSize: '1.75rem', fontWeight: 700 }}>{highestScore}%</p>
        </div>
      </div>

      <div className="glass" style={{ padding: '2rem', borderRadius: '24px' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Candidate Standings</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--glass-border)' }}>
              <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 500, fontSize: '0.9rem' }}>Candidate Name</th>
              <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 500, fontSize: '0.9rem' }}>Raw Score</th>
              <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 500, fontSize: '0.9rem' }}>Percentage</th>
              <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 500, fontSize: '0.9rem' }}>Date Submitted</th>
            </tr>
          </thead>
          <tbody>
            {examResults.map((res) => (
              <tr key={res.id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                <td style={{ padding: '1.25rem 1rem', fontWeight: 600 }}>{res.studentName}</td>
                <td style={{ padding: '1.25rem 1rem' }}>{res.score} / {res.total}</td>
                <td style={{ padding: '1.25rem 1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '100px', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
                      <div style={{ width: `${(res.score/res.total)*100}%`, height: '100%', background: 'var(--primary)' }}></div>
                    </div>
                    <span>{Math.round((res.score/res.total)*100)}%</span>
                  </div>
                </td>
                <td style={{ padding: '1.25rem 1rem', color: 'var(--text-muted)' }}>{res.date}</td>
              </tr>
            ))}
            {examResults.length === 0 && (
              <tr>
                <td colSpan="4" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>No results recorded for this exam yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminResults;
