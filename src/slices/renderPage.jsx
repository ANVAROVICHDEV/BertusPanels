import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	refreshRenderData: false,
};

export const renderPage = createSlice({
	name: "renderPage",
	initialState,
	reducers: {
		setRefreshRenderData: (state) => {
			state.refreshRenderData = !state.refreshRenderData;
		},
	},
});
export const { setRefreshRenderData } = renderPage.actions;

export default renderPage.reducer;
