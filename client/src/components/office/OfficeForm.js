'use client';

import { useState, useEffect } from 'react';

export default function OfficeForm({ office, onSave }) {
  const [formData, setFormData] = useState({
    office_name: '',
    office_full_name: '',
    location: '',
    slogan: '',
    established: '',
  });

  useEffect(() => {
    if (office) {
      setFormData(office);
    }
  }, [office]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    setFormData({
      office_name: '',
      office_full_name: '',
      location: '',
      slogan: '',
      established: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label fw-bold text-dark">Office Name</label>
          <input
            type="text"
            name="office_name"
            placeholder="e.g., HQ Office"
            value={formData.office_name || ''}
            onChange={handleChange}
            required
            className="form-control form-control-lg"
            style={{ borderRadius: '6px' }}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label fw-bold text-dark">Full Office Name</label>
          <input
            type="text"
            name="office_full_name"
            placeholder="e.g., Headquarters Office"
            value={formData.office_full_name || ''}
            onChange={handleChange}
            required
            className="form-control form-control-lg"
            style={{ borderRadius: '6px' }}
          />
        </div>
      </div>
      
      <div className="mb-3">
        <label className="form-label fw-bold text-dark">Location</label>
        <textarea
          name="location"
          placeholder="e.g., 123 Business Street, City, Country"
          value={formData.location || ''}
          onChange={handleChange}
          required
          className="form-control"
          rows="3"
          style={{ borderRadius: '6px' }}
        />
      </div>
      
      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label fw-bold text-dark">Slogan</label>
          <input
            type="text"
            name="slogan"
            placeholder="e.g., Innovating Tomorrow"
            value={formData.slogan || ''}
            onChange={handleChange}
            className="form-control form-control-lg"
            style={{ borderRadius: '6px' }}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label fw-bold text-dark">Established Date</label>
          <input
            type="date"
            name="established"
            value={formData.established || ''}
            onChange={handleChange}
            required
            className="form-control form-control-lg"
            style={{ borderRadius: '6px' }}
          />
        </div>
      </div>
      
      <div className="d-flex gap-2 pt-3 border-top">
        <button
          type="submit"
          className="btn btn-success btn-lg"
          style={{ borderRadius: '6px' }}
        >
          ✓ Save Office
        </button>
        <button
          type="reset"
          className="btn btn-outline-secondary btn-lg"
          style={{ borderRadius: '6px' }}
        >
          ↻ Reset
        </button>
      </div>
    </form>
  );
}
