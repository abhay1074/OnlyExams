import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Trash2, Edit2, X, CheckCircle } from 'lucide-react';
import { useExams } from '../context/ExamContext';
import { toast } from 'react-toastify';

const AdminQuestionBank = () => {
  const { questionBank, updateQuestionBank, deleteQuestion } = useExams();
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  
  const [formData, setFormData] = useState({
    text: '',
    options: ['', '', '', ''],
    correct: '',
    subject: '',
    type: 'mcq'
  });

  const filteredQuestions = questionBank.filter(q => 
    q.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (q) => {
    setEditingQuestion(q);
    setFormData({ ...q });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.correct || !formData.options.includes(formData.correct)) {
      toast.error('Correct answer must match one of the options!');
      return;
    }
    updateQuestionBank({ ...formData, id: editingQuestion?.id });
    setShowModal(false);
    setEditingQuestion(null);
    setFormData({ text: '', options: ['', '', '', ''], correct: '', subject: '', type: 'mcq' });
    toast.success(editingQuestion ? 'Question updated!' : 'Question added to bank!');
  };

  return (
    <div style={{ padding: '8rem 2rem 4rem', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 700 }}>Question <span className="gradient-text">Bank</span></h1>
          <p style={{ color: 'var(--text-muted)' }}>Manage your institution's central pool of examination questions.</p>
        </div>
        <button className="btn-primary" onClick={() => setShowModal(true)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Plus size={20} /> Add New Question
        </button>
      </header>

      <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={20} />
          <input 
            type="text" 
            className="input-field" 
            placeholder="Search questions by text or subject..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ paddingLeft: '3rem' }}
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
        {filteredQuestions.map((q) => (
          <motion.div 
            key={q.id} 
            className="glass card" 
            style={{ padding: '1.5rem', position: 'relative' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.8rem', padding: '4px 12px', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)', borderRadius: '20px', fontWeight: 600 }}>
                {q.subject}
              </span>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => handleEdit(q)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><Edit2 size={18} /></button>
                <button onClick={() => deleteQuestion(q.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={18} /></button>
              </div>
            </div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', lineHeight: 1.4 }}>{q.text}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              {q.options.map((opt, i) => (
                <div key={i} style={{ 
                  fontSize: '0.9rem', 
                  padding: '10px 14px', 
                  background: opt === q.correct ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${opt === q.correct ? '#10b981' : 'var(--glass-border)'}`,
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  {opt === q.correct && <CheckCircle size={14} color="#10b981" />}
                  {opt}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {showModal && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.9 }}
              className="glass card" 
              style={{ width: '100%', maxWidth: '600px', padding: '2.5rem', maxHeight: '90vh', overflowY: 'auto' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.5rem' }}>{editingQuestion ? 'Edit Question' : 'Add Question'}</h3>
                <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={24} /></button>
              </div>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem', display: 'block' }}>Subject</label>
                  <input 
                    className="input-field" 
                    placeholder="e.g. Mathematics" 
                    value={formData.subject} 
                    onChange={(e) => setFormData({...formData, subject: e.target.value})} 
                    required 
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem', display: 'block' }}>Question Text</label>
                  <textarea 
                    className="input-field" 
                    style={{ minHeight: '100px', resize: 'vertical' }}
                    placeholder="Enter the question..." 
                    value={formData.text} 
                    onChange={(e) => setFormData({...formData, text: e.target.value})} 
                    required 
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem', display: 'block' }}>Options</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    {formData.options.map((opt, i) => (
                      <input 
                        key={i}
                        className="input-field" 
                        placeholder={`Option ${i+1}`}
                        value={opt}
                        onChange={(e) => {
                          const newOpts = [...formData.options];
                          newOpts[i] = e.target.value;
                          setFormData({...formData, options: newOpts});
                        }}
                        required
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem', display: 'block' }}>Correct Answer</label>
                  <select 
                    className="input-field" 
                    value={formData.correct}
                    onChange={(e) => setFormData({...formData, correct: e.target.value})}
                    required
                    style={{ appearance: 'none' }}
                  >
                    <option value="" disabled>Select the correct option</option>
                    {formData.options.filter(o => o !== '').map((opt, i) => (
                      <option key={i} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
                <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }}>
                  {editingQuestion ? 'Update Question' : 'Save to Bank'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminQuestionBank;
