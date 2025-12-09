'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import CommitteeTypeForm from '@/components/committee-type/CommitteeTypeForm';
import CommitteeTypeList from '@/components/committee-type/CommitteeTypeList';
import { PlusCircle } from 'lucide-react';

// Use a dummy public API when NEXT_PUBLIC_API_URL is not provided.
// You can switch back to your DRF API by setting `NEXT_PUBLIC_API_URL` in your .env.
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://jsonplaceholder.typicode.com';
const USING_DUMMY = !process.env.NEXT_PUBLIC_API_URL;

export default function CommitteeTypePage() {
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingType, setEditingType] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchTypes();
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setShowForm(false);
        setEditingType(null);
      }
    };
    if (showForm) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showForm]);

  const fetchTypes = async () => {
    try {
      setLoading(true);
      // jsonplaceholder doesn't have committee-types, use /users as dummy data
      const response = await axios.get(API_URL + '/users');
      // Map the dummy API shape to the committee type shape expected by the UI
      const mapped = response.data.map((u) => ({
        id: u.id,
        name: u.name || u.username || `User ${u.id}`,
        name_eng: u.username || u.email || `user_${u.id}`,
        committee_type_code: `CT${String(u.id).padStart(3, '0')}`,
      }));
      setTypes(mapped);
    } catch (err) {
      console.error('Error fetching committee types:', err);
      setError('Failed to load committee types');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (typeData) => {
    try {
      setError(''); // Clear previous errors
      if (editingType) {
        // Update against dummy endpoint (jsonplaceholder will accept and respond,
        // but won't persist). We still update local state so the UI reflects changes.
        await axios.put(API_URL + `/users/${editingType.id}`, typeData);
        setTypes((prev) => prev.map((t) => (t.id === editingType.id ? { ...t, ...typeData } : t)));
        setSuccessMessage('Committee type updated (dummy API)');
      } else {
        const resp = await axios.post(API_URL + '/users', typeData);
        // jsonplaceholder returns an object with an id (usually 101)
        const newId = resp.data.id || Date.now();
        const newItem = { id: newId, ...typeData, committee_type_code: typeData.committee_type_code || `CT${String(newId).slice(-3)}` };
        setTypes((prev) => [newItem, ...prev]);
        setSuccessMessage('Committee type created (dummy API)');
      }
      if (!USING_DUMMY) await fetchTypes();
      setShowForm(false);
      setEditingType(null);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      let errorMsg = 'Failed to save committee type';
      
      // Handle API errors
      if (err.response && err.response.data) {
        const responseData = err.response.data;
        const errorMessages = [];
        
        // Check for specific field errors (from DRF validation)
        if (responseData.name) {
          const nameError = Array.isArray(responseData.name) ? responseData.name[0] : responseData.name;
          errorMessages.push(`Name: ${nameError}`);
        }
        if (responseData.name_eng) {
          const nameEngError = Array.isArray(responseData.name_eng) ? responseData.name_eng[0] : responseData.name_eng;
          errorMessages.push(`Name (English): ${nameEngError}`);
        }
        if (responseData.committee_type_code) {
          const codeError = Array.isArray(responseData.committee_type_code) ? responseData.committee_type_code[0] : responseData.committee_type_code;
          errorMessages.push(`Code: ${codeError}`);
        }
        if (responseData.detail) {
          errorMessages.push(responseData.detail);
        }
        if (responseData.non_field_errors) {
          const nonFieldError = Array.isArray(responseData.non_field_errors) ? responseData.non_field_errors[0] : responseData.non_field_errors;
          errorMessages.push(nonFieldError);
        }
        
        // If we found specific error messages, use them
        if (errorMessages.length > 0) {
          errorMsg = errorMessages.join(' | ');
        } else if (typeof responseData === 'string') {
          errorMsg = responseData;
        }
      } else if (err.message) {
        errorMsg = `Error: ${err.message}`;
      }
      
      setError(errorMsg);
    }
  };

  const handleEdit = (type) => {
    setEditingType(type);
    setShowForm(true);
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id) => {
    try {
      // Delete against dummy endpoint and update local state
      await axios.delete(API_URL + `/users/${id}`);
      setTypes((prev) => prev.filter((t) => t.id !== id));
      setSuccessMessage('Committee type deleted (dummy API)');
      if (!USING_DUMMY) await fetchTypes();
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      console.error('Error deleting committee type:', err);
      setError('Failed to delete committee type');
    }
  };

  const handleCancel = () => {
    setEditingType(null);
    setShowForm(false);
  };

  return (
    <div className="p-4">
      <div className="card shadow-sm" style={{ borderRadius: '8px' }}>
        <div className="card-header bg-light border-bottom">
          <h5 className="mb-0 text-dark fw-bold">📋 Committee Type Management</h5>
        </div>

        <div className="card-body">
          {error && (
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
              <strong>Error:</strong> {error}
              <button
                type="button"
                className="btn-close"
                onClick={() => setError('')}
              ></button>
            </div>
          )}

          {successMessage && (
            <div className="alert alert-success alert-dismissible fade show" role="alert">
              <strong>Success:</strong> {successMessage}
              <button
                type="button"
                className="btn-close"
                onClick={() => setSuccessMessage('')}
              ></button>
            </div>
          )}

          <div className="d-flex justify-content-between align-items-center mb-3">
            <h6 className="mb-0">Committee Types</h6>
            <button
              className="btn btn-primary d-flex align-items-center"
              onClick={() => {
                setEditingType(null);
                setShowForm(true);
              }}
            >
              <PlusCircle size={18} className="me-2" /> Add Committee Type
            </button>
          </div>

          {/* Popup form with backdrop */}
          {showForm && (
            <div>
              <div
                className="position-fixed top-0 start-0 w-100 h-100"
                style={{ background: 'rgba(0,0,0,0.35)', zIndex: 2990 }}
                onClick={() => {
                  setShowForm(false);
                  setEditingType(null);
                }}
                aria-hidden
              />

              <div
                style={{ zIndex: 3000 }}
                className="position-fixed top-50 start-50 translate-middle"
              >
                <div className="card shadow" style={{ minWidth: 420 }}>
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h6 className="mb-0">{editingType ? 'Edit Committee Type' : 'Add New Committee Type'}</h6>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={() => {
                          setShowForm(false);
                          setEditingType(null);
                        }}
                      />
                    </div>
                    <CommitteeTypeForm
                      onSubmit={async (data) => {
                        await handleSave(data);
                        setShowForm(false);
                      }}
                      initialData={editingType}
                      onCancel={() => {
                        setShowForm(false);
                        setEditingType(null);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          <hr className="my-4" />

          <h6 className="mb-3 fw-bold">📊 Committee Types List</h6>
          {loading ? (
            <div className="text-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <CommitteeTypeList types={types} onEdit={handleEdit} onDelete={handleDelete} />
          )}
        </div>
      </div>
    </div>
  );
}
