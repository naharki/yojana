import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import CertificateHeader from './CertificateHeader';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://jsonplaceholder.typicode.com';

// Simple certificate editor allowing three predefined fields and a justified editable content area.
export default function CertificateEditor({ committeeId, initialData }) {
  const defaultTemplate = `This is to certify that {{subject}} was inspected on {{issue_date}}. The certificate pertains to {{extra}}. Please keep this document for future reference.`;

  const [field1, setField1] = useState(initialData?.field1 || new Date().toLocaleDateString());
  const [field2, setField2] = useState(initialData?.field2 || 'Certificate Subject');
  const [field3, setField3] = useState(initialData?.field3 || 'Additional Info');
  const [content, setContent] = useState(initialData?.content || defaultTemplate.replace(/{{\s*issue_date\s*}}/g, initialData?.field1 || new Date().toLocaleDateString()).replace(/{{\s*subject\s*}}/g, initialData?.field2 || 'Certificate Subject').replace(/{{\s*extra\s*}}/g, initialData?.field3 || 'Additional Info'));
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState(initialData?.savedAt || null);
  const editableRef = useRef(null);

  useEffect(() => {
    // Replace tokens in content when fields change. Preserve other user edits by replacing tokens only.
    setContent((prev) => {
      let next = prev || defaultTemplate;
      next = next.replace(/{{\s*issue_date\s*}}/g, field1);
      next = next.replace(/{{\s*subject\s*}}/g, field2);
      next = next.replace(/{{\s*extra\s*}}/g, field3);
      return next;
    });
  }, [field1, field2, field3]);

  const handleContentChange = () => {
    if (!editableRef.current) return;
    setContent(editableRef.current.innerText);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Send to dummy API to simulate persistence. We'll POST to /posts with committeeId and certificate payload.
      const payload = {
        committeeId,
        title: field2,
        body: content,
        meta: { field1, field2, field3 },
      };
      const resp = await axios.post(API_URL + '/posts', payload);
      setSavedAt(new Date().toISOString());
      setEditing(false);
      // note: jsonplaceholder returns id but does not persist — we keep local state.
    } catch (err) {
      console.error('Failed to save certificate', err);
      alert('Failed to save certificate (dummy API)');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    // revert content to template with current fields
    setContent(defaultTemplate.replace(/{{\s*issue_date\s*}}/g, field1).replace(/{{\s*subject\s*}}/g, field2).replace(/{{\s*extra\s*}}/g, field3));
    setEditing(false);
  };

  return (
    <div className="mb-4">
      <div className="row g-3 mb-3">
        <div className="col-12">
          <div className="card shadow-sm p-3">
            <div className="row align-items-center d-print-none">
                <div className="col-md-4 mb-2 mb-md-0">
                  <div className="p-2 rounded border bg-white">
                    <div className="small text-muted">Extra</div>
                    <input className="form-control form-control-sm fw-semibold" value={field3} onChange={(e) => setField3(e.target.value)} />
                  </div>
                </div>
                <div className="col-md-4 mb-2 mb-md-0">
                  <div className="p-2 rounded border bg-white">
                    <div className="small text-muted">Subject</div>
                    <input className="form-control form-control-sm fw-semibold" value={field2} onChange={(e) => setField2(e.target.value)} />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="p-2 rounded border bg-white">
                    <div className="small text-muted">Issue Date</div>
                    <input className="form-control form-control-sm fw-semibold" value={field1} onChange={(e) => setField1(e.target.value)} />
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-end align-items-center mb-2 d-print-none">
        <button className="btn btn-sm btn-outline-primary me-2" onClick={() => { setEditing(true); editableRef.current?.focus(); }}>Edit Text</button>
        <button className="btn btn-sm btn-success me-2" onClick={handleSave} disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
        <button className="btn btn-sm btn-secondary" onClick={handleCancel}>Cancel</button>
      </div>

      {/* Screen editor: textarea (hidden when printing) */}
      <textarea
        ref={editableRef}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="form-control rounded p-3 mb-2 d-print-none"
        style={{ minHeight: 160, textAlign: 'left', whiteSpace: 'pre-wrap', lineHeight: 1.6 }}
      />

      {/* Print-only formatted view: shows the fields and justified content */}
      <div className="d-none d-print-block">
        <CertificateHeader field1={field1} field2={field2} field3={field3} />
        <div style={{ textAlign: 'justify', whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>{content}</div>
      </div>

      {savedAt && <div className="text-muted small mt-2">Last saved: {new Date(savedAt).toLocaleString()}</div>}
    </div>
  );
}
