'use client';

import { Edit2, Trash2 } from 'lucide-react';

export default function OfficeList({ offices, loading, onEdit, onDelete }) {
  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (offices.length === 0) {
    return (
      <div className="alert alert-info text-center py-5 mb-0">
        <h5 className="mb-2">📭 No Offices Found</h5>
        <p className="mb-0">Click "Add New Office" to create your first office record.</p>
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table table-hover mb-0">
        <thead className="table-light">
          <tr>
            <th className="px-4 py-3 fw-bold text-dark">🏢 Office Name</th>
            <th className="px-4 py-3 fw-bold text-dark">📛 Full Name</th>
            <th className="px-4 py-3 fw-bold text-dark">📍 Location</th>
            <th className="px-4 py-3 fw-bold text-dark">Website</th>
            <th className='px-4 py-3 fw-bold text-dark'>Contact</th>
            <th className="px-4 py-3 fw-bold text-dark text-center">⚙️ Actions</th>
          </tr>
        </thead>
        <tbody>
          {offices.map((office) => (
            <tr key={office.id} className="border-bottom">
              <td className="px-4 py-3">
                <span className="fw-bold text-dark">{office.name}</span>
              </td>
              <td className="px-4 py-3 text-secondary">{office.full_name}</td>
              <td className="px-4 py-3 text-secondary">{office.location}</td>
              <td className="px-4 py-3 text-secondary">{office.website}</td>
              <td className="px-4 py-3 text-secondary">{office.phone_number}</td>
              
              <td className="px-4 py-3 text-center">
                <button
                  onClick={() => onEdit(office)}
                  className="btn btn-sm btn-outline-primary me-2"
                  style={{ borderRadius: '6px' }}
                  title="Edit"
                >
                  <Edit2 size={16} className="me-1" />
                  Edit
                </button>
                <button
                  onClick={() => onDelete(office.id)}
                  className="btn btn-sm btn-outline-danger"
                  style={{ borderRadius: '6px' }}
                  title="Delete"
                >
                  <Trash2 size={16} className="me-1" />
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
