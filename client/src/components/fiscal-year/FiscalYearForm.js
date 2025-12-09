'use client';

import { useState, useEffect } from 'react';

export default function FiscalYearForm({ onSubmit, initialData = null, onCancel = null }) {
  const [formData, setFormData] = useState(
    initialData || {
      fiscal_year: '',
      start_date: '',
      end_date: '',
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
    if (!formData.fiscal_year.trim()) {
      alert('Fiscal year is required');
      return;
    }
    if (!formData.start_date.trim()) {
      alert('Start date is required');
      return;
    }
    if (!formData.end_date.trim()) {
      alert('End date is required');
      return;
    }

    try {
      setLoading(true);
      await onSubmit({
        fiscal_year: formData.fiscal_year.trim(),
        start_date: formData.start_date,
        end_date: formData.end_date,
      });
      if (!initialData) {
        setFormData({ fiscal_year: '', start_date: '', end_date: '' });
      }
    } catch (err) {
      console.error('FiscalYearForm submit error', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Fiscal Year</label>
          <input
            name="fiscal_year"
            className="form-control"
            value={formData.fiscal_year}
            onChange={handleChange}
            placeholder="e.g., 2024/2025"
            required
          />
        </div>
        <div className="col-md-3 mb-3">
          <label className="form-label">Start Date</label>
          <input
            name="start_date"
            type="date"
            className="form-control"
            value={formData.start_date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-3 mb-3">
          <label className="form-label">End Date</label>
          <input
            name="end_date"
            type="date"
            className="form-control"
            value={formData.end_date}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? 'Saving...' : initialData ? 'Update Fiscal Year' : 'Add Fiscal Year'}
      </button>
      {onCancel && (
        <button type="button" className="btn btn-secondary ms-2" onClick={onCancel}>
          Cancel
        </button>
      )}
    </form>
  );
}
