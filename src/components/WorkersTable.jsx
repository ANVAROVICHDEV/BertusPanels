import React, { useEffect, useState } from "react";
import WorkerOpeations from "../services/workerOperations";
import { Link } from "react-router-dom";
import { Loader, Pagination } from "../index";
import { useSelector } from "react-redux";

const WorkersTable = ({ part, workersUpdated }) => {
	const [workerId, setWorkerId] = useState(0);
	const [allWorkers, setAllWorkers] = useState(null);
	const [loading, setLoading] = useState(false);
	const [totalPages, setTotalPages] = useState(1);
	const [currentPage, setCurrentPage] = useState(1);
	const inputValue = useSelector((state) => state.input.value);

	// console.log(inputValue);
	const allworkerGet = async () => {
		setLoading(true);
		try {
			const response = await WorkerOpeations.allWorkers(
				workerId,
				part,
				currentPage,
				inputValue || "",
			);
			setAllWorkers(response.data);
			setTotalPages(response.pages); // Total sahifalar sonini olish
			setLoading(false);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	// useEffect sahifalar o'zgarganda yoki part o'zgarganda ishlaydi
	useEffect(() => {
		allworkerGet();
	}, [part, currentPage, workersUpdated, inputValue]);

	// Sahifa o'zgarganda funksiyani chaqirish
	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	return (
		<div>
			{loading ? (
				<Loader />
			) : (
				<div className="mt-10">
					{allWorkers && allWorkers.length > 0 ? (
						allWorkers.map((item, index) => (
							<div
								key={item.id}
								className="flex items-center justify-between bg-white border-2 border-gray-300 shadow-md rounded-2xl  my-5"
							>
								<div className="w-[20%] flex items-center gap-2 px-10 py-5  border-gray-300">
									<button className="w-8 h-8 bg-gray-200 text-lg font-semibold rounded-lg">
										{(currentPage - 1) * 10 + index + 1}
									</button>
									<div>
										<p className="font-medium">ФИШ:</p>
										<p>{item.name}</p>
									</div>
								</div>

								<div className="w-[20%] flex flex-col items-start px-10 py-5 border-l-2 border-gray-300">
									<p className="font-medium">Иш куни:</p>
									<p>{item.workdays} кун</p>
								</div>

								<div className="w-[20%] flex flex-col items-start px-10 py-5 border-l-2 border-gray-300">
									<p className="font-medium">Фикса маоши:</p>
									<p>{item.fixed?.toLocaleString()} сўм</p>
								</div>

								<div className="w-[20%] flex flex-col items-start px-10 py-5 border-l-2 border-gray-300">
									<p className="font-medium">Баланси:</p>
									<p>{item.balance?.toLocaleString()}</p>
								</div>

								<div className="w-[20%] flex items-center px-10 py-5 border-l-2 border-gray-300">
									<Link
										to={`/workersInfo/${item.id}`}
										className="px-12 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition"
									>
										Батафсил
									</Link>
								</div>
							</div>
						))
					) : (
						<div className="text-center text-gray-500 font-medium mt-5">
							<p>Маълумот топилмади. Илтимос, қайтадан уриниб кўринг!</p>
						</div>
					)}
				</div>
			)}

			<Pagination
				handlePageChange={handlePageChange}
				totalPages={totalPages}
				currentPage={currentPage}
			/>
		</div>
	);
};

export default WorkersTable;
