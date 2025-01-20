import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { LOGOS, ICONS } from "../constants/images";
import LogoutButton from "../features/auth/LogoutButton";
import { setStartDate, setEndDate } from "../slices/dataSlice";
import MoneyOperations from "../services/moneyOpeations";
import Currencies from "./Currencies";

const Navbar = () => {
	const dispatch = useDispatch();
	const { startDate, endDate } = useSelector((state) => state.date);
	const [showCurrencies, setShowCurrencies] = useState(false);
	const [course, setCourse] = useState(null);

	const getCurrencies = async () => {
		const response = await MoneyOperations.getCurrencies();
		setCourse(response.data[0].price);
	};

	useEffect(() => {
		getCurrencies();
	}, [showCurrencies]);

	return (
		<>
			<nav className="p-4 bg-white shadow-md">
				<ul className="flex items-center justify-between list-none">
					<li>
						<Link to={"/"}>
							<img src={LOGOS.MAIN} alt="Logo" className="w-36" />
						</Link>
					</li>
					<li title="Кун, Ой, Йиллик ҳисоботларни чоп этиш">
						<Link
							to={"/chop-report"}
							className="flex items-center gap-4 bg-gray-200 text-black px-10 py-2 rounded-lg text-lg"
						>
							Чоп етиш{" "}
							<img
								src={ICONS.CHOP}
								alt="Print Icon"
								className="w-5 text-black"
							/>
						</Link>
					</li>
					<li>
						<Link
							to={"/workers"}
							className="flex items-center gap-4 bg-gray-200 text-black px-10 py-2 rounded-lg text-lg"
						>
							Ходимларымыз
							<img src={ICONS.WORKERS} alt="Worker Icon" className="w-5" />
						</Link>
					</li>
					<li className="flex items-center gap-2">
						<input
							value={startDate}
							onChange={(e) => dispatch(setStartDate(e.target.value))}
							type="date"
							className="px-3 py-2 border rounded-lg"
						/>
						<span>дан</span>
					</li>
					<li className="flex items-center gap-2">
						<input
							value={endDate}
							onChange={(e) => dispatch(setEndDate(e.target.value))}
							type="date"
							className="px-3 py-2 border rounded-lg"
						/>
						<span>гача</span>
					</li>
				</ul>
				<ul className="flex items-center justify-end gap-5 list-none mt-4">
					<li>
						<button onClick={() => setShowCurrencies(true)} className="flex items-center gap-4 bg-gray-100 text-black px-10 py-2 rounded-lg text-lg">
							Курс: {course && course.toLocaleString()}
						</button>
					</li>
					<li>
						<LogoutButton />
					</li>
				</ul>
			</nav>

			{showCurrencies && <Currencies setShowCurrencies={setShowCurrencies}/>}
		</>
	);
};

export default Navbar;
