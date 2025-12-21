// src/hooks/useOffice.js
"use client";
import { useSelector } from "react-redux";
import {
  selectOffice,
  selectGlobalLoading,
} from "@/redux/slices/globalSlice";

export const useOffice = () => {
  const office = useSelector(selectOffice);
  const loading = useSelector(selectGlobalLoading);

  return { office, loading };
};
