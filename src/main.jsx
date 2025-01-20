import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./assets/styles/index.css";
import { Provider } from "react-redux";
import store from "./app/store.jsx";

createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<StrictMode>
			<App />
		</StrictMode>
	</Provider>,
);
