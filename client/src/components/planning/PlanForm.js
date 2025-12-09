"use client";
import React, { useState, useEffect } from 'react';

export default function PlanForm({ initial = null, onSave, onCancel }) {
  const [form, setForm] = useState({
    group: '',
    type: '',
    ward_no: '',
    implementation_level: '',
    status: '',
    name: '',
    budget: '',
  });

  useEffect(() => {
    if (initial) {
      setForm({
        group: initial.group || '',
        type: initial.type || '',
        ward_no: initial.ward_no || '',
        implementation_level: initial.implementation_level || '',
        status: initial.status || '',
        name: initial.name || '',
        budget: initial.budget || '',
      });
    }
  }, [initial]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave && onSave(form);
  };

  return (
    <div className="card p-3">
      <h5 className="mb-3">योजना</h5>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-6 mb-2">
            <label className="form-label">योजना ग्रुप</label>
            <input name="group" className="form-control" value={form.group} onChange={handleChange} />
          </div>
          <div className="col-6 mb-2">
            <label className="form-label">प्रकार</label>
            <input name="type" className="form-control" value={form.type} onChange={handleChange} />
          </div>

          <div className="col-4 mb-2">
            <label className="form-label">वडा नं</label>
            <input name="ward_no" className="form-control" value={form.ward_no} onChange={handleChange} />
          </div>

          <div className="col-4 mb-2">
            <label className="form-label">कार्यान्वयन तह</label>
            <input name="implementation_level" className="form-control" value={form.implementation_level} onChange={handleChange} />
          </div>

          <div className="col-4 mb-2">
            <label className="form-label">योजना अवस्था</label>
            <input name="status" className="form-control" value={form.status} onChange={handleChange} />
          </div>

          <div className="col-8 mb-2">
            <label className="form-label">योजनाको नाम</label>
            <input name="name" className="form-control" value={form.name} onChange={handleChange} />
          </div>

          <div className="col-4 mb-2">
            <label className="form-label">बजेट</label>
            <input name="budget" className="form-control" value={form.budget} onChange={handleChange} />
          </div>

        </div>

        <div className="d-flex justify-content-end gap-2 mt-3">
          <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
          <button type="submit" className="btn btn-primary">Save</button>
        </div>
      </form>
    </div>
  );
}
