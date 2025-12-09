'use client';

import { useState, useEffect } from 'react';

export default function WardForm({ onSubmit, initialData = null, onCancel = null }) {
  const [formData, setFormData] = useState(
    initialData || {
      name: '',
      code: '',
    }
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Name is required');
      return;
    }
    if (!formData.code.trim()) {
      alert('Code is required');
      return;
    }

    try {
      setLoading(true);
      await onSubmit({
        name: formData.name.trim(),
        code: formData.code.trim(),
      });
      if (!initialData) {
        setFormData({ name: '', code: '' });
      }
    } catch (err) {
      console.error('WardForm submit error', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <div className="row">
        <div className="col-md-8 mb-3">
          <label className="form-label">Name</label>
          <input
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ward name"
            required
          />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Code</label>
          <input
            name="code"
            className="form-control"
            value={formData.code}
            onChange={handleChange}
            placeholder="e.g., W001"
            required
          />
        </div>
      </div>

      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? 'Saving...' : initialData ? 'Update Ward' : 'Add Ward'}
      </button>
      {onCancel && (
        <button type="button" className="btn btn-secondary ms-2" onClick={onCancel}>
          Cancel
        </button>
      )}
    </form>
  );
}
