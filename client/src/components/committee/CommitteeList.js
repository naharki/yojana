'use client';

import { useState } from 'react';
import { Edit2, Trash2, MoreHorizontal, Users, FileText, CreditCard, Lock } from 'lucide-react';

export default function CommitteeList({ items, onEdit, onDelete, onAction }) {
  const [openId, setOpenId] = useState(null);
  console.log('CommitteeList items:', items);

  if (!items || items.length === 0) {
    return (
      <div className="alert alert-info">
        <p className="mb-0">No committees found. Add one to get started.</p>
      </div>
    );
  }

  return (
    <div className="table-responsive" style={{ height: "57vh" }}>
      <table className="table table-hover table-striped">
        <thead className="table-light">
          <tr>
            <th style={{ width: '5%' }}>क्र.स</th>
            <th style={{ width: '15%' }}>दर्ता नं.</th>
            <th style={{ width: '25%' }}>समितिको नाम</th>
            <th style={{ width: '15%' }}>समितिको प्रकार</th>
            <th style={{ width: '20%' }}>ठेगाना</th>
            <th style={{ width: '10%' }}>गठन मिति</th>
            <th style={{ width: '10%' }}>कार्य</th>
          </tr>
        </thead>
        <tbody>
          {items.map((it, index) => (
            <tr key={it.id} style={{ position: 'relative' }}>
              <td><strong>{index + 1}</strong></td>
              <td>{it.register_number}</td>
              <td>{it.name}</td>
              <td>{it.committeeType?.name}</td>
              <td>{it.address}</td>
              <td>{it.created_date}</td>
              <td>
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <button className="btn btn-sm btn-outline-secondary" onClick={() => setOpenId(openId === it.id ? null : it.id)} title="Actions">
                    <MoreHorizontal size={16} />
                  </button>

                  {openId === it.id && (
                    <div className="card shadow-sm p-2" style={{ position: 'absolute', right: '110%', top: 0, minWidth: 200, zIndex: 2000 }}>
                      <button className="btn btn-sm btn-light d-flex align-items-center w-100 mb-1" onClick={() => { setOpenId(null); onAction('members', it); }}>
                        <Users size={14} className="me-2"/> Members
                      </button>
                      <button className="btn btn-sm btn-light d-flex align-items-center w-100 mb-1" onClick={() => { setOpenId(null); onAction('certificate', it); }}>
                        <FileText size={14} className="me-2"/> Certificate
                      </button>
                      <button className="btn btn-sm btn-light d-flex align-items-center w-100 mb-1" onClick={() => { setOpenId(null); onAction('account_open', it); }}>
                        <CreditCard size={14} className="me-2"/> Account Open
                      </button>
                      <button className="btn btn-sm btn-light d-flex align-items-center w-100 mb-1" onClick={() => { setOpenId(null); onAction('account_closed', it); }}>
                        <Lock size={14} className="me-2"/> Account Closed
                      </button>
                      <hr className="my-1" />
                      <button className="btn btn-sm btn-light d-flex align-items-center w-100 mb-1" onClick={() => { setOpenId(null); onEdit(it); }}>
                        <Edit2 size={14} className="me-2"/> Edit
                      </button>
                      <button className="btn btn-sm btn-danger d-flex align-items-center w-100" onClick={() => { setOpenId(null); if (confirm('Are you sure you want to delete this committee?')) onDelete(it.id); }}>
                        <Trash2 size={14} className="me-2"/> Delete
                      </button>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}