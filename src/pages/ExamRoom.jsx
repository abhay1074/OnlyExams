import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { Clock, ChevronLeft, ChevronRight, Send, AlertTriangle, Eye } from 'lucide-react';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { useExams } from '../context/ExamContext';

const ExamRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { exams, getQuestionsForExam, submitExam } = useExams();
  
  const exam = exams.find(e => e.id === id);
  const examQuestions = getQuestionsForExam(id);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState((exam?.duration || 60) * 60);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showReview, setShowReview] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleFinalSubmit();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev === 300) toast.warning('5 minutes remaining!', { position: 'top-center' });
        if (prev === 60) toast.error('1 minute remaining! Finalize your answers.', { position: 'top-center' });
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Anti-cheat: Detect tab switching
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && !isSubmitted) {
        toast.error('Warning: Tab switching detected! This incident has been logged.', { autoClose: 5000 });
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isSubmitted]);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs > 0 ? hrs + ':' : ''}${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleOptionSelect = (option) => {
    setAnswers({ ...answers, [examQuestions[currentQuestion].id]: option });
  };

  const handleFinalSubmit = () => {
    let score = 0;
    examQuestions.forEach(q => {
      if (answers[q.id] === q.correct) score++;
    });

    submitExam({
      examId: id,
      examTitle: exam?.title || 'Unknown Exam',
      studentId: user.id,
      studentName: user.name,
      score,
      total: examQuestions.length
    });

    setIsSubmitted(true);
    toast.success('Exam submitted successfully!');
    setTimeout(() => navigate('/student'), 3000);
  };

  if (isSubmitted) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <div style={{ width: '80px', height: '80px', background: '#10b981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', color: 'white' }}>
            <Send size={40} />
          </div>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Well Done!</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>Your exam has been submitted and is being processed.</p>
          <p style={{ marginTop: '2rem' }}>Redirecting to dashboard...</p>
        </motion.div>
      </div>
    );
  }

  if (examQuestions.length === 0) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div className="glass card" style={{ padding: '3rem' }}>
          <AlertTriangle size={48} color="#ef4444" style={{ margin: '0 auto 1.5rem' }} />
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>No Questions Found</h2>
          <p style={{ color: 'var(--text-muted)' }}>This exam does not have any questions assigned. Please contact the administrator.</p>
          <button onClick={() => navigate('/student')} className="btn-secondary" style={{ marginTop: '2rem' }}>Back to Dashboard</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0f1e', padding: '2rem' }}>
      <header className="glass" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.2rem' }}>{exam?.title || 'Examination'}</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{exam?.subject} • {user.name}</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: timeLeft < 300 ? '#ef4444' : '#10b981' }}>
            <Clock size={20} />
            <span style={{ fontSize: '1.25rem', fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{formatTime(timeLeft)}</span>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button onClick={() => setShowReview(true)} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Eye size={18} /> Review
            </button>
            <button onClick={handleFinalSubmit} className="btn-primary" style={{ padding: '10px 24px' }}>Submit Exam</button>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem' }}>
        <main>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="glass card"
              style={{ padding: '3rem', minHeight: '400px' }}
            >
              <div style={{ marginBottom: '2rem' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 600, textTransform: 'uppercase' }}>Question {currentQuestion + 1} of {examQuestions.length}</span>
                <h3 style={{ fontSize: '1.5rem', marginTop: '0.5rem', lineHeight: 1.4 }}>{examQuestions[currentQuestion]?.text}</h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {examQuestions[currentQuestion]?.options.map((option, i) => (
                  <button
                    key={i}
                    onClick={() => handleOptionSelect(option)}
                    style={{
                      padding: '1.25rem',
                      textAlign: 'left',
                      background: answers[examQuestions[currentQuestion].id] === option ? 'rgba(99, 102, 241, 0.15)' : 'rgba(255,255,255,0.03)',
                      border: `1px solid ${answers[examQuestions[currentQuestion].id] === option ? 'var(--primary)' : 'var(--glass-border)'}`,
                      borderRadius: '12px',
                      color: 'white',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      fontSize: '1rem'
                    }}
                  >
                    <span style={{ display: 'inline-block', width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', textAlign: 'center', marginRight: '1rem', fontSize: '0.8rem', lineHeight: '24px' }}>
                      {String.fromCharCode(65 + i)}
                    </span>
                    {option}
                  </button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
            <button 
              onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
              disabled={currentQuestion === 0}
              className="btn-secondary"
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: currentQuestion === 0 ? 0.5 : 1 }}
            >
              <ChevronLeft size={20} /> Previous
            </button>
            <button 
              onClick={() => setCurrentQuestion(prev => Math.min(examQuestions.length - 1, prev + 1))}
              disabled={currentQuestion === examQuestions.length - 1}
              className="btn-secondary"
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: currentQuestion === examQuestions.length - 1 ? 0.5 : 1 }}
            >
              Next <ChevronRight size={20} />
            </button>
          </div>
        </main>

        <aside>
          <div className="glass" style={{ padding: '1.5rem', borderRadius: '20px' }}>
            <h4 style={{ marginBottom: '1.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Question Palette</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem' }}>
              {examQuestions.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentQuestion(i)}
                  style={{
                    width: '100%',
                    aspectRatio: '1',
                    borderRadius: '8px',
                    border: '1px solid var(--glass-border)',
                    background: currentQuestion === i ? 'var(--primary)' : (answers[examQuestions[i].id] ? 'rgba(16, 185, 129, 0.2)' : 'transparent'),
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '0.85rem'
                  }}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(239, 68, 68, 0.05)', borderRadius: '12px', border: '1px solid rgba(239, 68, 68, 0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ef4444', marginBottom: '0.5rem' }}>
                <AlertTriangle size={16} />
                <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>Anti-Cheat Active</span>
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                Switching tabs or exiting full screen will result in automatic submission.
              </p>
            </div>
          </div>
        </aside>
      </div>

      <AnimatePresence>
        {showReview && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass card" style={{ width: '100%', maxWidth: '600px', padding: '2rem' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Review Answers</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
                {examQuestions.map((q, i) => (
                  <div key={i} style={{ textAlign: 'center' }}>
                    <div style={{ 
                      width: '40px', height: '40px', borderRadius: '8px', margin: '0 auto 0.5rem',
                      background: answers[q.id] ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.1)',
                      color: answers[q.id] ? '#10b981' : '#ef4444',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700
                    }}>
                      {i + 1}
                    </div>
                    <span style={{ fontSize: '0.75rem' }}>{answers[q.id] ? 'Answered' : 'Skipped'}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button onClick={() => setShowReview(false)} className="btn-secondary" style={{ flex: 1 }}>Back to Exam</button>
                <button onClick={handleFinalSubmit} className="btn-primary" style={{ flex: 1 }}>Submit Now</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExamRoom;
