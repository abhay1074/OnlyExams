import React, { createContext, useContext, useState, useEffect } from 'react';

const ExamContext = createContext();

export const useExams = () => useContext(ExamContext);

export const ExamProvider = ({ children }) => {
  const [exams, setExams] = useState([
    { id: '101', title: 'Mathematics Mid-Term', subject: 'Calculus II', date: '2026-10-10', time: '10:00 AM', duration: 60, status: 'Upcoming', candidates: 0, questionIds: ['q1', 'q2'] },
    { id: '102', title: 'Computer Science Quiz', subject: 'Data Structures', date: '2026-10-12', time: '02:00 PM', duration: 30, status: 'Scheduled', candidates: 0, questionIds: ['q3'] },
  ]);

  const [questionBank, setQuestionBank] = useState([
    { id: 'q1', text: "What is the derivative of sin(x)?", options: ["cos(x)", "-cos(x)", "tan(x)", "sec(x)"], correct: "cos(x)", type: "mcq", subject: 'Calculus II' },
    { id: 'q2', text: "What is the integral of 1/x dx?", options: ["x", "e^x", "ln|x|", "x^2/2"], correct: "ln|x|", type: "mcq", subject: 'Calculus II' },
    { id: 'q3', text: "What is the time complexity of searching in a balanced BST?", options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"], correct: "O(log n)", type: "mcq", subject: 'Data Structures' },
    { id: 'q4', text: "Which protocol is used for secure web traffic?", options: ["HTTP", "FTP", "HTTPS", "SMTP"], correct: "HTTPS", type: "mcq", subject: 'Computer Science' }
  ]);

  const [results, setResults] = useState([]);

  const addExam = (exam) => {
    setExams(prev => [...prev, { ...exam, id: Date.now().toString(), status: 'Scheduled', candidates: 0 }]);
  };

  const updateQuestionBank = (newQuestion) => {
    setQuestionBank(prev => {
      const index = prev.findIndex(q => q.id === newQuestion.id);
      if (index > -1) {
        const updated = [...prev];
        updated[index] = newQuestion;
        return updated;
      }
      return [...prev, { ...newQuestion, id: 'q' + Date.now() }];
    });
  };

  const deleteQuestion = (id) => {
    setQuestionBank(prev => prev.filter(q => q.id !== id));
  };

  const submitExam = (result) => {
    setResults(prev => [...prev, { ...result, id: 'res' + Date.now(), date: new Date().toLocaleDateString() }]);
  };

  const getQuestionsForExam = (examId) => {
    const exam = exams.find(e => e.id === examId);
    if (!exam) return [];
    return questionBank.filter(q => exam.questionIds?.includes(q.id));
  };

  return (
    <ExamContext.Provider value={{ 
      exams, 
      questionBank, 
      results, 
      addExam, 
      submitExam, 
      updateQuestionBank, 
      deleteQuestion,
      getQuestionsForExam 
    }}>
      {children}
    </ExamContext.Provider>
  );
};
