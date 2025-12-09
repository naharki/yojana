import React from 'react';
import dynamic from 'next/dynamic';

const PlanList = dynamic(() => import('../../../../components/planning/PlanList'), { ssr: false });

export const metadata = {
  title: 'Plans - Dashboard',
};

export default function PlanPage() {
  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-12">
          <PlanList />
        </div>
      </div>
    </div>
  );
}
