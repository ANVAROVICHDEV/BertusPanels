import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
	HomePage,
	LoginPage,
	NotFound,
	IncomeInfo,
	PrivateRoute,
	OutcomeInfo,
	SalariesAdvance,
	ChopReport,
	WorkersPage,
	WorkerInfoPage,
	ScrollToTop,
	ChopWorkerSalaries,
} from "./index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "flowbite";
import "flowbite/dist/flowbite.min.css";


const App = () => {
	return (
		<div className="container mx-auto p-5">
			<Router>
				<ScrollToTop />
				<Routes>
					<Route path="/login" element={<LoginPage />} />
					<Route
						path="/"
						element={
							<PrivateRoute>
								<HomePage />
							</PrivateRoute>
						}
					/>
					<Route
						path="/income_info/:type"
						element={
							<PrivateRoute>
								<IncomeInfo />
							</PrivateRoute>
						}
					/>

					<Route
						path="/outcome_info/:type"
						element={
							<PrivateRoute>
								<OutcomeInfo />
							</PrivateRoute>
						}
					/>
					<Route
						path="/advance"
						element={
							<PrivateRoute>
								<SalariesAdvance />
							</PrivateRoute>
						}
					/>
					<Route
						path="/chop-report"
						element={
							<PrivateRoute>
								<ChopReport />
							</PrivateRoute>
						}
					/>
					<Route
						path="/workers"
						element={
							<PrivateRoute>
								<WorkersPage />
							</PrivateRoute>
						}
					/>

					<Route
						path="/workersInfo/:id"
						element={
							<PrivateRoute>
								<WorkerInfoPage />
							</PrivateRoute>
						}
					/>
					<Route
						path="/chop-worker-salaries"
						element={
							<PrivateRoute>
								<ChopWorkerSalaries />
							</PrivateRoute>
						}
					/>
					<Route path="*" element={<NotFound />} />
				</Routes>
				<ToastContainer position="top-right" autoClose={2000} />
			</Router>
		</div>
	);
};

export default App;
