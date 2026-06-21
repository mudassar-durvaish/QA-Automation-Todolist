import React, { useState } from 'react';

export default function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agree, setAgree] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-sm">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full">
          <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            data-testid="login-email-input"
            className="w-full border border-gray-200 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>
        <div className="w-full">
          <label className="block text-xs font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            data-testid="login-password-input"
            className="w-full border border-gray-200 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <div className="flex items-center">
        <input
          id="login-agree"
          type="checkbox"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
          data-testid="login-agree-checkbox"
          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          required
        />
        <label htmlFor="login-agree" className="ml-2 block text-xs text-gray-600">
          I agree to the terms
        </label>
      </div>

      <button
        type="submit"
        data-testid="login-submit-btn"
        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-md text-sm transition-colors"
      >
        Sign in
      </button>
    </form>
  );
}
