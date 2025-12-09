"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import WardForm from "@/components/ward/WardForm";
import WardList from "@/components/ward/WardList";
import { PlusCircle } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://jsonplaceholder.typicode.com";
const USING_DUMMY = !process.env.NEXT_PUBLIC_API_URL;

function mapToWard(p) {
  return {
    id: p.id,
    name: p.title ? p.title.slice(0, 30) : `Ward ${p.id}`,
    code: `W${String(p.id).padStart(3, '0')}`,
  };
}

export default function WardPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const resp = await axios.get(API_URL + "/posts");
      const mapped = resp.data.slice(0, 10).map(mapToWard);
      setItems(mapped);
    } catch (err) {
      console.error(err);
      setError("Failed to load wards");
    } finally {
      setLoading(false);
    }
  };

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

  const handleSave = async (data) => {
    try {
      setError("");
      if (editing) {
        await axios.put(API_URL + `/posts/${editing.id}`, data);
        setItems((prev) => prev.map((it) => (it.id === editing.id ? { ...it, ...data } : it)));
        setSuccess("Ward updated (dummy API)");
      } else {
        const resp = await axios.post(API_URL + "/posts", data);
        const newId = resp.data.id || Date.now();
        const newItem = { id: newId, ...data, code: data.code || `W${String(newId).slice(-3)}` };
        setItems((prev) => [newItem, ...prev]);
        setSuccess("Ward created (dummy API)");
      }
      if (!USING_DUMMY) await fetchItems();
      setShowForm(false);
      setEditing(null);
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error(err);
      setError("Failed to save ward");
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
      setSuccess("Ward deleted (dummy API)");
      if (!USING_DUMMY) await fetchItems();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error(err);
      setError("Failed to delete ward");
    }
  };

  return (
    <div className="p-4">
      <div className="card shadow-sm">
        <div className="card-header bg-light border-bottom">
          <h5 className="mb-0">Wards</h5>
        </div>
        <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <div className="d-flex justify-content-between align-items-center mb-3">
            <h6 className="mb-0">Ward List</h6>
            <button
              className="btn btn-primary d-flex align-items-center"
              onClick={() => {
                setEditing(null);
                setShowForm(true);
              }}
            >
              <PlusCircle size={18} className="me-2" /> Add Ward
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
                      <h6 className="mb-0">{editing ? 'Edit Ward' : 'Add New Ward'}</h6>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={() => {
                          setShowForm(false);
                          setEditing(null);
                        }}
                      />
                    </div>
                    <WardForm
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

          {loading ? (
            <div className="text-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <WardList items={items} onEdit={handleEdit} onDelete={handleDelete} />
          )}
        </div>
      </div>
    </div>
  );
}
