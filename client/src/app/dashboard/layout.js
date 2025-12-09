'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '@/components/Sidebar';
import { LogOut } from 'lucide-react';
import { Menu } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://jsonplaceholder.typicode.com';

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const [office, setOffice] = useState({ name: process.env.NEXT_PUBLIC_OFFICE_NAME || 'Example Office' });

  useEffect(() => {
    // fetch a dummy office/user from the dummy API and map to an office name
    (async () => {
      try {
        const resp = await axios.get(API_URL + '/users/1');
        const d = resp.data || {};
        setOffice({ name: (d.company && d.company.name) ? d.company.name : d.name || office.name, user: d });
      } catch (e) {
        // ignore – keep fallback
      }
    })();
  }, []);

  const handleLogout = () => {
    try { localStorage.removeItem('token'); localStorage.removeItem('user'); } catch (e) {}
    router.push('/');
  };

  // derive initials for avatar
  const initials = (office.name || '').split(' ').map(s=>s[0]).slice(0,2).join('').toUpperCase();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => setSidebarCollapsed(s => !s);

  return (
    <div className="d-flex" style={{ height: '100vh', overflow: 'hidden' }}>
      {/* Sidebar */}
      <Sidebar collapsed={sidebarCollapsed} />
      
      {/* Main Content Area */}
      <main className="flex-grow-1 d-flex flex-column" style={{ backgroundColor: '#f6f7fb', overflow: 'auto' }}>
        {/* Stylish sticky header */}
        <header style={{ position: 'sticky', top: 0, zIndex: 3000 }}>
          <div className="container-fluid px-3" style={{ background: 'linear-gradient(90deg, #ffffff 0%, #f8f9ff 100%)', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
            <div className="d-flex align-items-center justify-content-between" style={{ height: 64 }}>
              <div className="d-flex align-items-center">
                <button className="btn btn-ghost me-2 d-flex align-items-center justify-content-center" onClick={toggleSidebar} title="Toggle sidebar" style={{ width:42, height:42, borderRadius:8 }}>
                  <Menu size={22} />
                </button>
                <div style={{ width:44, height:44, borderRadius: 10, background: 'linear-gradient(135deg,#6f8cff,#3aa0ff)', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, marginRight:12, boxShadow: '0 2px 6px rgba(51,65,85,0.08)' }}>{initials}</div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#1f2937' }}>{office.name}</div>
                  <div className="text-muted small">Dashboard</div>
                </div>
              </div>

              <div className="d-flex align-items-center">
                <div className="me-3 text-muted small d-none d-md-block">Signed in</div>
                <button className="btn btn-sm btn-outline-secondary d-flex align-items-center" onClick={handleLogout} title="Logout">
                  <LogOut size={16} className="me-2" />
                  <span className="d-none d-md-inline">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <div style={{ padding: 20 }}>
          {children}
        </div>
      </main>
    </div>
  );
}
