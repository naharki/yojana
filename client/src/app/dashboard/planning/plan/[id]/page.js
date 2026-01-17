"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
// import WorkflowSteps from "@/components/planning/WorkflowSteps";

export default function PlanWorkflowPage() {
  const { id } = useParams();
  const [workflow, setWorkflow] = useState(null);

  useEffect(() => {
    // fetch workflow status from backend
    // example: /api/plans/{id}/workflow/
  }, []);

  return (
    <div className="p-4">
      <h4>Plan Workflow</h4>
      {/* {workflow && (
        <WorkflowSteps workflow={workflow} planId={id} />
      )} */}
      testing 
    </div>
  );
}
