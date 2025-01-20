import { MainReport, AllReport, Header, Loader } from "../index";
import { BACKGROUNDS } from "../constants/images";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { refreshData } from "../slices/dataSlice";

const HomePage = () => {
	const dispatch = useDispatch();
	const { startDate, endDate, mainReport, loading, error } = useSelector(
		(state) => state.date,
	);

	useEffect(() => {
		dispatch(refreshData({ startDate, endDate }));

	}, [startDate, endDate, dispatch]);

	return (
		<div
			className="w-full h-full bg-cover bg-center"
			style={{ backgroundImage: `url(${BACKGROUNDS.MAIN})` }}
		>
			{loading ? (
				<Loader />
			) : error ? (
				<p>Xatolik: {error}</p>
			) : (
				<>
					<Header />
					<MainReport />
					<AllReport mainReport={mainReport} />
				</>
			)}
		</div>
	);
};

export default HomePage;
