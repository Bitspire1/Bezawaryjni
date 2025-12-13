'use client';

import { useEffect } from 'react';

export default function AdminPage() {
  useEffect(() => {
    // Redirect to TinaCMS admin with hash routing to home page
    window.location.href = '/admin/index.html#/~/admin/home';
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p>Przekierowywanie do panelu administracyjnego...</p>
      </div>
    </div>
  );
}
