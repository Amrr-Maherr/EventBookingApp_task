import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch events
export const fetchEvents = createAsyncThunk(
  "events/fetchEvents",
  async () => {
    try {
      const response = await axios.get(
        "https://68f8b804deff18f212b739d5.mockapi.io/api/v1/events"
      );
      return response.data;
    } catch (error: any) {
      return error.message;
    }
  }
);

const eventsSlice = createSlice({
  name: "events",
  initialState: {
    events: [] as any[],
    loading: true,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default eventsSlice.reducer;
