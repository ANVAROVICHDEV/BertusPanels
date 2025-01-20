import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null, // Inputning boshlang'ich qiymati null
};

const inputSlice = createSlice({
  name: "input",
  initialState,
  reducers: {
    setInputValue: (state, action) => {
      state.value = action.payload; // Yangi qiymatni saqlaydi
    },
    clearInputValue: (state) => {
      state.value = null; // Inputni tozalash
    },
  },
});

export const { setInputValue, clearInputValue } = inputSlice.actions;
export default inputSlice.reducer;
