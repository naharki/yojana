'use client';

import { useState, useEffect } from 'react';

export default function MemberForm({ onSubmit, initialData = null, onCancel = null }) {
  const [formData, setFormData] = useState(
    initialData || {
      position: '',
      full_name: '',
      sex: 'M',
      father_name: '',
      address: '',
      mobile_no: '',
      citizenship_no: '',
      is_account_holder: false,
      is_monitoring_committee: false,
    }
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.full_name.trim()) { alert('Full name is required'); return; }
    try {
      setLoading(true);
      await onSubmit(formData);
      if (!initialData) {
        setFormData({ position: '', full_name: '', sex: 'M', father_name: '', address: '', mobile_no: '', citizenship_no: '', is_account_holder: false, is_monitoring_committee: false });
      }
    } catch (err) {
      console.error('MemberForm submit error', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <div className="row">
        <div className="col-md-4 mb-3">
          <label className="form-label">Position</label>
          <input name="position" className="form-control" value={formData.position} onChange={handleChange} placeholder="e.g., Chairperson" />
        </div>
        <div className="col-md-8 mb-3">
          <label className="form-label">Full Name</label>
          <input name="full_name" className="form-control" value={formData.full_name} onChange={handleChange} placeholder="Full name" required />
        </div>
      </div>

      <div className="row">
        <div className="col-md-3 mb-3">
          <label className="form-label">Sex</label>
          <select name="sex" className="form-select" value={formData.sex} onChange={handleChange}>
            <option value="M">Male</option>
            <option value="F">Female</option>
            <option value="O">Other</option>
          </select>
        </div>
        <div className="col-md-5 mb-3">
          <label className="form-label">Father Name</label>
          <input name="father_name" className="form-control" value={formData.father_name} onChange={handleChange} placeholder="Father's name" />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Mobile No</label>
          <input name="mobile_no" className="form-control" value={formData.mobile_no} onChange={handleChange} placeholder="e.g., 98XXXXXXXX" />
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Address</label>
        <input name="address" className="form-control" value={formData.address} onChange={handleChange} placeholder="Address" />
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Citizenship No</label>
          <input name="citizenship_no" className="form-control" value={formData.citizenship_no} onChange={handleChange} placeholder="Citizenship No" />
        </div>
        <div className="col-md-6 d-flex align-items-end">
          <div className="form-check me-3">
            <input className="form-check-input" type="checkbox" id="accountHolder" name="is_account_holder" checked={formData.is_account_holder} onChange={handleChange} />
            <label className="form-check-label" htmlFor="accountHolder">Is Account Holder?</label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="monitoring" name="is_monitoring_committee" checked={formData.is_monitoring_committee} onChange={handleChange} />
            <label className="form-check-label" htmlFor="monitoring">Monitoring Committee?</label>
          </div>
        </div>
      </div>

      <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Saving...' : initialData ? 'Update Member' : 'Add Member'}</button>
      {onCancel && (<button type="button" className="btn btn-secondary ms-2" onClick={onCancel}>Cancel</button>)}
    </form>
  );
}
