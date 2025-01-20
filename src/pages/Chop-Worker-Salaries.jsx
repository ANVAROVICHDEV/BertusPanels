import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import SalariesOperations from "../services/salariesOperations";
import { useSelector } from "react-redux";
import { BackToButton, Loader } from "../index";
import { FaLongArrowAltRight } from "react-icons/fa";

const ChopWorkerSalaries = () => {
	const { startDate, endDate } = useSelector((state) => state.date);

	const [allData, setAllData] = useState(null);
	const [loading, setLoading] = useState(false);

	const getAllData = async () => {
		setLoading(true);
		try {
			const response = await SalariesOperations.allSalaries(startDate, endDate);
			setAllData(response);
			setLoading(false);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	useEffect(() => {
		getAllData();
	}, []);

	const pdfWidth = 210; // A4 kengligi millimetrda
	const pdfHeight = 297; // A4 balandligi millimetrda

	const handleDownloadPDF = () => {
		const input = document.getElementById("pdf-content");

		html2canvas(input, { scale: 2 }).then((canvas) => {
			// scale ni 1 qilish
			const imgData = canvas.toDataURL("image/png");
			const pdf = new jsPDF("p", "mm", "a4"); // A4 format

			const pdfWidth = 210; // A4 kengligi (mm)
			const pdfHeight = 297; // A4 balandligi (mm)
			const imgWidth = pdfWidth;
			const imgHeight = (canvas.height * pdfWidth) / canvas.width;

			let heightLeft = imgHeight; // Rasm balandligi
			let position = 0;

			// Birinchi sahifani qo'shish
			pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
			heightLeft -= pdfHeight;

			// Agar rasm balandligi PDF sahifasidan oshsa, yangi sahifa qo'shamiz
			while (heightLeft > 0) {
				position -= pdfHeight; // Yangi sahifaga o'tish
				pdf.addPage();
				pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
				heightLeft -= pdfHeight;
			}

			pdf.save("sahifa.pdf");
		});
	};
	return loading ? (
		<Loader />
	) : (
		<div id="pdf-content">
			{allData && (
				<>
        <div className="flex justify-between my-5">
						<h2 className="text-2xl font-bold flex items-center gap-5">
							<span className="p-2 text-gray-700">
								{startDate}
							</span>{" "}
							<FaLongArrowAltRight />
							{/* дан{" "} */}
							<span className="p-2 text-gray-700">
								{endDate}
							</span>{" "}
							{/* гача */}
						</h2>
						<BackToButton color={"bg-green-500"} location={"/workers"} />
					</div>
					<table
						id="table-to-export"
						border="1"
						style={{ borderCollapse: "collapse", width: "100%" }}
					>
						{/* Офес */}
						<thead>
							<tr className="bg-green-500 text-white">
								<th
									colSpan={12}
									className="py-4 text-center text-2xl font-bold"
								>
									<h2>Офес</h2>
								</th>
							</tr>
							<tr className="bg-gray-100 text-sm text-gray-600 border-b-2 border-gray-300">
								<th className="px-4 py-2">N</th>
								<th className="px-4 py-2">Ходим исм фамиляси</th>
								<th className="px-4 py-2">Бўлим</th>
								<th className="px-4 py-2">Оклад</th>
								<th className="px-4 py-2">Кун</th>
								<th className="px-4 py-2">Метр бонус</th>
								<th className="px-4 py-2">Жами маош</th>
								<th className="px-4 py-2">Аванс</th>
								<th className="px-4 py-2">Пенсони фонт</th>
								<th className="px-4 py-2">Карздорлик</th>
								<th className="px-4 py-2">Жами маош</th>
							</tr>
						</thead>
						<tbody>
							{allData?.data?.filter((item) => item.part === "office").length >
							0 ? (
								allData?.data
									?.filter((item) => item.part === "office")
									.map((item, index) => {
										return (
											<tr
												key={item.id}
												className="border-b-2  hover:bg-blue-200 hover:text-black"
											>
												<td className="px-4 py-2 text-center">{index + 1}</td>
												<td className="px-4 py-2">{item.name}</td>
												<td className="px-4 py-2 text-center">
													{item.part === "office" ? "Офес" : "Офес"}
												</td>
												<td className="px-4 py-2 text-center">
													{item.fixed.toLocaleString()}
												</td>
												<td className="px-4 py-2 text-center">
													{item.workdays}
												</td>
												<td className="px-4 py-2 text-center">
													{item.salaries
														?.filter((salaryItem) => salaryItem.type === "kpi")
														.reduce(
															(sum, salaryItem) => sum + salaryItem.money,
															0,
														)
														.toLocaleString()}
												</td>
												<td className="px-4 py-2 text-center">
													{(
														item.fixed +
														item.salaries
															?.filter(
																(salaryItem) => salaryItem.type === "kpi",
															)
															.reduce(
																(sum, salaryItem) => sum + salaryItem.money,
																0,
															)
													).toLocaleString()}
												</td>
												<td className="px-4 py-2 text-center">
													{item.salaries
														?.filter(
															(salaryItem) => salaryItem.type === "advance",
														)
														.reduce(
															(sum, salaryItem) => sum + salaryItem.money,
															0,
														)
														.toLocaleString()}
												</td>
												<td className="px-4 py-2 text-center">
													{item.salaries
														?.filter(
															(salaryItem) => salaryItem.type === "pension",
														)
														.reduce(
															(sum, salaryItem) => sum + salaryItem.money,
															0,
														)
														.toLocaleString()}
												</td>
												<td className="px-4 py-2 text-center">
													{item.salaries
														?.filter((salaryItem) => salaryItem.type === "loan")
														.reduce(
															(sum, salaryItem) => sum + salaryItem.money,
															0,
														)
														.toLocaleString()}
												</td>
												<td className="px-4 py-2 text-center">
													{item.salaries
														?.filter(
															(salaryItem) => salaryItem.type === "absolute",
														)
														.reduce(
															(sum, salaryItem) => sum + salaryItem.money,
															0,
														)
														.toLocaleString()}
												</td>
											</tr>
										);
									})
							) : (
								<td colSpan={11} className="text-center py-2 text-gray-500">
									Маълумот киритилмаган
								</td>
							)}
						</tbody>

						{/* Сандвич */}
						<thead>
							<tr className="bg-green-500 text-white">
								<th
									colSpan={12}
									className="py-4 text-center text-2xl font-bold"
								>
									<h2>Сандвич</h2>
								</th>
							</tr>
							<tr className="bg-gray-100 text-sm text-gray-600 border-b-2 border-gray-300">
								<th className="px-4 py-2">N</th>
								<th className="px-4 py-2">Ходим исм фамиляси</th>
								<th className="px-4 py-2">Бўлим</th>
								<th className="px-4 py-2">Оклад</th>
								<th className="px-4 py-2">Кун</th>
								<th className="px-4 py-2">Метр бонус</th>
								<th className="px-4 py-2">Жами маош</th>
								<th className="px-4 py-2">Аванс</th>
								<th className="px-4 py-2">Пенсони фонт</th>
								<th className="px-4 py-2">Карздорлик</th>
								<th className="px-4 py-2">Жами маош</th>
							</tr>
						</thead>
						<tbody>
							{allData?.data?.filter((item) => item.part === "sandwich")
								.length > 0
								? allData?.data
										?.filter((item) => item.part === "sandwich")
										.map((item, index) => {
											return (
												<tr
													key={item.id}
													className="border-b-2 hover:bg-blue-200 hover:text-black"
												>
													<td className="px-4 py-2 text-center">{index + 1}</td>
													<td className="px-4 py-2">{item.name}</td>
													<td className="px-4 py-2 text-center">
														{item.part === "sandwich" ? "Сендвич" : "Сендвич"}
													</td>
													<td className="px-4 py-2 text-center">
														{item.fixed.toLocaleString()}
													</td>
													<td className="px-4 py-2 text-center">
														{item.workdays}
													</td>
													<td className="px-4 py-2 text-center">
														{item.salaries
															?.filter(
																(salaryItem) => salaryItem.type === "kpi",
															)
															.reduce(
																(sum, salaryItem) => sum + salaryItem.money,
																0,
															)
															.toLocaleString()}
													</td>
													<td className="px-4 py-2 text-center">
														{(
															item.fixed +
															item.salaries
																?.filter(
																	(salaryItem) => salaryItem.type === "kpi",
																)
																.reduce(
																	(sum, salaryItem) => sum + salaryItem.money,
																	0,
																)
														).toLocaleString()}
													</td>
													<td className="px-4 py-2 text-center">
														{item.salaries
															?.filter(
																(salaryItem) => salaryItem.type === "advance",
															)
															.reduce(
																(sum, salaryItem) => sum + salaryItem.money,
																0,
															)
															.toLocaleString()}
													</td>
													<td className="px-4 py-2 text-center">
														{item.salaries
															?.filter(
																(salaryItem) => salaryItem.type === "pension",
															)
															.reduce(
																(sum, salaryItem) => sum + salaryItem.money,
																0,
															)
															.toLocaleString()}
													</td>
													<td className="px-4 py-2 text-center">
														{item.salaries
															?.filter(
																(salaryItem) => salaryItem.type === "loan",
															)
															.reduce(
																(sum, salaryItem) => sum + salaryItem.money,
																0,
															)
															.toLocaleString()}
													</td>
													<td className="px-4 py-2 text-center">
														{item.salaries
															?.filter(
																(salaryItem) => salaryItem.type === "absolute",
															)
															.reduce(
																(sum, salaryItem) => sum + salaryItem.money,
																0,
															)
															.toLocaleString()}
													</td>
												</tr>
											);
										})
								: 	<td colSpan={11} className="text-center py-2 text-gray-500">
                Маълумот киритилмаган
              </td>}
						</tbody>

						{/* Пенопласт kesish*/}
						<thead>
							<tr className="bg-green-500 text-white">
								<th
									colSpan={12}
									className="py-4 text-center text-2xl font-bold"
								>
									<h2>Блок Кесув</h2>
								</th>
							</tr>
							<tr className="bg-gray-100 text-sm text-gray-600 border-b-2 border-gray-300">
								<th className="px-4 py-2">N</th>
								<th className="px-4 py-2">Ходим исм фамиляси</th>
								<th className="px-4 py-2">Бўлим</th>
								<th className="px-4 py-2">Оклад</th>
								<th className="px-4 py-2">Кун</th>
								<th className="px-4 py-2">Метр бонус</th>
								<th className="px-4 py-2">Жами маош</th>
								<th className="px-4 py-2">Аванс</th>
								<th className="px-4 py-2">Пенсони фонт</th>
								<th className="px-4 py-2">Карздорлик</th>
								<th className="px-4 py-2">Жами маош</th>
							</tr>
						</thead>
						<tbody>
							{allData?.data?.filter((item) => item.part === "peno_cutting")
								.length > 0
								? allData?.data
										?.filter((item) => item.part === "peno_cutting")
										.map((item, index) => {
											return (
												<tr
													key={item.id}
													className="border-b-2 hover:bg-blue-200 hover:text-black"
												>
													<td className="px-4 py-2 text-center">{index + 1}</td>
													<td className="px-4 py-2 w-60">{item.name}</td>
													<td className="px-4 py-2 text-center w-40">
														{item.part === "peno_cutting"
															? "Блок Кесув"
															: "Блок Кесув"}
													</td>
													<td className="px-4 py-2 text-center">
														{item.fixed.toLocaleString()}
													</td>
													<td className="px-4 py-2 text-center">
														{item.workdays}
													</td>
													<td className="px-4 py-2 text-center">
														{item.salaries
															?.filter(
																(salaryItem) => salaryItem.type === "kpi",
															)
															.reduce(
																(sum, salaryItem) => sum + salaryItem.money,
																0,
															)
															.toLocaleString()}
													</td>
													<td className="px-4 py-2 text-center">
														{(
															item.fixed +
															item.salaries
																?.filter(
																	(salaryItem) => salaryItem.type === "kpi",
																)
																.reduce(
																	(sum, salaryItem) => sum + salaryItem.money,
																	0,
																)
														).toLocaleString()}
													</td>
													<td className="px-4 py-2 text-center">
														{item.salaries
															?.filter(
																(salaryItem) => salaryItem.type === "advance",
															)
															.reduce(
																(sum, salaryItem) => sum + salaryItem.money,
																0,
															)
															.toLocaleString()}
													</td>
													<td className="px-4 py-2 text-center">
														{item.salaries
															?.filter(
																(salaryItem) => salaryItem.type === "pension",
															)
															.reduce(
																(sum, salaryItem) => sum + salaryItem.money,
																0,
															)
															.toLocaleString()}
													</td>
													<td className="px-4 py-2 text-center">
														{item.salaries
															?.filter(
																(salaryItem) => salaryItem.type === "loan",
															)
															.reduce(
																(sum, salaryItem) => sum + salaryItem.money,
																0,
															)
															.toLocaleString()}
													</td>
													<td className="px-4 py-2 text-center">
														{item.salaries
															?.filter(
																(salaryItem) => salaryItem.type === "absolute",
															)
															.reduce(
																(sum, salaryItem) => sum + salaryItem.money,
																0,
															)
															.toLocaleString()}
													</td>
												</tr>
											);
										})
								: 	<td colSpan={11} className="text-center py-2 text-gray-500">
                Маълумот киритилмаган
              </td>}
						</tbody>

						{/* Пенопласт yashash*/}
						<thead>
							<tr className="bg-green-500 text-white">
								<th
									colSpan={12}
									className="py-4 text-center text-2xl font-bold"
								>
									<h2>Блок чикариш</h2>
								</th>
							</tr>
							<tr className="bg-gray-100 text-sm text-gray-600 border-b-2 border-gray-300">
								<th className="px-4 py-2">N</th>
								<th className="px-4 py-2">Ходим исм фамиляси</th>
								<th className="px-4 py-2">Бўлим</th>
								<th className="px-4 py-2">Оклад</th>
								<th className="px-4 py-2">Кун</th>
								<th className="px-4 py-2">Метр бонус</th>
								<th className="px-4 py-2">Жами маош</th>
								<th className="px-4 py-2">Аванс</th>
								<th className="px-4 py-2">Пенсони фонт</th>
								<th className="px-4 py-2">Карздорлик</th>
								<th className="px-4 py-2">Жами маош</th>
							</tr>
						</thead>
						<tbody>
							{allData?.data?.filter((item) => item.part === "peno_making")
								.length > 0
								? allData?.data
										?.filter((item) => item.part === "peno_making")
										.map((item, index) => {
											return (
												<tr
													key={item.id}
													className="border-b-2 hover:bg-blue-200 hover:text-black"
												>
													<td className="px-4 py-2 text-center">{index + 1}</td>
													<td className="px-4 py-2">{item.name}</td>
													<td className="px-4 py-2 text-center">
														{item.part === "peno_making"
															? "Блок чикариш"
															: "Блок чикариш"}
													</td>
													<td className="px-4 py-2 text-center">
														{item.fixed.toLocaleString()}
													</td>
													<td className="px-4 py-2 text-center">
														{item.workdays}
													</td>
													<td className="px-4 py-2 text-center">
														{item.salaries
															?.filter(
																(salaryItem) => salaryItem.type === "kpi",
															)
															.reduce(
																(sum, salaryItem) => sum + salaryItem.money,
																0,
															)
															.toLocaleString()}
													</td>
													<td className="px-4 py-2 text-center">
														{(
															item.fixed +
															item.salaries
																?.filter(
																	(salaryItem) => salaryItem.type === "kpi",
																)
																.reduce(
																	(sum, salaryItem) => sum + salaryItem.money,
																	0,
																)
														).toLocaleString()}
													</td>
													<td className="px-4 py-2 text-center">
														{item.salaries
															?.filter(
																(salaryItem) => salaryItem.type === "advance",
															)
															.reduce(
																(sum, salaryItem) => sum + salaryItem.money,
																0,
															)
															.toLocaleString()}
													</td>
													<td className="px-4 py-2 text-center">
														{item.salaries
															?.filter(
																(salaryItem) => salaryItem.type === "pension",
															)
															.reduce(
																(sum, salaryItem) => sum + salaryItem.money,
																0,
															)
															.toLocaleString()}
													</td>
													<td className="px-4 py-2 text-center">
														{item.salaries
															?.filter(
																(salaryItem) => salaryItem.type === "loan",
															)
															.reduce(
																(sum, salaryItem) => sum + salaryItem.money,
																0,
															)
															.toLocaleString()}
													</td>
													<td className="px-4 py-2 text-center">
														{item.salaries
															?.filter(
																(salaryItem) => salaryItem.type === "absolute",
															)
															.reduce(
																(sum, salaryItem) => sum + salaryItem.money,
																0,
															)
															.toLocaleString()}
													</td>
												</tr>
											);
										})
								: 	<td colSpan={11} className="text-center py-2 text-gray-500">
                Маълумот киритилмаган
              </td>}
						</tbody>

						{/* Ташки */}
						<thead>
							<tr className="bg-green-500 text-white">
								<th
									colSpan={12}
									className="py-4 text-center text-2xl font-bold"
								>
									<h2>Ташки</h2>
								</th>
							</tr>
							<tr className="bg-gray-100 text-sm text-gray-600 border-b-2 border-gray-300">
								<th className="px-4 py-2">N</th>
								<th className="px-4 py-2">Ходим исм фамиляси</th>
								<th className="px-4 py-2">Бўлим</th>
								<th className="px-4 py-2">Оклад</th>
								<th className="px-4 py-2">Кун</th>
								<th className="px-4 py-2">Метр бонус</th>
								<th className="px-4 py-2">Жами маош</th>
								<th className="px-4 py-2">Аванс</th>
								<th className="px-4 py-2">Пенсони фонт</th>
								<th className="px-4 py-2">Карздорлик</th>
								<th className="px-4 py-2">Жами маош</th>
							</tr>
						</thead>
						<tbody>
							{allData?.data?.filter((item) => item.part === "other").length >
							0 ? (
								allData?.data
									?.filter((item) => item.part === "other")
									.map((item, index) => {
										return (
											<tr
												key={item.id}
												className="border-b-2 hover:bg-blue-200 hover:text-black"
											>
												<td className="px-4 py-2 text-center">{index + 1}</td>
												<td className="px-4 py-2">{item.name}</td>
												<td className="px-4 py-2 text-center">
													{item.part === "other" ? "Ташки" : "Ташки"}
												</td>
												<td className="px-4 py-2 text-center">
													{item.fixed.toLocaleString()}
												</td>
												<td className="px-4 py-2 text-center">
													{item.workdays}
												</td>
												<td className="px-4 py-2 text-center">
													{item.salaries
														?.filter((salaryItem) => salaryItem.type === "kpi")
														.reduce(
															(sum, salaryItem) => sum + salaryItem.money,
															0,
														)
														.toLocaleString()}
												</td>
												<td className="px-4 py-2 text-center">
													{(
														item.fixed +
														item.salaries
															?.filter(
																(salaryItem) => salaryItem.type === "kpi",
															)
															.reduce(
																(sum, salaryItem) => sum + salaryItem.money,
																0,
															)
													).toLocaleString()}
												</td>
												<td className="px-4 py-2 text-center">
													{item.salaries
														?.filter(
															(salaryItem) => salaryItem.type === "advance",
														)
														.reduce(
															(sum, salaryItem) => sum + salaryItem.money,
															0,
														)
														.toLocaleString()}
												</td>
												<td className="px-4 py-2 text-center">
													{item.salaries
														?.filter(
															(salaryItem) => salaryItem.type === "pension",
														)
														.reduce(
															(sum, salaryItem) => sum + salaryItem.money,
															0,
														)
														.toLocaleString()}
												</td>
												<td className="px-4 py-2 text-center">
													{item.salaries
														?.filter((salaryItem) => salaryItem.type === "loan")
														.reduce(
															(sum, salaryItem) => sum + salaryItem.money,
															0,
														)
														.toLocaleString()}
												</td>
												<td className="px-4 py-2 text-center">
													{item.salaries
														?.filter(
															(salaryItem) => salaryItem.type === "absolute",
														)
														.reduce(
															(sum, salaryItem) => sum + salaryItem.money,
															0,
														)
														.toLocaleString()}
												</td>
											</tr>
										);
									})
							) : (
								<tr>
									<td colSpan={11} className="text-center py-2 text-gray-500">
										Маълумот киритилмаган
									</td>
								</tr>
							)}
						</tbody>

						<thead>
							<tr className="bg-green-500 text-white border-b-2">
								<th className="px-6 py-4 text-xl">N</th>
								<th className="px-6 py-4 text-xl" colSpan={11}>
									<h2 className="text-2xl font-bold">
										Ходимларга берилган жами пуллар
									</h2>
								</th>
							</tr>
						</thead>
						<tbody>
							<tr className="bg-gray-100 hover:bg-blue-200 hover:text-black px-6 py-1 border-b-2">
								<th className="px-6 py-1">1</th>
								<td className="text-left" colSpan={5}>
									<span className="font-bold">Авансларга</span>
								</td>
								<td className="text-left font-bold" colSpan={6}>
									{allData?.total_sum_advance.toLocaleString()} сум
								</td>
							</tr>
							<tr className="bg-gray-100 hover:bg-blue-200 hover:text-black px-6 py-1 border-b-2">
								<th className="px-6 py-1">2</th>
								<td className="text-left" colSpan={5}>
									<span className="font-bold">Метр бонусга</span>
								</td>
								<td className="text-left font-bold" colSpan={6}>
									{allData?.total_sum_kpi.toLocaleString()} сум
								</td>
							</tr>
							<tr className="bg-gray-100 hover:bg-blue-200 hover:text-black px-6 py-1 border-b-2">
								<th className="px-6 py-1">3</th>
								<td className="text-left" colSpan={5}>
									<span className="font-bold">Иш куни бонусга</span>
								</td>
								<td className="text-left font-bold" colSpan={6}>
									{allData?.total_sum_wdb.toLocaleString()} сум
								</td>
							</tr>
							<tr className="bg-gray-100 hover:bg-blue-200 hover:text-black px-6 py-1 border-b-2">
								<th className="px-6 py-1">4</th>
								<td className="text-left" colSpan={5}>
									<span className="font-bold">Kошимча бонусга</span>
								</td>
								<td className="text-left font-bold" colSpan={6}>
									{allData?.total_sum_extra_bonus.toLocaleString()} сум
								</td>
							</tr>
							<tr className="bg-gray-100 hover:bg-blue-200 hover:text-black px-6 py-1 border-b-2">
								<th className="px-6 py-1">5</th>
								<td className="text-left" colSpan={5}>
									<span className="font-bold">Kарзларга</span>
								</td>
								<td className="text-left font-bold" colSpan={6}>
									{allData?.total_sum_loan.toLocaleString()} сум
								</td>
							</tr>
							<tr className="bg-gray-100 hover:bg-blue-200 hover:text-black px-6 py-1 border-b-2">
								<th className="px-6 py-1">6</th>
								<td className="text-left" colSpan={5}>
									<span className="font-bold">Пенсионнийга</span>
								</td>
								<td className="text-left font-bold" colSpan={6}>
									{allData?.total_sum_pension.toLocaleString()} сум
								</td>
							</tr>
							<tr className="bg-gray-100 hover:bg-blue-200 hover:text-black px-6 py-1 border-b-2">
								<th className="px-6 py-1">7</th>
								<td className="text-left" colSpan={5}>
									<span className="font-bold">Жарималарга</span>
								</td>
								<td className="text-left font-bold" colSpan={6}>
									{allData?.total_sum_penalty.toLocaleString()} сум
								</td>
							</tr>
							<tr className="bg-gray-100 hover:bg-blue-200 hover:text-black px-6 py-1 border-b-2">
								<th className="px-6 py-1">8</th>
								<td className="text-left" colSpan={5}>
									<span className="font-bold">Якуний ойлик</span>
								</td>
								<td className="text-left font-bold" colSpan={6}>
									{allData?.total_sum_absolute.toLocaleString()} сум
								</td>
							</tr>

							<tr className="bg-green-500 text-white">
								<td
									className="text-left font-semibold px-6 py-1 border-b-2"
									colSpan={6}
								>
									<h3>Ойликлар учун килинган чиким</h3>
								</td>
								<td
									className="text-left font-bold  py-4 border-b-2"
									colSpan={5}
								>
									<h3>
										{allData?.total_sum_expense_for_salary.toLocaleString()} сум
									</h3>
								</td>
							</tr>
						</tbody>
					</table>
					<button
						onClick={handleDownloadPDF}
						className="mt-5 px-6 py-4 bg-green-500 text-white border-none cursor-pointer rounded-md hover:bg-green-600"
					>
						pdf файлни юклаш
					</button>
				</>
			)}
		</div>
	);
};

export default ChopWorkerSalaries;
