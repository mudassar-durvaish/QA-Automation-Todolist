import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout';
import RegisterForm from '../components/auth/RegisterForm';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleRegister = async (formData) => {
    try {
      setError('');
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      
      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/dashboard');
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Network error. Is the backend running?');
    }
  };

  return (
    <AuthLayout
      title="Create account"
      subtitle="Set up your profile to begin"
      switchText="Already have an account?"
      switchLink="/login"
      switchLinkText="Login here"
    >
      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
      <RegisterForm onRegister={handleRegister} />
    </AuthLayout>
  );
}
