"use client";

import { useState } from "react";
import { Settings, FileSpreadsheet } from "lucide-react";
import PlanForm from "./PlanForm";
import { FileImport } from "./fileimport";
import { FileExport } from "./FileExport";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;
export default function PlanList({ loading, error, data, onSuccess }) {
  const [openActionId, setOpenActionId] = useState(null);
  return (
    <div className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">योजनाहरू (Plans)</h4>
      </div>

      <div className="row mb-3 align-items-center">
        <div className="col-md-3 mb-2">
          <input placeholder="Filter by वडा नं" className="form-control" />
        </div>
        <div className="col-md-4 mb-2">
          <input placeholder="Filter by योजनाको नाम" className="form-control" />
        </div>
        <div className="col-md-5 mb-2 d-flex justify-content-end flex-nowrap">
          <button className="btn btn-sm btn-primary me-2">Apply</button>
          <button className="btn btn-sm btn-outline-secondary me-2">
            Reset
          </button>
          <FileImport onSuccess={onSuccess} />
          <FileExport />
        </div>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-sm table-bordered">
            <thead>
              <tr>
                <th>क्र.स</th>
                <th>दर्ता नं </th>
                <th>आयोजनाको नाम</th>
                <th>वडा नं</th>
                <th>स्थान</th>
                <th> विनियोजित बजेट</th>
                <th>कार्यान्वयनको तह</th>
                <th>योजना अवस्था</th>
                <th>मिति</th>
                <th>कार्य</th>
              </tr>
            </thead>

            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan={10} className="text-center text-muted">
                    No results. Use filters and click Apply/Search to load
                    plans.
                  </td>
                </tr>
              ) : (
                data.map((plan, index) => (
                  <tr key={plan.id}>
                    <td>{index + 1}</td>
                    <td>{plan.registration_number}</td>
                    <td>{plan.plan_name}</td>
                    <td>{plan.ward_number}</td>
                    <td>{plan.location}</td>
                    <td>{plan.allocated_budget}</td>
                    <td>{plan.implementation_level}</td>
                    <td>{plan.implementation_status}</td>
                    <td>{plan.date}</td>
                    <td style={{ position: 'relative', width: 80 }}>
                      <div className="d-flex align-items-center justify-content-center">
                        <button title="Actions" className="btn btn-sm btn-light p-1" onClick={() => setOpenActionId(openActionId === plan.id ? null : plan.id)} style={{ borderRadius: 6 }}>
                          <Settings size={16} />
                        </button>
                      </div>

                      {openActionId === plan.id && (
                        <div className="position-absolute bg-white border rounded shadow-sm" style={{ right: 8, top: '110%', zIndex: 2000, minWidth: 140 }}>
                          <div className="p-2">
                            <button className="w-100 btn btn-sm btn-link text-start" onClick={() => { setOpenActionId(null); handleEdit(plan); }}>
                              Edit
                            </button>
                            <button className="w-100 btn btn-sm btn-link text-start text-danger" onClick={() => { setOpenActionId(null); handleDelete(plan.id); }}>
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                      </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
