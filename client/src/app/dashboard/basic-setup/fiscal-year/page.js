"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import FiscalYearForm from "@/components/fiscal-year/FiscalYearForm";
import FiscalYearList from "@/components/fiscal-year/FiscalYearList";
import { PlusCircle } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://jsonplaceholder.typicode.com";
const USING_DUMMY = !process.env.NEXT_PUBLIC_API_URL;

function mapToFiscal(p, idx) {
  // Map dummy post/user to a fiscal year-like object
  const baseYear = 2018 + (p.id % 8);
  const fy = `${baseYear}/${baseYear + 1}`;
  const start_date = `${baseYear}-07-16`;
  const end_date = `${baseYear + 1}-07-15`;
  return {
    id: p.id,
    fiscal_year: p.title ? p.title.slice(0, 20) : fy,
    start_date,
    end_date,
  };
}

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
      const resp = await axios.get(API_URL + "/posts");
      const mapped = resp.data.slice(0, 10).map(mapToFiscal);
      setItems(mapped);
    } catch (err) {
      console.error(err);
      setError("Failed to load fiscal years");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (data) => {
    try {
      setError("");
      if (editing) {
        await axios.put(API_URL + `/posts/${editing.id}`, data);
        setItems((prev) => prev.map((it) => (it.id === editing.id ? { ...it, ...data } : it)));
        setSuccess("Fiscal year updated (dummy API)");
      } else {
        const resp = await axios.post(API_URL + "/posts", data);
        const newId = resp.data.id || Date.now();
        const newItem = { id: newId, ...data };
        setItems((prev) => [newItem, ...prev]);
        setSuccess("Fiscal year created (dummy API)");
      }
      if (!USING_DUMMY) await fetchItems();
      setShowForm(false);
      setEditing(null);
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error(err);
      setError("Failed to save fiscal year");
    }
  };

  const handleEdit = (it) => {
    setEditing(it);
    setShowForm(true);
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(API_URL + `/posts/${id}`);
      setItems((prev) => prev.filter((i) => i.id !== id));
      setSuccess("Fiscal year deleted (dummy API)");
      if (!USING_DUMMY) await fetchItems();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error(err);
      setError("Failed to delete fiscal year");
    }
  };

  return (
    <div className="p-4">
      <div className="card shadow-sm">
        <div className="card-header bg-light border-bottom">
          <h5 className="mb-0">Fiscal Year Management</h5>
        </div>
        <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

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
                      <h6 className="mb-0">{editing ? 'Edit Fiscal Year' : 'Add New Fiscal Year'}</h6>
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
                        setShowForm(false);
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

          <h6 className="mb-3">List</h6>
          {loading ? (
            <div className="text-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <FiscalYearList items={items} onEdit={handleEdit} onDelete={handleDelete} />
          )}
        </div>
      </div>
    </div>
  );
}
