import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout';
import LoginForm from '../components/auth/LoginForm';

export default function LoginPage() {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleLogin = async (credentials) => {
    try {
      setError('');
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      const data = await res.json();
      
      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/dashboard');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Network error. Is the backend running?');
    }
  };

  return (
    <AuthLayout
      title="Login to your account"
      subtitle="Login to your account"
      switchText="Don't have an account?"
      switchLink="/register"
      switchLinkText="Sign up here"
    >
      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
      <LoginForm onLogin={handleLogin} />
    </AuthLayout>
  );
}
