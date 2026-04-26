import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Context
import { AuthProvider, useAuth } from './context/AuthContext';
import { ExamProvider } from './context/ExamContext';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ExamRoom from './pages/ExamRoom';
import Landing from './pages/Landing';
import AdminQuestionBank from './pages/AdminQuestionBank';
import AdminResults from './pages/AdminResults';

// Components
import Navbar from './components/Navbar';

const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useAuth();
  
  if (loading) return null;
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/" />;
  
  return children;
};

function AppContent() {
  const { user, logout } = useAuth();

  return (
    <div className="app-container">
      <Navbar user={user} logout={logout} />
      <main className="content">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route 
            path="/student/*" 
            element={
              <ProtectedRoute role="student">
                <StudentDashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/admin/questions" 
            element={
              <ProtectedRoute role="admin">
                <AdminQuestionBank />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/admin/results/:id" 
            element={
              <ProtectedRoute role="admin">
                <AdminResults />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/exam/:id" 
            element={
              <ProtectedRoute>
                <ExamRoom />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>
      <ToastContainer position="bottom-right" theme="dark" />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <ExamProvider>
        <Router>
          <AppContent />
        </Router>
      </ExamProvider>
    </AuthProvider>
  );
}

export default App;
