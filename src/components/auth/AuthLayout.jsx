import React from 'react';

export default function AuthLayout({ title, subtitle, switchText, switchLink, switchLinkText, children }) {
  return (
    <div className="min-h-screen bg-[#f4f5f7] flex flex-col justify-center items-center p-4">

      {/* Main Card */}
      <div className="bg-white w-full max-w-5xl rounded-lg shadow-sm flex flex-col md:flex-row overflow-hidden min-h-[500px]">
        
        {/* Left Info Column */}
        <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center border-r border-gray-100">
          <span className="text-xs font-semibold text-gray-800 uppercase tracking-widest mb-2">
            {title === 'Create account' ? 'Register' : 'Login'}
          </span>
          <h1 className="text-4xl font-extrabold text-black mb-2 tracking-tight">{title}</h1>
          <p className="text-sm text-gray-600 mb-10">{subtitle}</p>

          {/* Contact Details */}
          <div className="space-y-4 text-sm text-gray-700">
            <div className="flex items-center gap-3">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              <a href="mailto:mudassardurvaish@gmail.com" className="underline hover:text-black">mudassardurvaish@gmail.com</a>
            </div>
            <div className="flex items-center gap-3">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
              <span>+923475702720</span>
            </div>
            <div className="flex items-center gap-3">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <span>UET Taxila</span>
            </div>
          </div>

          {/* Switch Auth Mode Link */}
          <div className="mt-10 text-sm text-gray-500">
            {switchText}{' '}
            <a href={switchLink} data-testid="auth-switch-link" className="text-blue-600 hover:underline">
              {switchLinkText}
            </a>
          </div>
        </div>

        {/* Right Form Column */}
        <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center">
          {children}
        </div>

      </div>
    </div>
  );
}
