import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchEventDetails = createAsyncThunk(
  "eventDetails/fetchEventDetails",
  async (id) => {
    try {
      const response = await axios.get(
        `https://68f8b804deff18f212b739d5.mockapi.io/api/v1/events/${id}`
      );
      return response.data;
    } catch (error: any) {
      return error.message;
    }
  }
);

const eventDetailsSlice = createSlice({
  name: "eventDetails",
  initialState: {
    event: null as any,
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEventDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEventDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.event = action.payload;
      })
      .addCase(fetchEventDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default eventDetailsSlice.reducer;
