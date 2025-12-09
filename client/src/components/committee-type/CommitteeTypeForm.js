'use client';

import { useState } from 'react';

export default function CommitteeTypeForm({ onSubmit, initialData = null }) {
  const [formData, setFormData] = useState(
    initialData || {
      name: '',
      name_eng: '',
      committee_type_code: '',
    }
  );
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    if (!formData.name.trim()) {
      alert('Type Name (Nepali) is required');
      return;
    }
    if (!formData.name_eng.trim()) {
      alert('Type Name (English) is required');
      return;
    }
    if (!formData.committee_type_code.trim()) {
      alert('Type Code is required');
      return;
    }
    
    try {
      setLoading(true);
      await onSubmit({
        name: formData.name.trim(),
        name_eng: formData.name_eng.trim(),
        committee_type_code: formData.committee_type_code.trim()
      });
      
      // Reset form after successful submission
      if (!initialData) {
        setFormData({
          name: '',
          name_eng: '',
          committee_type_code: '',
        });
      }
    } catch (err) {
      console.error('Form submission error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="name" className="form-label">
            Type Name (Nepali)
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter type name in Nepali"
            required
          />
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="name_eng" className="form-label">
            Type Name (English)
          </label>
          <input
            type="text"
            id="name_eng"
            name="name_eng"
            className="form-control"
            value={formData.name_eng}
            onChange={handleChange}
            placeholder="Enter type name in English"
            required
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="committee_type_code" className="form-label">
            Type Code
          </label>
          <input
            type="text"
            id="committee_type_code"
            name="committee_type_code"
            className="form-control"
            value={formData.committee_type_code}
            onChange={handleChange}
            placeholder="e.g., CT001"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        disabled={loading}
      >
        {loading ? 'Saving...' : initialData ? 'Update Type' : 'Add Type'}
      </button>
      {initialData && (
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => setFormData({ name: '', name_eng: '', committee_type_code: '' })}
        >
          Clear
        </button>
      )}
    </form>
  );
}
