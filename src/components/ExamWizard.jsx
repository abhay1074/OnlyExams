import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft, Check, Search, PlusCircle, MinusCircle } from 'lucide-react';
import { useExams } from '../context/ExamContext';
import { toast } from 'react-toastify';

const ExamWizard = ({ onClose }) => {
  const { addExam, questionBank } = useExams();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    date: '',
    time: '',
    duration: 60,
    questionIds: []
  });

  const [searchTerm, setSearchTerm] = useState('');

  const subjects = [...new Set(questionBank.map(q => q.subject))];
  
  const filteredQuestions = questionBank.filter(q => 
    (formData.subject ? q.subject === formData.subject : true) &&
    q.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleQuestion = (id) => {
    setFormData(prev => ({
      ...prev,
      questionIds: prev.questionIds.includes(id) 
        ? prev.questionIds.filter(qid => qid !== id)
        : [...prev.questionIds, id]
    }));
  };

  const handleFinish = () => {
    if (formData.questionIds.length === 0) {
      toast.error('Please select at least one question!');
      return;
    }
    addExam(formData);
    toast.success('Exam created successfully!');
    onClose();
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        exit={{ opacity: 0, y: 20 }}
        className="glass card" 
        style={{ width: '100%', maxWidth: '800px', padding: '0', overflow: 'hidden', height: '80vh', display: 'flex', flexDirection: 'column' }}
      >
        <header style={{ padding: '1.5rem 2.5rem', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem' }}>Create Exam Wizard</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Step {step} of 3: {step === 1 ? 'Exam Details' : step === 2 ? 'Select Questions' : 'Review & Schedule'}</p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={24} /></button>
        </header>

        <div style={{ flex: 1, overflowY: 'auto', padding: '2.5rem' }}>
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: -20 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
              >
                <div>
                  <label className="label">Exam Title</label>
                  <input className="input-field" placeholder="e.g. Mid-Term 2026" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
                </div>
                <div>
                  <label className="label">Subject</label>
                  <select className="input-field" value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} required>
                    <option value="">Select a Subject</option>
                    {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label className="label">Date</label>
                    <input type="date" className="input-field" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} required />
                  </div>
                  <div>
                    <label className="label">Time</label>
                    <input type="time" className="input-field" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} required />
                  </div>
                </div>
                <div>
                  <label className="label">Duration (Minutes)</label>
                  <input type="number" className="input-field" value={formData.duration} onChange={e => setFormData({...formData, duration: parseInt(e.target.value)})} required />
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: -20 }}
              >
                <div style={{ marginBottom: '1.5rem', position: 'relative' }}>
                  <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={18} />
                  <input 
                    type="text" 
                    className="input-field" 
                    placeholder="Search from bank..." 
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    style={{ paddingLeft: '3rem' }}
                  />
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Selected: {formData.questionIds.length} questions</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {filteredQuestions.map(q => (
                    <div key={q.id} className="glass" style={{ padding: '1rem', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: '0.95rem' }}>{q.text}</p>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{q.subject}</p>
                      </div>
                      <button 
                        onClick={() => toggleQuestion(q.id)}
                        style={{ background: 'none', border: 'none', color: formData.questionIds.includes(q.id) ? '#ef4444' : '#10b981', cursor: 'pointer' }}
                      >
                        {formData.questionIds.includes(q.id) ? <MinusCircle size={24} /> : <PlusCircle size={24} />}
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: -20 }}
                style={{ textAlign: 'center' }}
              >
                <div style={{ width: '80px', height: '80px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
                  <Check size={40} />
                </div>
                <h4 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Final Review</h4>
                <div className="glass" style={{ padding: '1.5rem', borderRadius: '16px', textAlign: 'left', marginBottom: '2rem' }}>
                  <p><strong>Title:</strong> {formData.title}</p>
                  <p><strong>Subject:</strong> {formData.subject}</p>
                  <p><strong>Scheduled:</strong> {formData.date} at {formData.time}</p>
                  <p><strong>Duration:</strong> {formData.duration} minutes</p>
                  <p><strong>Questions:</strong> {formData.questionIds.length} selected</p>
                </div>
                <p style={{ color: 'var(--text-muted)' }}>Click 'Finalize' to schedule the exam for all assigned candidates.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <footer style={{ padding: '1.5rem 2.5rem', borderTop: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between' }}>
          <button 
            className="btn-secondary" 
            onClick={() => setStep(s => Math.max(1, s - 1))}
            disabled={step === 1}
            style={{ opacity: step === 1 ? 0.5 : 1 }}
          >
            <ChevronLeft size={20} /> Back
          </button>
          
          {step < 3 ? (
            <button className="btn-primary" onClick={() => setStep(s => s + 1)}>
              Continue <ChevronRight size={20} />
            </button>
          ) : (
            <button className="btn-primary" onClick={handleFinish}>
              Finalize Exam
            </button>
          )}
        </footer>
      </motion.div>
      <style>{`
        .label { font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.5rem; display: block; }
      `}</style>
    </div>
  );
};

export default ExamWizard;
