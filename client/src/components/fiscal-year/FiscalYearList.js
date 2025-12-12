"use client";

import { useState } from "react";
import { Edit2, Trash2, MoreHorizontal } from "lucide-react";

export default function FiscalYearList({ items, onEdit, onDelete }) {
  const [openId, setOpenId] = useState(null);

  if (!items || items.length === 0) {
    return (
      <div className="alert alert-info">
        <p className="mb-0">No fiscal years found. Add one to get started.</p>
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table table-hover table-striped">
        <thead className="table-light">
          <tr>
            <th style={{ width: "5%" }}>क्र.स</th> 
            <th style={{ width: "15%" }}>नाम</th> 
            <th style={{ width: "15%" }}>नाम अंग्रेजी</th>
            <th style={{ width: "10%" }}>कोड</th> 
            <th style={{ width: "10%" }}>सुरु बर्ष</th> 
            <th style={{ width: "10%" }}>अन्त्य बर्ष</th> 
            <th style={{ width: "15%" }}>मितिदेखि</th> 
            <th style={{ width: "15%" }}>मितिसम्म</th> 
            <th style={{ width: "5%" }}>कार्य</th> 
          </tr>
        </thead>
        <tbody>
          {items.map((it, index) => (
            <tr key={it.id} style={{ position: "relative" }}>
              <td>
                <strong>{index + 1}</strong>
              </td>
              <td>{it.name}</td>
              <td>{it.eng_name}</td>
              <td>{it.code}</td>
              <td>{it.start_year}</td>
              <td>{it.end_year}</td>
              <td>{it.start_date}</td>
              <td>{it.end_date}</td>
              <td>
                <div style={{ position: "relative", display: "inline-block" }}>
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => setOpenId(openId === it.id ? null : it.id)}
                    title="Actions"
                  >
                    <MoreHorizontal size={16} />
                  </button>

                  {openId === it.id && (
                    <div
                      className="card shadow-sm p-2"
                      style={{
                        position: "absolute",
                        right: "110%",
                        top: 0,
                        minWidth: "140px",
                        zIndex: 2000,
                      }}
                    >
                      <button
                        className="btn btn-sm btn-light d-flex align-items-center w-100 mb-1"
                        onClick={() => {
                          setOpenId(null);
                          onEdit(it);
                        }}
                      >
                        <Edit2 size={14} className="me-2" /> Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger d-flex align-items-center w-100"
                        onClick={() => {
                          setOpenId(null);
                          if (
                            confirm(
                              "Are you sure you want to delete this fiscal year?"
                            )
                          ) {
                            onDelete(it.id);
                          }
                        }}
                      >
                        <Trash2 size={14} className="me-2" /> Delete
                      </button>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
