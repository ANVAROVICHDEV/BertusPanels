import { configureStore } from "@reduxjs/toolkit";
import  authSlice  from "../slices/auth";
import dateReducer from "../slices/dataSlice"
import renderPage from "../slices/renderPage"
import inputReducer from "../slices/getInputType"
export default configureStore({
	reducer: {
        auth: authSlice,
        date: dateReducer,
        render: renderPage,
        input: inputReducer
    },
});