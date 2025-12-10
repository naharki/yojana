"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import FiscalYearForm from "@/components/fiscal-year/FiscalYearForm";
import FiscalYearList from "@/components/fiscal-year/FiscalYearList";
import { PlusCircle } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function FiscalYearPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchItems();
  }, []);

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setShowForm(false);
        setEditing(null);
      }
    };
    if (showForm) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showForm]);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const resp = await axios.get(API_URL + "/fiscalyears/");
      // API returns { success, count, data: [...] }
      setItems(resp.data.data || []);
    } catch (err) {
      console.error("Error fetching fiscal years:", err);
      setError("Failed to load fiscal years");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (data) => {
    try {
      setError("");
      if (editing) {
        // PUT request for update
        await axios.put(API_URL + `/fiscalyears/${editing.id}/`, data);
        setSuccess("Fiscal year updated successfully");
      } else {
        // POST request for create
        await axios.post(API_URL + "/fiscalyears/", data);
        setSuccess("Fiscal year created successfully");
      }
      await fetchItems();
      setShowForm(false);
      setEditing(null);
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("Error saving fiscal year:", err);
      // Handle validation errors from API
      if (err.response?.data) {
        const errorData = err.response.data;
        if (typeof errorData === 'object') {
          const messages = Object.entries(errorData)
            .map(([key, val]) => `${key}: ${Array.isArray(val) ? val[0] : val}`)
            .join(", ");
          setError(messages);
        } else {
          setError(errorData);
        }
      } else {
        setError("Failed to save fiscal year");
      }
    }
  };

  const handleEdit = (it) => {
    setEditing(it);
    setShowForm(true);
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this fiscal year?")) return;
    try {
      await axios.delete(API_URL + `/fiscalyears/${id}/`);
      setSuccess("Fiscal year deleted successfully");
      await fetchItems();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("Error deleting fiscal year:", err);
      setError("Failed to delete fiscal year");
    }
  };

  return (
    <div className="p-4">
      <div className="card shadow-sm">
        <div className="card-header bg-light border-bottom">
          <h5 className="mb-0">📅 Fiscal Year Management</h5>
        </div>
        <div className="card-body">
          {error && (
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
              <strong>Error:</strong> {error}
              <button
                type="button"
                className="btn-close"
                onClick={() => setError("")}
              ></button>
            </div>
          )}
          {success && (
            <div className="alert alert-success alert-dismissible fade show" role="alert">
              <strong>Success:</strong> {success}
              <button
                type="button"
                className="btn-close"
                onClick={() => setSuccess("")}
              ></button>
            </div>
          )}

          <div className="d-flex justify-content-between align-items-center mb-3">
            <h6 className="mb-0">Fiscal Years</h6>
            <button
              className="btn btn-primary d-flex align-items-center"
              onClick={() => {
                setEditing(null);
                setShowForm(true);
              }}
            >
              <PlusCircle size={18} className="me-2" /> Add Fiscal Year
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
                  setEditing(null);
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
                      <h6 className="mb-0">{editing ? '✏️ Edit Fiscal Year' : '➕ Add New Fiscal Year'}</h6>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={() => {
                          setShowForm(false);
                          setEditing(null);
                        }}
                      />
                    </div>
                    <FiscalYearForm
                      onSubmit={async (data) => {
                        await handleSave(data);
                      }}
                      initialData={editing}
                      onCancel={() => {
                        setShowForm(false);
                        setEditing(null);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          <hr />

          <h6 className="mb-3">📊 Fiscal Years List</h6>
          {loading ? (
            <div className="text-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : items.length === 0 ? (
            <div className="alert alert-info">No fiscal years found. Create one to get started!</div>
          ) : (
            <FiscalYearList items={items} onEdit={handleEdit} onDelete={handleDelete} />
          )}
        </div>
      </div>
    </div>
  );
}
