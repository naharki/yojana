'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Building2, Users, Settings, BarChart3, FileText } from 'lucide-react';

export default function Sidebar({ collapsed = false }) {
  const [expandedMenus, setExpandedMenus] = useState({ basicSetup: true, committeeSetup: true });

  const menuItems = [
    {
      id: 'basicSetup',
      label: 'Office Setup',
      icon: Settings,
      subItems: [
        { id: 'office', label: 'Office Information', href: '/dashboard/basic-setup/office' },
        { id: 'departments', label: 'Departments', href: '/dashboard/basic-setup/departments' },
        { id: 'designations', label: 'Designations', href: '/dashboard/basic-setup/designations' },
        { id: 'fiscalyear', label: 'Fiscal Year', href: '/dashboard/basic-setup/fiscal-year' },
        { id: 'ward', label: 'Wards', href: '/dashboard/basic-setup/ward' },
      ],
    },
    {
      id: 'dartaChalani',
      label: 'दर्ता समुह',
      icon: FileText,
      subItems: [
        { id: 'darta', label: 'दर्ता', href: '/darta-chalani/dashboard/darta' },
        { id: 'chalani', label: 'चलानी', href: '/darta-chalani/dashboard/chalani' },
      ],
    },
    {
      id: 'designation',
      label: 'पद',
      icon: FileText,
      subItems: [
        { id: 'designation', label: 'पद', href: '/darta-chalani/dashboard/designation' }
        ],
    },
    {
      id: 'reports',
      label: 'युजर ग्रुप सेटअप',
      icon: BarChart3,
      subItems: [
        { id: 'planning-report', label: 'Planning Report', href: '/dashboard/reports/planning' },
        { id: 'committee-report', label: 'Committee Report', href: '/dashboard/reports/committee' },
        { id: 'budget-report', label: 'Budget Report', href: '/dashboard/reports/budget' },
      ],
    },
    {
      id: 'administratio',
      label: 'प्रयोगकर्ता ब्यबस्थापन',
      icon: Settings,
      subItems: [
        { id: 'users', label: 'Users', href: '/dashboard/admin/users' },
        { id: 'roles', label: 'Roles & Permissions', href: '/dashboard/admin/roles' },
        { id: 'audit', label: 'Audit Logs', href: '/dashboard/admin/audit' },
      ],
    },
    {
      id: 'administrati',
      label: 'दर्ता/चलानी',
      icon: Settings,
      subItems: [
               { id: 'audit', label: 'Audit Logs', href: '/dashboard/admin/audit' },
      ],
    },
    {
      id: 'administrat',
      label: 'टिप्पणी/आदेश',
      icon: Settings,
      subItems: [
        { id: 'users', label: 'Users', href: '/dashboard/admin/users' },
        { id: 'roles', label: 'Roles & Permissions', href: '/dashboard/admin/roles' },
        { id: 'audit', label: 'Audit Logs', href: '/dashboard/admin/audit' },
      ],
    },{
      id: 'administra',
      label: 'व्यक्ति वा कार्यालयको विवरण',
      icon: Settings,
      subItems: [
        { id: 'users', label: 'Users', href: '/dashboard/admin/users' },
        { id: 'roles', label: 'Roles & Permissions', href: '/dashboard/admin/roles' },
        { id: 'audit', label: 'Audit Logs', href: '/dashboard/admin/audit' },
      ],
    },
    {
      id: 'administr',
      label: 'सुची दर्ता',
      icon: Settings,
      subItems: [
        { id: 'users', label: 'Users', href: '/dashboard/admin/users' },
        { id: 'roles', label: 'Roles & Permissions', href: '/dashboard/admin/roles' },
        { id: 'audit', label: 'Audit Logs', href: '/dashboard/admin/audit' },
      ],
    },
    {
      id: 'administ',
      label: 'प्रयोगकर्ता ब्यबस्थापन',
      icon: Settings,
      subItems: [
        { id: 'users', label: 'Users', href: '/dashboard/admin/users' },
        { id: 'roles', label: 'Roles & Permissions', href: '/dashboard/admin/roles' },
        { id: 'audit', label: 'Audit Logs', href: '/dashboard/admin/audit' },
      ],
    },
    {
      id: 'adminis',
      label: 'ईन्धन विवरण',
      icon: Settings,
      subItems: [
        { id: 'users', label: 'Users', href: '/dashboard/admin/users' },
        { id: 'roles', label: 'Roles & Permissions', href: '/dashboard/admin/roles' },
        { id: 'audit', label: 'Audit Logs', href: '/dashboard/admin/audit' },
      ],
    },
    {
      id: 'admini',
      label: 'ईन्धन माग',
      icon: Settings,
      subItems: [
        { id: 'users', label: 'Users', href: '/dashboard/admin/users' },
        { id: 'roles', label: 'Roles & Permissions', href: '/dashboard/admin/roles' },
        { id: 'audit', label: 'Audit Logs', href: '/dashboard/admin/audit' },
      ],
    },
  ];

  const toggleMenu = (menuId) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menuId]: !prev[menuId],
    }));
  };

  const sidebarWidth = collapsed ? '72px' : '220px';

  return (
    <aside className="bg-white shadow-sm" style={{ width: sidebarWidth, height: '100vh', overflowY: 'auto', borderRight: '2px solid #e0e0e0', transition: 'width 0.18s' }}>
      {/* Logo / compact */}
      <div className={`p-3 border-bottom sticky-top bg-white d-flex align-items-center justify-content-${collapsed ? 'center' : 'start'}`}>
        {collapsed ? (
          <div style={{ width:40, height:40, borderRadius:8, background: 'linear-gradient(135deg,#6f8cff,#3aa0ff)', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700 }}>YJ</div>
        ) : (
          <div>
            <h1 className="h5 fw-bold text-primary mb-0">📋 Yojana</h1>
            <small className="text-secondary">Planning Management</small>
          </div>
        )}
      </div>

      {/* Navigation Menu */}
      <nav className={`mt-3 px-2 ${collapsed ? 'd-flex flex-column align-items-center' : ''}`}>
        {menuItems.map((item) => (
          <div key={item.id} className={`${collapsed ? 'mb-2' : 'mb-1'}`} style={{ width: '100%' }}>
            {collapsed ? (
              <div className="d-flex justify-content-center">
                <button title={item.label} onClick={() => toggleMenu(item.id)} className="btn btn-ghost p-2 mb-2 d-flex align-items-center justify-content-center" style={{ borderRadius: 8 }}>
                  <item.icon size={18} className="text-primary" />
                </button>
              </div>
            ) : (
              <div>
                <button
                  onClick={() => toggleMenu(item.id)}
                  className="w-100 btn btn-link text-start d-flex justify-content-between align-items-center px-3 py-2 text-dark fw-500"
                  style={{
                    textDecoration: 'none',
                    borderRadius: '6px',
                    backgroundColor: expandedMenus[item.id] ? '#e7f1ff' : 'transparent',
                    transition: 'all 0.2s',
                  }}
                >
                  <span className="d-flex align-items-center gap-2">
                    <item.icon size={18} className="text-primary" />
                    <span className="fw-500" style={{ fontSize: '0.95rem' }}>{item.label}</span>
                  </span>
                  <ChevronDown
                    size={16}
                    className="text-secondary"
                    style={{
                      transform: expandedMenus[item.id] ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s',
                    }}
                  />
                </button>

                {expandedMenus[item.id] && (
                  <div className="ps-2" style={{ borderLeft: '3px solid #0d6efd' }}>
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.id}
                        href={subItem.href}
                        className="d-block px-3 py-2 text-secondary text-decoration-none small rounded"
                        style={{
                          fontSize: '0.85rem',
                          marginLeft: '1rem',
                          transition: 'all 0.2s',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#e7f1ff';
                          e.currentTarget.style.color = '#0d6efd';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.color = '#6c757d';
                        }}
                      >
                        ▸ {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Footer Section */}
      <div className="position-fixed bottom-0 start-0 p-3 border-top bg-light" style={{ width: collapsed ? '80px' : '280px' }}>
        {collapsed ? (
          <div className="text-center small text-secondary">v1.0</div>
        ) : (
          <>
            <small className="text-secondary d-block">Version 1.0</small>
            <small className="text-muted">© 2025 Yojana</small>
          </>
        )}
      </div>
    </aside>
  );
}
