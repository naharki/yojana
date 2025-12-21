// src/redux/loadGlobalData.js
import { fetchGlobalOffice } from "./slices/globalSlice";
import { store } from "./store";

/**
 * Load global office only once
 */
export const loadGlobalOffice = () => {
  const { loaded, loading } = store.getState().global;

  if (!loaded && !loading) {
    store.dispatch(fetchGlobalOffice());
  }
};
