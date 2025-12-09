'use client';

import { useState } from 'react';
import { Settings, FileSpreadsheet } from 'lucide-react';
import PlanForm from './PlanForm';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://jsonplaceholder.typicode.com';

function mapPostToPlan(post) {
  // derive plan-like fields from jsonplaceholder post
  return {
    id: post.id,
    group: post.userId ? `Group ${post.userId}` : 'General',
    type: post.title ? post.title.split(' ')[0] : 'Type A',
    ward_no: ((post.id % 9) + 1).toString(),
    level: ['Local', 'Municipal', 'District'][post.id % 3],
    status: ['Planned', 'Ongoing', 'Completed'][post.id % 3],
    name: post.title || `Plan ${post.id}`,
    budget: ((post.id * 10000) % 500000).toString(),
    raw: post,
  };
}

export default function PlanList() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);

  const [filterWard, setFilterWard] = useState('');
  const [filterName, setFilterName] = useState('');

  const fetchPlans = () => {
    setLoading(true);
    fetch(`${API_BASE}/posts?_limit=50`)
      .then((r) => r.json())
      .then((data) => {
        const mapped = data.map(mapPostToPlan);
        setPlans(mapped);
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  };

  const openAdd = () => { setEditing(null); setShowModal(true); };
  const [exportMode, setExportMode] = useState(false);

  const handleSave = async (payload) => {
    // If payload has id, treat as update; else create new
    if (payload.id) {
      // PUT to dummy API (doesn't persist) and update local state
      try {
        await fetch(`${API_BASE}/posts/${payload.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      } catch (e) { console.warn(e); }
      setPlans((p) => p.map((x) => (x.id === payload.id ? { ...x, ...payload } : x)));
    } else {
      try {
        const res = await fetch(`${API_BASE}/posts`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        const created = await res.json();
        const plan = { ...payload, id: created.id || Date.now() };
        setPlans((p) => [plan, ...p]);
      } catch (e) { console.warn(e); }
    }
    setShowModal(false);
  };

  const handleEdit = (plan) => { setEditing(plan); setShowModal(true); };

  const handleDelete = async (id) => {
    if (!confirm('Delete this plan?')) return;
    try {
      await fetch(`${API_BASE}/posts/${id}`, { method: 'DELETE' });
    } catch (e) { console.warn(e); }
    setPlans((p) => p.filter((x) => x.id !== id));
  };

  const [openActionId, setOpenActionId] = useState(null);

  const filtered = plans.filter((p) => {
    if (filterWard && !p.ward_no.includes(filterWard)) return false;
    if (filterName && !p.name.toLowerCase().includes(filterName.toLowerCase())) return false;
    return true;
  });

  const exportPlans = () => {
    if (!filtered || filtered.length === 0) {
      alert('No plans to export');
      return;
    }

    // Build CSV
    const headers = ['id', 'योजना ग्रुप', 'प्रकार', 'वडा नं', 'कार्यान्वयन तह', 'योजना अवस्था', 'अवस्था', 'योजनाको नाम', 'बजेट'];
    const rows = filtered.map((p) => [p.id, p.group, p.type, p.ward_no, p.level, p.status, p.status, p.name, p.budget]);
    const csvContent = [headers, ...rows].map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');

    const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'plans.csv';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);

    // revert button back to Add after export
    setExportMode(false);
  };

  return (
    <div className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">योजनाहरू (Plans)</h4>
        <div>
          {exportMode && (
            <button className="btn btn-success me-2 d-flex align-items-center" onClick={exportPlans}><FileSpreadsheet size={16} className="me-2" /> Export</button>
          )}
        </div>
      </div>

      <div className="row mb-3 align-items-center">
        <div className="col-md-3 mb-2">
          <input placeholder="Filter by वडा नं" className="form-control" value={filterWard} onChange={(e) => setFilterWard(e.target.value)} />
        </div>
        <div className="col-md-4 mb-2">
          <input placeholder="Filter by योजनाको नाम" className="form-control" value={filterName} onChange={(e) => setFilterName(e.target.value)} />
        </div>
        <div className="col-md-5 mb-2 d-flex justify-content-end flex-nowrap">
          <button className="btn btn-sm btn-primary me-2" onClick={fetchPlans}>Apply</button>
          <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => { setFilterName(''); setFilterWard(''); setPlans([]); setExportMode(false); }}>Reset</button>
          <button className="btn btn-sm btn-outline-success me-2 d-flex align-items-center" onClick={exportPlans} title="Export to Excel">
            <FileSpreadsheet size={14} className="me-1" /> Export
          </button>
          
        </div>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-sm table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>योजना ग्रुप</th>
                <th>प्रकार</th>
                <th>वडा नं</th>
                <th>कार्यान्वयन तह</th>
                <th>योजना अवस्था</th>
                <th>अवस्था</th>
                <th>योजनाको नाम</th>
                <th>बजेट</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={10} className="text-center text-muted">No results. Use filters and click Apply/Search to load plans.</td>
                </tr>
              ) : (
                filtered.map((p, i) => (
                  <tr key={p.id}>
                    <td>{i + 1}</td>
                    <td>{p.group}</td>
                    <td>{p.type}</td>
                    <td>{p.ward_no}</td>
                    <td>{p.level}</td>
                    <td>{p.status}</td>
                    <td>{p.status}</td>
                    <td>{p.name}</td>
                    <td>{p.budget}</td>
                    <td style={{ position: 'relative', width: 80 }}>
                      <div className="d-flex align-items-center justify-content-center">
                        <button title="Actions" className="btn btn-sm btn-light p-1" onClick={() => setOpenActionId(openActionId === p.id ? null : p.id)} style={{ borderRadius: 6 }}>
                          <Settings size={16} />
                        </button>
                      </div>

                      {openActionId === p.id && (
                        <div className="position-absolute bg-white border rounded shadow-sm" style={{ right: 8, top: '110%', zIndex: 2000, minWidth: 140 }}>
                          <div className="p-2">
                            <button className="w-100 btn btn-sm btn-link text-start" onClick={() => { setOpenActionId(null); handleEdit(p); }}>
                              Edit
                            </button>
                            <button className="w-100 btn btn-sm btn-link text-start text-danger" onClick={() => { setOpenActionId(null); handleDelete(p.id); }}>
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ background: 'rgba(0,0,0,0.4)', zIndex: 1050 }}>
          <div className="bg-white rounded" style={{ width: 720, maxWidth: '95%' }}>
            <div className="d-flex justify-content-between align-items-center p-2 border-bottom">
              <h5 className="mb-0">{editing ? 'Edit Plan' : 'Create Plan'}</h5>
              <button className="btn btn-sm btn-light" onClick={() => setShowModal(false)}>×</button>
            </div>
            <div>
              <PlanForm initial={editing || {}} onSave={handleSave} onCancel={() => setShowModal(false)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
