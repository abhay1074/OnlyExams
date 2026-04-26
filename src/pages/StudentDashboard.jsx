import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, CheckCircle, BarChart2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useExams } from '../context/ExamContext';

const StudentDashboard = () => {
  const { user } = useAuth();
  const { exams, results } = useExams();

  const studentResults = results.filter(r => r.studentId === user.id);
  const upcomingExams = exams.filter(e => e.status !== 'Completed');

  const avgScore = studentResults.length > 0 
    ? Math.round(studentResults.reduce((acc, r) => acc + (r.score / r.total) * 100, 0) / studentResults.length)
    : 0;

  return (
    <div style={{ padding: '8rem 2rem 4rem', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 700 }}>Welcome back, <span className="gradient-text">{user.name}</span>!</h1>
        <p style={{ color: 'var(--text-muted)' }}>You have {upcomingExams.length} exams scheduled.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem', marginBottom: '3rem' }}>
        <div className="glass card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '0.75rem', borderRadius: '12px', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)' }}>
            <BookOpen size={24} />
          </div>
          <div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Exams Taken</p>
            <p style={{ fontSize: '1.5rem', fontWeight: 700 }}>{studentResults.length}</p>
          </div>
        </div>
        <div className="glass card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '0.75rem', borderRadius: '12px', background: 'rgba(236, 72, 153, 0.1)', color: 'var(--secondary)' }}>
            <BarChart2 size={24} />
          </div>
          <div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Average Score</p>
            <p style={{ fontSize: '1.5rem', fontWeight: 700 }}>{avgScore}%</p>
          </div>
        </div>
        <div className="glass card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '0.75rem', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
            <CheckCircle size={24} />
          </div>
          <div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Completed</p>
            <p style={{ fontSize: '1.5rem', fontWeight: 700 }}>{studentResults.length}</p>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.5rem' }}>Upcoming Exams</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {upcomingExams.length > 0 ? upcomingExams.map((exam) => (
              <motion.div 
                key={exam.id} 
                className="glass card" 
                style={{ padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                whileHover={{ x: 5 }}
              >
                <div>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{exam.title}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{exam.subject} • {exam.duration}</p>
                </div>
                <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '0.9rem', fontWeight: 500 }}>{exam.date}</p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{exam.time}</p>
                  </div>
                  <Link to={`/exam/${exam.id}`} className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.85rem', textDecoration: 'none' }}>
                    Start Exam
                  </Link>
                </div>
              </motion.div>
            )) : (
              <div className="glass" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                No upcoming exams scheduled.
              </div>
            )}
          </div>
        </section>

        <section>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Recent Performance</h2>
          <div className="glass" style={{ borderRadius: '20px', padding: '1.5rem' }}>
            {studentResults.length > 0 ? studentResults.map((result, i) => (
              <div key={i} style={{ 
                paddingBottom: i < studentResults.length - 1 ? '1rem' : 0, 
                marginBottom: i < studentResults.length - 1 ? '1rem' : 0,
                borderBottom: i < studentResults.length - 1 ? '1px solid var(--glass-border)' : 'none'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 600 }}>{result.examTitle}</span>
                  <span style={{ color: '#10b981', fontWeight: 700 }}>{result.score}/{result.total}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  <span>{result.date}</span>
                </div>
              </div>
            )) : (
              <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No results found.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default StudentDashboard;
