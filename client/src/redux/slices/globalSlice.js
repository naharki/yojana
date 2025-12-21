// src/redux/slices/globalSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/api";

export const fetchGlobalOffice = createAsyncThunk(
  "global/fetchOffice",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("offices/");
      return response.data.data[0];
    } catch (err) {
      return rejectWithValue(
        err.response?.data || "Failed to load office data"
      );
    }
  }
);

const initialState = {
  office: null,
  loading: false,
  loaded: false,
  error: null,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    resetGlobalState(state) {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGlobalOffice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGlobalOffice.fulfilled, (state, action) => {
        state.loading = false;
        state.loaded = true;
        state.office = action.payload;
      })
      .addCase(fetchGlobalOffice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

/* ✅ SELECTORS (YOU WERE MISSING THIS) */
export const selectOffice = (state) => state.global.office;
export const selectGlobalLoading = (state) => state.global.loading;
export const selectGlobalLoaded = (state) => state.global.loaded;

export const { resetGlobalState } = globalSlice.actions;
export default globalSlice.reducer;
