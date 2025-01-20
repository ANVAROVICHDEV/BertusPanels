// src/store/advanceSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allAdvance: null,
  search: 0,
  type: 'advance',
};

const advanceSlice = createSlice({
  name: 'advance',
  initialState,
  reducers: {
    setAllAdvance: (state, action) => {
      state.allAdvance = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setType: (state, action) => {
      state.type = action.payload;
    },
  },
});

export const { setAllAdvance, setSearch, setType } = advanceSlice.actions;
export default advanceSlice.reducer;
