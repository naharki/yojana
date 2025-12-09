'use client';

import Sidebar from '@/components/Sidebar';

export default function DashboardLayout({ children }) {
  return (
    <div className="d-flex" style={{ height: '100vh', overflow: 'hidden' }}>
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content Area */}
      <main className="flex-grow-1 d-flex flex-column" style={{ backgroundColor: '#f8f9fa', overflow: 'auto' }}>
        {children}
      </main>
    </div>
  );
}
