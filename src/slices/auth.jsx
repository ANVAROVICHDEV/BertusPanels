import { createSlice } from "@reduxjs/toolkit";
import { setItem , removeItem} from "../helpers/persistanse-storage";

const initialState = {
	isLoading: false,
	loggedIn: false,
	user: null,
	error: null,
	role:null
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		loginUserStart: (state) => {
			state.isLoading = true;
		},
		loginUserSuccess: (state, actions) => {
			state.isLoading = false;
			state.loggedIn = true;
			state.role =actions.payload.role
			state.user = actions.payload;
			setItem("access_token", actions.payload.access_token);
			setItem("refresh_token", actions.payload.refresh_token);
			setItem("access_token_expires_in", actions.payload.access_token_expires_in);
			setItem("refresh_token_expires_in", actions.payload.refresh_token_expires_in);
		},
		loginUserFailture: (state, actions) => {
			state.isLoading = false;
			state.error = actions.payload;
		},

		logoutUser: (state) => {
			state.user = null;
			state.loggedIn = false;

			 // LocalStorage'dagi barcha token va vaqtni o'chirish
			removeItem("access_token");
			removeItem("refresh_token");
			removeItem("access_token_expires_in");
			removeItem("refresh_token_expires_in");
		},
	},
});
export const {
	loginUserStart,
	loginUserSuccess,
	loginUserFailture,
	logoutUser,
} = authSlice.actions;

export default authSlice.reducer;
