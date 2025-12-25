"use client";

import { useMemo, useState } from "react";
import { Settings, FileSpreadsheet } from "lucide-react";
import PlanForm from "./PlanForm";
import { useWards } from "@/hook/useWards";
import { PlanListHeader } from "./planListHeader";
import { Edit2, Trash2, MoreHorizontal, Users, FileText, CreditCard, Lock } from 'lucide-react';
import ListDataTableCommon from "../common/table";
import { RowActions } from "../common/rowActions";

export default function PlanList({ loading, error, data, onSuccess }) {
  const [openActionId, setOpenActionId] = useState(null);
  const { ward, loading: wardLoading } = useWards();
  const [wardFilter, setWardFilter] = useState("");
  const [nameFilter, setnameFilter] = useState("");

  const PlanActions = [
      { label: 'Members', icon: Users, handler: (row) => onAction('members', row) },
      { label: 'Certificate', icon: FileText, handler: (row) => onAction('certificate', row) },
      { label: 'Account Open', icon: CreditCard, handler: (row) => onAction('account_open', row) },
      { label: 'Account Closed', icon: Lock, handler: (row) => onAction('account_closed', row) },
      { label: 'Edit', icon: Edit2, handler: '' },
      {
        label: 'Delete',
        icon: Trash2,
        danger: true,
        confirm: (row) => `Are you sure you want to delete ${row.name}?`,
        handler: (row) => onDelete(row.id),
      },
    ];

    const PlanColumns = [
      {
        id:'serial_number',
        label:'क्र.स',
        render: (row, index) => index + 1,
      },
      {
        id:'registration_number',
        label:'दर्ता.नं',
        key:'registration_number'
      },
      {
        id:'plan_name',
        label:'आयोजनाको नाम',
        key:'plan_name'
      },
      {
        id:'ward_number',
        label:'वडा नं ',
        key: 'ward_number'
      },
      {
        id:'location',
        label:'स्थान',
        key:'location'
      },
      {
        id:'allocated_budget',
        label:'विनियोजित बजेट ',
        key:'allocated_budget'
      },
      {
        id:'implementation_level',
        label:'कार्यान्वयनको तह ',
        key:'implementation_level'
      },
      {
        id:'implementation_status',
        label:'योजना अवस्था ',
        key:'implementation_status'
      },
      {
        id:'date',
        label:'मिति ',
        key:'date'
      },
      {
        id: "actions",
        label: "⚙️कार्य",
        render: (row) => <RowActions row={row} actions={PlanActions} />,
      },
    ]

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
      <ListDataTableCommon columns={PlanColumns} data={filteredData} />
    </div>
  );
}
