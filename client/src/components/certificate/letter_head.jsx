"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function Header() {
  const [officeData, setOfficeData] = useState({
    name: "Loading...",
    office: "Loading...",
    location: "Loading...",
    logoLeft:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png",
    logoRight:
     "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png",
  });

  useEffect(() => {
    // Dummy API (replace later with actual API)
    axios
      .get("https://jsonplaceholder.typicode.com/users/1")
      .then((res) => {
        const data = res.data;
        setOfficeData((prev) => ({
          ...prev,
          name: data.company.name || "Office Name",
          office: data.name || "Office Name",
          location: data.address.city || "City, Country",
        }));
      })
      .catch((err) => console.error("Failed to fetch office data", err));
  }, []);

  return (
    <div
      className="d-flex align-items-center justify-content-between mb-4 pb-3 border-bottom"
      style={{ padding: "0 40px" }} // spacing left and right ~1 inch
    >
      {/* Left Logo */}
      <img
        src={officeData.logoLeft}
        alt="Office Logo"
        style={{
          width: "80px",
          height: "80px",
          objectFit: "cover",
        }}
      />

      {/* Center Text */}
      <div className="text-center flex-grow-1 mx-3">
        <h2 className="mb-0">{officeData.name}</h2>
        <p className="mb-0">{officeData.office}</p>
        <p className="mb-0">{officeData.location}</p>
      </div>

      {/* Right Logo / QR */}
      <img
        src={officeData.logoRight}
        alt="QR Code"
        style={{
          width: "80px",
          height: "80px",
          objectFit: "cover",
        }}
      />
    </div>
  );
}