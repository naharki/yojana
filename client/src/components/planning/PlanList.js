"use client";

import { useMemo, useState } from "react";
import { Settings, FileSpreadsheet } from "lucide-react";
import PlanForm from "./PlanForm";
import { useWards } from "@/hook/useWards";
import { PlanListHeader } from "./planListHeader";
import { Edit2, Trash2, MoreHorizontal, Users, FileText, CreditCard, Lock } from 'lucide-react';


const API_BASE = process.env.NEXT_PUBLIC_API_URL;
export default function PlanList({ loading, error, data, onSuccess }) {
  const [openActionId, setOpenActionId] = useState(null);
  const { ward, loading: wardLoading } = useWards();
  const [wardFilter, setWardFilter] = useState("");
  const [nameFilter, setnameFilter] = useState("");
  const [openId, setOpenId] = useState(null)

  const filteredData = useMemo(() => {
    return data.filter((plan) => {
      const matchesWard = wardFilter ? plan.ward_number === wardFilter : true;
      const matchesName = plan.plan_name
        .toLowerCase()
        .includes(nameFilter.toLowerCase());
      return matchesWard && matchesName;
    });
  }, [data, wardFilter, nameFilter]);
  const handleResetFilters = () => {
    setWardFilter("");
    setnameFilter("");
  };

  return (
    <div className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">योजनाहरू (Plans)</h4>
      </div>

      <PlanListHeader
        onSuccess={onSuccess}
        data={data}
        ward={ward}
        onApplyWard={setWardFilter}
        filterData={filteredData}
        setnameFilter={setnameFilter}
        nameFilter={nameFilter}
        onReset={handleResetFilters}
      />

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
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={10} className="text-center text-muted">
                    No results. Use filters and click Apply to load plans.
                  </td>
                </tr>
              ) : (
                filteredData.map((plan, index) => (
                  <tr key={plan.id}>
                    <td>{index + 1}</td>
                    <td>{plan.registration_number}</td>
                    <td>{plan.plan_name}</td>
                    <td>{plan.ward_number}</td>
                    <td>{plan.location}</td>
                    <td>{plan.allocated_budget}</td>
                    <td>{plan.implementation_level}</td>
                    <td><span className="badge bg-primary">{plan.implementation_status}</span></td>
                    <td>{plan.date}</td>
                    {/* tsting */}
                       <td>
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <button className="btn btn-sm btn-outline-secondary" onClick={() => setOpenId(openId === plan.id ? null : plan.id)} title="Actions">
                    <MoreHorizontal size={16} />
                  </button>

                  {openId === plan.id && (
                    <div className="card shadow-sm p-2" style={{ position: 'absolute', right: '110%', top: 0, minWidth: 200, zIndex: 2000 }}>
                      <button className="btn btn-sm btn-light d-flex align-items-center w-100 mb-1" onClick={() => { setOpenId(null); onAction('members', plan); }}>
                        <Users size={14} className="me-2"/> Members
                      </button>
                      <button className="btn btn-sm btn-light d-flex align-items-center w-100 mb-1" onClick={() => { setOpenId(null); onAction('certificate', plan); }}>
                        <FileText size={14} className="me-2"/> Certificate
                      </button>
                      <button className="btn btn-sm btn-light d-flex align-items-center w-100 mb-1" onClick={() => { setOpenId(null); onAction('account_open', plan); }}>
                        <CreditCard size={14} className="me-2"/> Account Open
                      </button>
                      <button className="btn btn-sm btn-light d-flex align-items-center w-100 mb-1" onClick={() => { setOpenId(null); onAction('account_closed', plan); }}>
                        <Lock size={14} className="me-2"/> Account Closed
                      </button>
                      <hr className="my-1" />
                      <button className="btn btn-sm btn-light d-flex align-items-center w-100 mb-1" onClick={() => { setOpenId(null); onEdit(plan); }}>
                        <Edit2 size={14} className="me-2"/> Edit
                      </button>
                      <button className="btn btn-sm btn-danger d-flex align-items-center w-100" onClick={() => { setOpenId(null); if (confirm('Are you sure you want to delete this committee?')) onDelete(plan.id); }}>
                        <Trash2 size={14} className="me-2"/> Delete
                      </button>
                    </div>
                  )}
                </div>
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
