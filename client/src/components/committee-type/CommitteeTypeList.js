'use client';

import { useState } from 'react';
import { Edit2, Trash2, MoreHorizontal } from 'lucide-react';

export default function CommitteeTypeList({ types, onEdit, onDelete }) {
  const [openId, setOpenId] = useState(null);
  if (!types || types.length === 0) {
    return (
      <div className="alert alert-info">
        <p className="mb-0">No committee types found. Create one to get started.</p>
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table table-hover table-striped">
        <thead className="table-light">
          <tr>
            <th style={{ width: '5%' }}>क्र.स</th>
            <th style={{ width: '30%' }}>नाम</th>
            <th style={{ width: '30%' }}>अंग्रेजी नाम</th>
            <th style={{ width: '20%' }}>कोड</th>
            <th style={{ width: '15%' }}>कार्य</th>
          </tr>
        </thead>
        <tbody>
          {types.map((type, index) => (
            <tr key={type.id} style={{ position: 'relative' }}>
              <td>
                <strong>{index + 1}</strong>
              </td>
              <td>{type.name}</td>
              <td>{type.eng_name}</td>
              <td>
                <span className="badge bg-secondary">{type.code}</span>
              </td>
              <td>
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => setOpenId(openId === type.id ? null : type.id)}
                    title="Actions"
                  >
                    <MoreHorizontal size={16} />
                  </button>

                  {openId === type.id && (
                    <div
                      className="card shadow-sm p-2"
                      style={{
                        position: 'absolute',
                        right: '110%',
                        top: 0,
                        minWidth: '140px',
                        zIndex: 2000,
                      }}
                    >
                      <button
                        className="btn btn-sm btn-light d-flex align-items-center w-100 mb-1"
                        onClick={() => {
                          setOpenId(null);
                          onEdit(type);
                        }}
                      >
                        <Edit2 size={14} className="me-2" /> Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger d-flex align-items-center w-100"
                        onClick={() => {
                          setOpenId(null);
                          if (confirm('Are you sure you want to delete this type?')) {
                            onDelete(type.id);
                          }
                        }}
                      >
                        <Trash2 size={14} className="me-2" /> Delete
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
