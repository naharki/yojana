'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Building2, Users, Settings, BarChart3, FileText } from 'lucide-react';

export default function Sidebar() {
  const [expandedMenus, setExpandedMenus] = useState({ basicSetup: true, committeeSetup: true });

  const menuItems = [
    {
      id: 'basicSetup',
      label: 'Basic Setup',
      icon: Settings,
      subItems: [
        { id: 'office', label: 'Office Information', href: '/dashboard/office' },
        { id: 'departments', label: 'Departments', href: '/dashboard/departments' },
        { id: 'designations', label: 'Designations', href: '/dashboard/designations' },
      ],
    },
    {
      id: 'committeeSetup',
      label: 'Committee Setup',
      icon: Users,
      subItems: [
        { id: 'committeetype', label: 'Committee Type', href: '/dashboard/committee/type' },
        { id: 'committee', label: 'Committee', href: '/dashboard/committee/list' },
      ],
    },
    {
      id: 'planning',
      label: 'Planning',
      icon: FileText,
      subItems: [
        { id: 'schemes', label: 'Schemes', href: '/dashboard/planning/schemes' },
        { id: 'projects', label: 'Projects', href: '/dashboard/planning/projects' },
        { id: 'activities', label: 'Activities', href: '/dashboard/planning/activities' },
      ],
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: BarChart3,
      subItems: [
        { id: 'planning-report', label: 'Planning Report', href: '/dashboard/reports/planning' },
        { id: 'committee-report', label: 'Committee Report', href: '/dashboard/reports/committee' },
        { id: 'budget-report', label: 'Budget Report', href: '/dashboard/reports/budget' },
      ],
    },
    {
      id: 'administration',
      label: 'Administration',
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

  return (
    <aside className="bg-white shadow-sm" style={{ width: '280px', height: '100vh', overflowY: 'auto', borderRight: '2px solid #e0e0e0' }}>
      {/* Logo Section */}
      <div className="p-4 border-bottom sticky-top bg-white">
        <h1 className="h4 fw-bold text-primary mb-0">📋 Yojana</h1>
        <small className="text-secondary">Planning Management</small>
      </div>

      {/* Navigation Menu */}
      <nav className="mt-3 px-2">
        {menuItems.map((item) => (
          <div key={item.id} className="mb-1">
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
                <item.icon size={20} className="text-primary" />
                <span className="fw-500">{item.label}</span>
              </span>
              <ChevronDown
                size={18}
                className="text-secondary"
                style={{
                  transform: expandedMenus[item.id] ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s',
                }}
              />
            </button>

            {/* Submenu Items */}
            {expandedMenus[item.id] && (
              <div className="ps-2" style={{ borderLeft: '3px solid #0d6efd' }}>
                {item.subItems.map((subItem) => (
                  <Link
                    key={subItem.id}
                    href={subItem.href}
                    className="d-block px-3 py-2 text-secondary text-decoration-none small rounded"
                    style={{
                      fontSize: '0.9rem',
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
        ))}
      </nav>

      {/* Footer Section */}
      <div className="position-fixed bottom-0 start-0 w-100 p-3 border-top bg-light" style={{ width: '280px' }}>
        <small className="text-secondary d-block">Version 1.0</small>
        <small className="text-muted">© 2025 Yojana</small>
      </div>
    </aside>
  );
}
