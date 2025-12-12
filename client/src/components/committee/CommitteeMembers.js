'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import MemberForm from './MemberForm';
import { MoreHorizontal, Edit2, Trash2 } from 'lucide-react';

export default function CommitteeMembers({ committee, apiBase, onClose }) {
  const [members, setMembers] = useState([]);
  const [monitoring, setMonitoring] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openMemberId, setOpenMemberId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    if (committee?.id) fetchMembers();
  }, [committee]);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const resp = await axios.get(`${apiBase}/committees/${committee.id}/`);
      const data = resp.data;

      // Separate normal members and monitoring members
      const normalMembers = (data.members || []).filter(m => !m.is_anugaman);
      const monitoringMembers = (data.members || []).filter(m => m.is_anugaman);

      setMembers(normalMembers);
      setMonitoring(monitoringMembers);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddOrUpdate = async (data) => {
    try {
      if (editing) {
        // Update locally
        setMembers(prev => prev.map(m => m.id === editing.id ? { ...m, ...data } : m));
        setMonitoring(prev => prev.map(m => m.id === editing.id ? { ...m, ...data } : m));
      } else {
        // Add new member locally (you can replace with API POST)
        const newId = Date.now();
        const newItem = { id: newId, ...data };
        if (newItem.is_anugaman) setMonitoring(prev => [newItem, ...prev]);
        else setMembers(prev => [newItem, ...prev]);
      }
      setShowForm(false);
      setEditing(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (member) => { setEditing(member); setShowForm(true); };
  const handleDelete = (id) => {
    if (!confirm('Are you sure you want to delete this member?')) return;
    setMembers(prev => prev.filter(m => m.id !== id));
    setMonitoring(prev => prev.filter(m => m.id !== id));
  };

  return (
    <div className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h6 className="mb-0">Members of {committee.name}</h6>
        <div>
          <button className="btn btn-sm btn-secondary me-2" onClick={() => { setEditing(null); setShowForm(true); }}>Add Member</button>
          <button className="btn btn-sm btn-outline-secondary" onClick={onClose}>Close</button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-3"><div className="spinner-border"/></div>
      ) : (
        <>
          {/* Normal Members */}
          <div className="table-responsive mb-3  ">
            <table className="table table-hover table-striped">
              <thead className="table-light">
                <tr>
                  <th>S.N</th>
                  <th>Role</th>
                  <th>Name</th>
                  <th>Sex</th>
                  <th>Father Name</th>
                  <th>Address</th>
                  <th>Mobile No</th>
                  <th>Citizenship No</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {members.map((m, idx) => (
                  <tr key={m.id}>
                    <td>{idx + 1}</td>
                    <td>{m.role}</td>
                    <td>{m.name}</td>
                    <td>{m.sex}</td>
                    <td>{m.father_name}</td>
                    <td>{m.address}</td>
                    <td>{m.mobile_number}</td>
                    <td>{m.citizenship_number}</td>
                    <td>
                      <div style={{ position: 'relative', display: 'inline-block' }}>
                        <button className="btn btn-sm btn-outline-secondary" onClick={() => setOpenMemberId(openMemberId === m.id ? null : m.id)}>
                          <MoreHorizontal size={16} />
                        </button>
                        {openMemberId === m.id && (
                          <div className="card shadow-sm p-2" style={{ position: 'absolute', right: '110%', top: 0, minWidth: 140, zIndex: 2000 }}>
                            <button className="btn btn-sm btn-light w-100 mb-1" onClick={() => { setOpenMemberId(null); handleEdit(m); }}>
                              <Edit2 size={14} className="me-2"/> Edit
                            </button>
                            <button className="btn btn-sm btn-danger w-100" onClick={() => { setOpenMemberId(null); handleDelete(m.id); }}>
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

          {/* Monitoring Members */}
          {monitoring.length > 0 && (
            <div className="mb-4">
              <h6 className="mb-2">Monitoring Committee Members</h6>
              <div className="table-responsive">
                <table className="table table-sm table-bordered">
                  <thead className="table-light">
                    <tr>
                      <th>S.N</th>
                      <th>Name</th>
                      <th>Role</th>
                      <th>Mobile</th>
                      <th>Address</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {monitoring.map((m, idx) => (
                      <tr key={m.id}>
                        <td>{idx + 1}</td>
                        <td>{m.name}</td>
                        <td>{m.role}</td>
                        <td>{m.mobile_number}</td>
                        <td>{m.address}</td>
                        <td>
                          <div style={{ position: 'relative', display: 'inline-block' }}>
                            <button className="btn btn-sm btn-outline-secondary" onClick={() => setOpenMemberId(openMemberId === m.id ? null : m.id)}>
                              <MoreHorizontal size={16} />
                            </button>
                            {openMemberId === m.id && (
                              <div className="card shadow-sm p-2" style={{ position: 'absolute', right: '110%', top: 0, minWidth: 140, zIndex: 2000 }}>
                                <button className="btn btn-sm btn-light w-100 mb-1" onClick={() => { setOpenMemberId(null); handleEdit(m); }}>
                                  <Edit2 size={14} className="me-2"/> Edit
                                </button>
                                <button className="btn btn-sm btn-danger w-100" onClick={() => { setOpenMemberId(null); handleDelete(m.id); }}>
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
            </div>
          )}
        </>
      )}

      {/* Member Form Popup */}
      {showForm && (
        <div>
          <div className="position-fixed top-0 start-0 w-100 h-100" style={{ background: 'rgba(0,0,0,0.35)', zIndex: 2990 }} onClick={() => { setShowForm(false); setEditing(null); }} aria-hidden />
          <div style={{ zIndex: 3000 }} className="position-fixed top-50 start-50 translate-middle">
            <div className="card shadow" style={{ minWidth: 520 }}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h6 className="mb-0">{editing ? 'Edit Member' : 'Add Member'}</h6>
                  <button type="button" className="btn-close" onClick={() => { setShowForm(false); setEditing(null); }} />
                </div>
                <MemberForm initialData={editing} onSubmit={handleAddOrUpdate} onCancel={() => { setShowForm(false); setEditing(null); }} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
