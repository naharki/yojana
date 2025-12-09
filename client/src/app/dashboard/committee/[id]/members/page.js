"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import dynamic from 'next/dynamic';

const CommitteeMembers = dynamic(() => import('@/components/committee/CommitteeMembers'), { ssr: false });

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://jsonplaceholder.typicode.com';

export default function CommitteeMembersPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params || {};
  const [committee, setCommittee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) fetchCommittee();
  }, [id]);

  const fetchCommittee = async () => {
    try {
      setLoading(true);
      const resp = await axios.get(`${API_URL}/posts/${id}`);
      const p = resp.data;
      const mapped = {
        id: p.id,
        reg_no: `REG-${String(p.id).padStart(3,'0')}`,
        name: p.title ? p.title.slice(0,40) : `Committee ${p.id}`,
        committee_type: p.userId ? `Type ${p.userId}` : 'General',
        address: p.body ? p.body.slice(0,40) : 'Unknown',
        formation_date: `${2020 + (p.id % 5)}-01-15`,
      };
      setCommittee(mapped);
    } catch (err) {
      console.error(err);
      setError('Failed to load committee');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <div className="card shadow-sm">
        <div className="card-header bg-light border-bottom d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Members</h5>
          <button className="btn btn-sm btn-outline-secondary" onClick={() => router.push('/dashboard/committee/list')}>Back to Committees</button>
        </div>
        <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>}
          {loading ? (
            <div className="text-center"><div className="spinner-border" role="status"/></div>
          ) : (
            committee ? (
              <CommitteeMembers committee={committee} apiBase={process.env.NEXT_PUBLIC_API_URL || 'https://jsonplaceholder.typicode.com'} onClose={() => router.push('/dashboard/committee/list')} />
            ) : (
              <div className="alert alert-info">Committee not found</div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
