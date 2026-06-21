import React, { useState } from 'react';

export default function RegisterForm({ onRegister }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    accountType: ''
  });
  const [agree, setAgree] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-sm">
      <div className="flex gap-4">
        <div className="w-1/2">
          <label className="block text-xs font-medium text-gray-700 mb-1">First name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            data-testid="register-firstname-input"
            className="w-full border border-gray-200 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>
        <div className="w-1/2">
          <label className="block text-xs font-medium text-gray-700 mb-1">Last name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            data-testid="register-lastname-input"
            className="w-full border border-gray-200 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <div className="flex gap-4">
        <div className="w-1/2">
          <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            data-testid="register-email-input"
            className="w-full border border-gray-200 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>
        <div className="w-1/2">
          <label className="block text-xs font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            data-testid="register-password-input"
            className="w-full border border-gray-200 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Account type</label>
        <select
          name="accountType"
          value={formData.accountType}
          onChange={handleChange}
          data-testid="register-account-type-select"
          className="w-full border border-gray-200 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
          required
        >
          <option value="" disabled>Select one</option>
          <option value="personal">Personal</option>
          <option value="business">Business</option>
        </select>
      </div>

      <div className="flex items-center mt-2">
        <input
          id="register-agree"
          type="checkbox"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
          data-testid="register-agree-checkbox"
          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          required
        />
        <label htmlFor="register-agree" className="ml-2 block text-xs text-gray-600">
          I agree to the terms
        </label>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          data-testid="register-submit-btn"
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-md text-sm transition-colors"
        >
          Sign up
        </button>
      </div>
    </form>
  );
}
