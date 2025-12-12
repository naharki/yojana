'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import CommitteeForm from '@/components/committee/CommitteeForm';
import CommitteeList from '@/components/committee/CommitteeList';
// Members are shown on a dedicated nested route: /dashboard/committee/[id]/members
import { PlusCircle } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function mapToCommittee(p) {
  return {
    id: p.id,
    reg_no: `REG-${String(p.id).padStart(3,'0')}`,
    name: p.title ? p.title.slice(0,40) : `Committee ${p.id}`,
    committee_type: p.userId ? `Type ${p.userId}` : 'General',
    address: p.body ? p.body.slice(0,40) : 'Unknown',
    formation_date: `${2020 + (p.id % 5)}-01-15`,
  };
}

export default function CommitteeListPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const resp = await axios.get(API_URL + '/committees/');
      setItems(resp.data);
      
    } catch (err) {
      console.error(err);
      setError('Failed to load committees');
    } finally { setLoading(false); }
  };

  const handleSave = async (data) => {
    try {
      setError('');
      if (editing) {
        await axios.put(API_URL + `/committees/${editing.id}`, data);
        setItems((prev) => prev.map((it) => it.id === editing.id ? { ...it, ...data } : it));
        setSuccess('Committee updated');
      } else {
        const resp = await axios.post(API_URL + '/committees', data);
        const newId = resp.data.id || Date.now();
        const newItem = { id: newId, ...data };
        setItems((prev) => [newItem, ...prev]);
        setSuccess('Committee created');
      }
      if (!USING_DUMMY) await fetchItems();
      setShowForm(false);
      setEditing(null);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error(err);
      setError('Failed to save committee');
    }
  };

  const handleEdit = (it) => { setEditing(it); setShowForm(true); window.scrollTo(0,0); };

  const handleDelete = async (id) => {
    try {
      await axios.delete(API_URL + `/committees/${id}`);
      setItems((prev) => prev.filter((i) => i.id !== id));
      setSuccess('Committee deleted');
      if (!USING_DUMMY) await fetchItems();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error(err);
      setError('Failed to delete committee');
    }
  };

  const router = useRouter();

  const handleAction = (action, it) => {
    console.log('handleAction', action, it);
    if (action === 'members') {
      // navigate to nested members route
      router.push(`/dashboard/committee/${it.id}/members`);
      return;
    } else if (action === 'certificate') {
      // navigate to the certificate printable page for this committee
      router.push(`/dashboard/committee/${it.id}/certificate`);
    } else if (action === 'account_open') {
      alert(`Mark account open for ${it.name}`);
    } else if (action === 'account_closed') {
      alert(`Mark account closed for ${it.name}`);
    }
  };

  return (
    <div className="p-4">
      <div className="card shadow-sm">
        <div className="card-header bg-light border-bottom">
          <h5 className="mb-0">👥 Committee</h5>
        </div>
        <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <div className="d-flex justify-content-between align-items-center mb-3">
            <h6 className="mb-0">Committee List</h6>
            <button className="btn btn-primary d-flex align-items-center" onClick={() => { setEditing(null); setShowForm(true); }}>
              <PlusCircle size={18} className="me-2"/> Add Committee
            </button>
          </div>

          {showForm && (
            <div>
              <div className="position-fixed top-0 start-0 w-100 h-100" style={{ background: 'rgba(0,0,0,0.35)', zIndex: 2990 }} onClick={() => { setShowForm(false); setEditing(null); }} aria-hidden />
              <div style={{ zIndex: 3000 }} className="position-fixed top-50 start-50 translate-middle">
                <div className="card shadow" style={{ minWidth: 520 }}>
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h6 className="mb-0">{editing ? 'Edit Committee' : 'Add New Committee'}</h6>
                      <button type="button" className="btn-close" onClick={() => { setShowForm(false); setEditing(null); }} />
                    </div>
                    <CommitteeForm onSubmit={async (data) => { await handleSave(data); setShowForm(false); }} initialData={editing} onCancel={() => { setShowForm(false); setEditing(null); }} />
                  </div>
                </div>
              </div>
            </div>
          )}

          <hr />

          {loading ? (
            <div className="text-center"><div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div></div>
          ) : (
            <>
              <CommitteeList items={items} onEdit={handleEdit} onDelete={handleDelete} onAction={handleAction} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}