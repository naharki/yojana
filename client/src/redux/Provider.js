// src/redux/Providers.js
"use client";

import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { useEffect } from "react";
import { loadGlobalOffice } from "@/redux/loadGlobalData";

export default function Providers({ children }) {
  useEffect(() => {
    loadGlobalOffice();
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
