"use client";

import { useRef, useState, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import { useParams } from 'next/navigation';
import axios from 'axios';
import Header from "@/components/certificate/letter_head";
import DataTable from "@/components/certificate/certificate_table";
import SignatureCao from "@/components/certificate/signature";
import CertificateEditor from '@/components/certificate/CertificateEditor';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://jsonplaceholder.typicode.com';

export default function PrintPage() {
  const params = useParams();
  const committeeId = params?.id;
  const printRef = useRef();
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    if (!committeeId) return;
    // fetch dummy certificate data (map from post)
    (async () => {
      try {
        const resp = await axios.get(API_URL + `/posts/${committeeId}`);
        const data = resp.data || {};
        const initial = {
          field1: new Date().toLocaleDateString(),
          field2: data.title || `Certificate for Committee ${committeeId}`,
          field3: 'Details',
          content: data.body || null,
          savedAt: null,
        };
        setInitialData(initial);
      } catch (err) {
        console.error('Failed to load certificate data', err);
        setInitialData({ field1: new Date().toLocaleDateString(), field2: `Certificate for Committee ${committeeId}`, field3: 'Details', content: null });
      }
    })();
  }, [committeeId]);

  const handlePrint = useReactToPrint({
    // Provide both `content` callback and `contentRef` for compatibility
    content: () => printRef.current,
    contentRef: printRef,
    documentTitle: "Certificate",
  });

  return (
    <div className="container mt-5">

      <h2 className="mb-3">Print Example Page</h2>

      {/* Print Button */}
      <button 
        className="btn btn-primary mb-4 d-print-none"
        onClick={handlePrint}
      >
        Print Page
      </button>

      {/* PRINTABLE AREA */}
      <div ref={printRef} className="border rounded p-4 print-area no-print-border">

        {/* HEADER COMPONENT */}
        <Header />

        {/* CONTENT BELOW HEADER */}
        <h3 className="text-center mb-3">Predefined Data</h3>

        {/* Certificate editor shows three editable rows and an editable justified content area */}
        <CertificateEditor committeeId={committeeId} initialData={initialData} />

        <DataTable/>

        <div className="mt-4">
         <SignatureCao />
        </div>
      </div>

      {/* print styles: hide chrome and remove borders when printing */}
      <style>{`
        @media print {
          .d-print-none { display: none !important; }
          .no-print-border { border: none !important; box-shadow: none !important; }
          body * { visibility: visible; }
          /* make only the print area visible (better ensure minimal chrome) */
          .no-print-border, .no-print-border * { visibility: visible; }
        }
      `}</style>
    </div>
  );
}