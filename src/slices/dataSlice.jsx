import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import MoneyOperations from "../services/moneyOpeations";

function getDate(offset = 0) {
  const today = new Date();
  today.setDate(today.getDate() + offset);

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

// Asenkron thunk
export const refreshData = createAsyncThunk(
  "date/refreshData",
  async ({ startDate, endDate }, { rejectWithValue }) => {
    try {
      const response = await MoneyOperations.mainOperations(startDate, endDate);
      return response; // response-ni qaytarish
    } catch (error) {
      return rejectWithValue(error.message); // Xatolikni qaytarish
    }
  }
);


const initialState = {
  startDate: getDate(),
  endDate: getDate(1),
  mainReport: null,
  loading: false,
  error: null,
};
// dataSlice.js

const dateSlice = createSlice({
  name: "date",
  initialState,
  reducers: {
    setStartDate: (state, action) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action) => {
      state.endDate = action.payload;
    },
    setMainReport: (state, action) => {
      state.mainReport = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(refreshData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(refreshData.fulfilled, (state, action) => {
        state.loading = false;
        state.mainReport = action.payload;
      })
      .addCase(refreshData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setStartDate, setEndDate, setMainReport } = dateSlice.actions; // setMainReport ni eksport qilish
export default dateSlice.reducer;

