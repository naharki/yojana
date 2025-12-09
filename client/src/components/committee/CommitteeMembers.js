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

  useEffect(() => { fetchMembers(); }, [committee]);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      // use comments as dummy members
      const resp = await axios.get((apiBase || '') + '/comments');
      const mapped = resp.data.slice(0, 8).map((c) => ({
        id: c.id,
        position: 'Member',
        full_name: c.name,
        sex: 'M',
        father_name: 'Unknown',
        address: c.email,
        mobile_no: '',
        citizenship_no: '',
        is_account_holder: false,
        is_monitoring_committee: c.id % 3 === 0,
      }));
      setMembers(mapped.filter(m => !m.is_monitoring_committee));
      setMonitoring(mapped.filter(m => m.is_monitoring_committee));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddOrUpdate = async (data) => {
    try {
      if (editing) {
        // dummy update
        setMembers((prev) => prev.map(m => m.id === editing.id ? { ...m, ...data } : m));
        setMonitoring((prev) => prev.map(m => m.id === editing.id ? { ...m, ...data } : m));
      } else {
        // dummy create, assign id
        const newId = Date.now();
        const newItem = { id: newId, ...data };
        if (newItem.is_monitoring_committee) setMonitoring(prev => [newItem, ...prev]); else setMembers(prev => [newItem, ...prev]);
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
          <div className="table-responsive mb-3">
            <table className="table table-hover table-striped">
              <thead className="table-light">
                <tr>
                  <th style={{ width: '5%' }}>S.N</th>
                  <th style={{ width: '10%' }}>Position</th>
                  <th style={{ width: '20%' }}>Full Name</th>
                  <th style={{ width: '8%' }}>Sex</th>
                  <th style={{ width: '15%' }}>Father Name</th>
                  <th style={{ width: '15%' }}>Address</th>
                  <th style={{ width: '10%' }}>Mobile No</th>
                  <th style={{ width: '10%' }}>Citizenship No</th>
                  <th style={{ width: '7%' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {members.map((m, idx) => (
                  <tr key={m.id} style={{ position: 'relative' }}>
                    <td><strong>{idx + 1}</strong></td>
                    <td>{m.position}</td>
                    <td>{m.full_name}</td>
                    <td>{m.sex}</td>
                    <td>{m.father_name}</td>
                    <td>{m.address}</td>
                    <td>{m.mobile_no}</td>
                    <td>{m.citizenship_no}</td>
                    <td>
                      <div style={{ position: 'relative', display: 'inline-block' }}>
                        <button className="btn btn-sm btn-outline-secondary" onClick={() => setOpenMemberId(openMemberId === m.id ? null : m.id)}>
                          <MoreHorizontal size={16} />
                        </button>
                        {openMemberId === m.id && (
                          <div className="card shadow-sm p-2" style={{ position: 'absolute', right: '110%', top: 0, minWidth: 140, zIndex: 2000 }}>
                            <button className="btn btn-sm btn-light d-flex align-items-center w-100 mb-1" onClick={() => { setOpenMemberId(null); handleEdit(m); }}>
                              <Edit2 size={14} className="me-2"/> Edit
                            </button>
                            <button className="btn btn-sm btn-danger d-flex align-items-center w-100" onClick={() => { setOpenMemberId(null); handleDelete(m.id); }}>
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

          {monitoring.length > 0 && (
            <div className="mb-4">
              <h6 className="mb-2">Monitoring Committee Members</h6>
              <div className="table-responsive">
                <table className="table table-sm table-bordered">
                  <thead className="table-light">
                    <tr>
                      <th style={{ width: '5%' }}>S.N</th>
                      <th style={{ width: '20%' }}>Full Name</th>
                      <th style={{ width: '15%' }}>Position</th>
                      <th style={{ width: '15%' }}>Mobile No</th>
                      <th style={{ width: '15%' }}>Address</th>
                      <th style={{ width: '10%' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {monitoring.map((m, idx) => (
                      <tr key={m.id}>
                        <td><strong>{idx + 1}</strong></td>
                        <td>{m.full_name}</td>
                        <td>{m.position}</td>
                        <td>{m.mobile_no}</td>
                        <td>{m.address}</td>
                        <td>
                          <div style={{ position: 'relative', display: 'inline-block' }}>
                            <button className="btn btn-sm btn-outline-secondary" onClick={() => setOpenMemberId(openMemberId === m.id ? null : m.id)}>
                              <MoreHorizontal size={16} />
                            </button>
                            {openMemberId === m.id && (
                              <div className="card shadow-sm p-2" style={{ position: 'absolute', right: '110%', top: 0, minWidth: 140, zIndex: 2000 }}>
                                <button className="btn btn-sm btn-light d-flex align-items-center w-100 mb-1" onClick={() => { setOpenMemberId(null); handleEdit(m); }}>
                                  <Edit2 size={14} className="me-2"/> Edit
                                </button>
                                <button className="btn btn-sm btn-danger d-flex align-items-center w-100" onClick={() => { setOpenMemberId(null); handleDelete(m.id); }}>
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

      {/* popup form */}
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
                <MemberForm initialData={editing} onSubmit={async (d) => { await handleAddOrUpdate(d); }} onCancel={() => { setShowForm(false); setEditing(null); }} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
