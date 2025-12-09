'use client';

import { Edit2, Trash2 } from 'lucide-react';

export default function CommitteeTypeList({ types, onEdit, onDelete }) {
  if (types.length === 0) {
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
            <th style={{ width: '5%' }}>S.N</th>
            <th style={{ width: '30%' }}>Type</th>
            <th style={{ width: '30%' }}>Type in English</th>
            <th style={{ width: '20%' }}>Code</th>
            <th style={{ width: '15%' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {types.map((type, index) => (
            <tr key={type.id}>
              <td>
                <strong>{index + 1}</strong>
              </td>
              <td>{type.name}</td>
              <td>{type.name_eng}</td>
              <td>
                <span className="badge bg-secondary">{type.committee_type_code}</span>
              </td>
              <td>
                <button
                  onClick={() => onEdit(type)}
                  className="btn btn-sm btn-primary me-2"
                  title="Edit"
                >
                  <Edit2 size={16} className="me-1" style={{ display: 'inline' }} />
                  Edit
                </button>
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to delete this type?')) {
                      onDelete(type.id);
                    }
                  }}
                  className="btn btn-sm btn-danger"
                  title="Delete"
                >
                  <Trash2 size={16} className="me-1" style={{ display: 'inline' }} />
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
