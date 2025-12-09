"use client";
import React, { useState, useEffect, useRef } from 'react';
import PlanForm from './PlanForm';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://jsonplaceholder.typicode.com';

function mapPostToPlan(post) {
  // map jsonplaceholder post fields into plan fields for dummy data
  return {
    id: post.id,
    group: post.userId ? `Group ${post.userId}` : '',
    type: 'सामाजिक',
    ward_no: ((post.id % 9) + 1).toString(),
    implementation_level: 'Local',
    status: post.title ? 'Planned' : 'Draft',
    name: post.title || `Plan ${post.id}`,
    budget: ((post.id * 10000) % 500000).toString(),
    raw: post,
  };
}

export default function PlanList() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterWard, setFilterWard] = useState('');
  const [filterName, setFilterName] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchPlans();
  }, []);

  async function fetchPlans() {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/posts?_limit=30`);
      const data = await res.json();
      setPlans(data.map(mapPostToPlan));
    } catch (err) {
      console.error('fetchPlans error', err);
    } finally {
      setLoading(false);
    }
  }

  const filtered = plans.filter((p) => {
    const wardOk = filterWard ? p.ward_no === filterWard : true;
    const nameOk = filterName ? p.name.toLowerCase().includes(filterName.toLowerCase()) : true;
    return wardOk && nameOk;
  });

  const openNew = () => { setEditing(null); setShowForm(true); };
  const openEdit = (plan) => { setEditing(plan); setShowForm(true); };
  const closeForm = () => { setEditing(null); setShowForm(false); };

  const handleSave = async (formData) => {
    // If editing, do PUT (simulated), else POST
    if (editing) {
      try {
        const res = await fetch(`${API_BASE}/posts/${editing.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const updated = await res.json();
        setPlans((prev) => prev.map(p => p.id === editing.id ? { ...p, ...formData } : p));
      } catch (err) { console.error(err); }
    } else {
      try {
        const res = await fetch(`${API_BASE}/posts`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const created = await res.json();
        // jsonplaceholder returns id 101 for new posts; ensure unique local id
        const newId = created.id || (Math.max(0, ...plans.map(p=>p.id)) + 1);
        setPlans((prev) => [{ id: newId, ...formData }, ...prev]);
      } catch (err) { console.error(err); }
    }
    closeForm();
  };

  const handleDelete = async (plan) => {
    if (!confirm('Delete this plan?')) return;
    try {
      await fetch(`${API_BASE}/posts/${plan.id}`, { method: 'DELETE' });
      setPlans((prev) => prev.filter(p => p.id !== plan.id));
    } catch (err) { console.error(err); }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">योजना सूची (Plans)</h5>
        <div>
          <button className="btn btn-primary" onClick={openNew}>+ Add Plan</button>
        </div>
      </div>

      <div className="card p-3 mb-3">
        <div className="row align-items-end">
          <div className="col-3">
            <label className="form-label">वडा नं (Ward No)</label>
            <input className="form-control" value={filterWard} onChange={(e)=>setFilterWard(e.target.value)} placeholder="e.g. 3" />
          </div>
          <div className="col-6">
            <label className="form-label">योजनाको नाम (Plan name)</label>
            <input className="form-control" value={filterName} onChange={(e)=>setFilterName(e.target.value)} placeholder="search by name" />
          </div>
          <div className="col-3 d-flex justify-content-end">
            <button className="btn btn-outline-secondary me-2" onClick={()=>{ setFilterWard(''); setFilterName(''); }}>Clear</button>
            <button className="btn btn-secondary" onClick={()=>fetchPlans()}>Reload</button>
          </div>
        </div>
      </div>

      <div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <table className="table table-sm">
            <thead>
              <tr>
                <th>#</th>
                <th>योजनाको नाम</th>
                <th>वडा नं</th>
                <th>प्रकार</th>
                <th>कार्यान्वयन तह</th>
                <th>योजना अवस्था</th>
                <th>बजेट</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, idx) => (
                <tr key={p.id}>
                  <td>{idx+1}</td>
                  <td>{p.name}</td>
                  <td>{p.ward_no}</td>
                  <td>{p.type}</td>
                  <td>{p.implementation_level}</td>
                  <td>{p.status}</td>
                  <td>{p.budget}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <button className="btn btn-sm btn-outline-primary" onClick={()=>openEdit(p)}>Edit</button>
                      <button className="btn btn-sm btn-outline-danger" onClick={()=>handleDelete(p)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showForm && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editing ? 'Edit Plan' : 'New Plan'}</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={closeForm}></button>
              </div>
              <div className="modal-body">
                <PlanForm initial={editing} onSave={handleSave} onCancel={closeForm} />
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
