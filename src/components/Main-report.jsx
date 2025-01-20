import { useState } from "react";
import { useSelector } from "react-redux";

import { AddModalIncome, AddModalOucome } from "../index";

const MainReport = () => {
	const [modalIncome, setModalIncome] = useState(false);
	const [modalOutCome, setModalOutcome] = useState(false);

	const { mainReport } = useSelector((state) => state.date);

	return (
		<>
			<div className="flex justify-between text-center p-5 bg-white border-2 border-gray-300 shadow-lg rounded-xl my-8">
				<div className="w-1/3 p-5 border-r-2 border-gray-300">
					<h2 className="text-green-500 mb-4 text-2xl font-bold">КИРИМ</h2>
					<h3 className="font-medium mb-2 text-xl">
						{mainReport?.finally_sum_incomes?.toLocaleString()} УЗС
					</h3>
					<h3 className="font-medium mb-2 text-xl">
						{mainReport?.finally_dollar_incomes?.toLocaleString()} УСД
					</h3>
					<button
						onClick={() => setModalIncome(true)}
						className="text-black bg-gray-200 py-2 px-5 border-none outline-none text-lg rounded-xl cursor-pointer"
					>
						Кирим қўшиш
					</button>
				</div>
				<div className="w-1/3 p-5 border-r-2 border-gray-300">
					<h2 className="text-green-500 mb-4 text-2xl font-bold">ДАРОМАД</h2>
					<h3 className="font-medium mb-2 text-xl">
						{mainReport?.finally_sum_benefit?.toLocaleString()} УЗС
					</h3>
					<h3 className="font-medium mb-2 text-xl">
						{mainReport?.finally_dollar_benefit?.toLocaleString()} УСД
					</h3>
				</div>
				<div className="w-1/3 p-5">
					<h2 className="text-red-500 mb-4 text-2xl font-bold">ЧИҚИМ</h2>
					<h3 className="font-medium mb-2 text-xl">
						{mainReport?.finally_sum_expenses?.toLocaleString()} УЗС
					</h3>
					<h3 className="font-medium mb-2 text-xl">
						{mainReport?.finally_dollar_expenses?.toLocaleString()} УСД
					</h3>
					<button
						onClick={() => setModalOutcome(true)}
						className="text-black bg-gray-200 py-2 px-5 border-none outline-none text-lg rounded-xl cursor-pointer"
					>
						Чиқим қўшиш
					</button>
				</div>
			</div>

			{modalIncome && <AddModalIncome setModalIncome={setModalIncome} />}
			{modalOutCome && <AddModalOucome setModalOutcome={setModalOutcome} />}
		</>
	);
};

export default MainReport;
