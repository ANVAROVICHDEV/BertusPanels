import { useParams } from "react-router-dom";
import { BackToButton, IncomeTable, Loader } from "../index";
import { useEffect, useState } from "react";
import MoneyOperations from "../services/moneyOpeations";
import { useSelector } from "react-redux";

function IncomeInfo() {
	const { type } = useParams();
	const [allIncome, setAllIncome] = useState(null);
	const [search, setSearch] = useState(""); // Qidiruv bo'sh qiymat bilan boshlanadi
	const [isLoading, setIsLoading] = useState(false);

	const { startDate, endDate } = useSelector((state) => state.date);
	const { refreshRenderData } = useSelector((state) => state.render);
	const typeMap = {
		sandwich: "Сендвич",
		pena: "Пена",
		other: "Бошқалар",
	};

	const getAllIncome = async (searchValue = "") => {
		setIsLoading(true);
		try {
			const response = await MoneyOperations.allIncome(
				startDate,
				endDate,
				type,
				searchValue, // Qidiruv qiymatini yuboramiz
			);
			setAllIncome(response);
		} catch (error) {
			console.error("Error in refreshing data:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault(); // Formani submit qilishdan to'xtatamiz
		getAllIncome(search); // Qidiruv qiymati bilan ma'lumotni qayta yuklaymiz
	};

	// Input qiymati o'zgarsa, uni kuzatib boramiz
	useEffect(() => {
		if (search === "") {
			getAllIncome(); // Input bo'sh bo'lsa, barcha ma'lumotlarni yuklaymiz
		}
	}, [search]);

	useEffect(() => {
		getAllIncome(); // Sahifa birinchi marta yuklanganda barcha ma'lumotlarni yuklash
	}, [refreshRenderData]);

	return (
		<div>
			<>
				<nav className="flex justify-between items-center py-5">
					<div className="detailLogo">
						<BackToButton location={"/"} />
					</div>

					<form onSubmit={handleSubmit} className="w-[500px] mx-auto">
						<label
							htmlFor="default-search"
							className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
						>
							Search
						</label>
						<div className="relative">
							<div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
								<svg
									className="w-4 h-4 text-gray-500 dark:text-gray-400"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 20 20"
								>
									<path
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
									/>
								</svg>
							</div>
							<input
								type="search"
								id="default-search"
								className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								placeholder="Қидириш..."
								value={search}
								onChange={(e) => setSearch(e.target.value)} // Har bir o'zgarishni kuzatamiz
							/>
							<button
								type="submit"
								className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
							>
								Қидириш
							</button>
						</div>
					</form>

					<div className="flex items-center space-x-8 text-lg">
						<button className="font-medium text-green-500 bg-gray-200 p-4 rounded-lg">
							{typeMap[type]} жами: {allIncome?.total_sum?.toLocaleString()} УЗС
							/ {allIncome?.total_dollar?.toLocaleString()} УСД
						</button>
					</div>
				</nav>
				<IncomeTable data={allIncome?.data} isLoading={isLoading} />
			</>
		</div>
	);
}

export default IncomeInfo;
