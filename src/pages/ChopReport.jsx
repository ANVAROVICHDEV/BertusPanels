import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaLongArrowAltRight } from "react-icons/fa";
import {
	BackToButton,
	ChopReportHeaderTable,
	ChopReportTable,
	Loader,
	PDFDownload,
} from "../index";
import { refreshData } from "../slices/dataSlice";
import { ChopReportExpenses, ChopReportOutcomeTable } from "../ui";

const ChopReport = () => {
	const { mainReport, loading, startDate, endDate } = useSelector(
		(state) => state.date,
	);

	// console.log(mainReport);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(refreshData({ startDate, endDate }));
	}, [dispatch]);

	return loading ? (
		<Loader />
	) : (
		<div
			id="pdf-content"
			className="relative overflow-x-auto shadow-md sm:rounded-lg"
		>
			{mainReport && (
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
						<BackToButton color={"bg-green-500"} location={"/"} />
					</div>
					{/* Income  */}
					<table id="income-content" className=" w-full   text-center text-sm rtl:text-right text-gray-500 dark:text-gray-400">
						{/* Sendwich  */}
						<thead>
							<tr className=" bg-green-500 text-white hover:bg-green-600">
								<th colSpan={6} className="text-2xl font-bold py-3">
									Кирим
								</th>
							</tr>
							<ChopReportHeaderTable name={"Сандвич"} />
							<tr className="bg-gray-300">
								<th scope="col" className="px-6 py-3">
									No
								</th>
								<th scope="col" className="px-6 py-3">
									Исми
								</th>
								<th scope="col" className="px-6 py-3">
									Махсулот
								</th>
								<th scope="col" className="px-6 py-3">
									Ўзбекистон сўми
								</th>
								<th scope="col" className="px-6 py-3">
									Доллар
								</th>
								<th scope="col" className="px-6 py-3">
									Cана
								</th>
							</tr>
						</thead>
						<tbody>
							{/* sandwich */}
							<ChopReportTable
								name={"Сандвич"}
								type={"sandwich"}
								mainReport={mainReport}
							/>
						</tbody>
						{/* Penaplast  */}
						<thead>
							<ChopReportHeaderTable name={"Пена"} />
							<tr className="bg-gray-300">
								<th scope="col" className="px-6 py-3">
									No
								</th>
								<th scope="col" className="px-6 py-3">
									Исми
								</th>
								<th scope="col" className="px-6 py-3">
									Махсулот
								</th>
								<th scope="col" className="px-6 py-3">
									Ўзбекистон сўми
								</th>
								<th scope="col" className="px-6 py-3">
									Доллар
								</th>
								<th scope="col" className="px-6 py-3">
									Cана
								</th>
							</tr>
						</thead>
						<tbody>
							{/* sandwich */}
							<ChopReportTable
								name={"Пена"}
								type={"pena"}
								mainReport={mainReport}
							/>
						</tbody>
						{/* Boshqalar  */}
						<thead>
							<ChopReportHeaderTable name={"Бошқалар"} />
							<tr className="bg-gray-300">
								<th scope="col" className="px-6 py-3">
									No
								</th>
								<th scope="col" className="px-6 py-3">
									Исми
								</th>
								<th scope="col" className="px-6 py-3">
									Махсулот
								</th>
								<th scope="col" className="px-6 py-3">
									Ўзбекистон сўми
								</th>
								<th scope="col" className="px-6 py-3">
									Доллар
								</th>
								<th scope="col" className="px-6 py-3">
									Cана
								</th>
							</tr>
						</thead>
						<tbody>
							{/* sandwich */}
							<ChopReportTable
								name={"Бошқалар"}
								type={"other"}
								mainReport={mainReport}
							/>
						</tbody>
					{/* Expenses  */}
						<thead>
							<tr className="bg-red-500 text-white hover:bg-red-600">
								<th colSpan={6}>
									<h1 className="text-2xl font-bold py-3">ЧИҚИМ</h1>
								</th>
							</tr>
							<ChopReportHeaderTable name={"Aванс "} />
							<tr className="bg-gray-300">
								<th scope="col" className="px-6 py-3">
									No
								</th>
								<th scope="col" className="px-6 py-3">
									Ходим исми
								</th>
								<th scope="col" className="px-6 py-3">
									Изох
								</th>
								<th scope="col" className="px-6 py-3">
									Ўзбекистон сўми
								</th>
								<th scope="col" className="px-6 py-3">
									Доллар
								</th>
								<th scope="col" className="px-6 py-3">
									Cана
								</th>
							</tr>
						</thead>
						<tbody>
							{/* sandwich */}
							<ChopReportOutcomeTable
								name={"Aванс"}
								type={"advance"}
								mainReport={mainReport}
							/>
						</tbody>

						{/* Доимий харажатлар */}
						<thead>
							<ChopReportHeaderTable name={"Доимий харажатлар"} />
							<tr className="bg-gray-300">
								<th scope="col" className="px-6 py-3">
									No
								</th>
								<th scope="col" className="px-6 py-3">
									Изох
								</th>
								<th>Тури</th>
								<th scope="col" className="px-6 py-3">
									Ўзбекистон сўми
								</th>
								<th scope="col" className="px-6 py-3">
									Доллар
								</th>
								<th scope="col" className="px-6 py-3">
									Cана
								</th>
							</tr>
						</thead>
						<tbody>
							{/* sandwich */}
							<ChopReportExpenses
								name={"Одатий"}
								type={"usual"}
								mainReport={mainReport}
							/>
						</tbody>

						{/* Йўл хақи учун харажатлар */}

						<thead>
							<ChopReportHeaderTable name={"Йўл хақи учун харажатлар"} />
							<tr className="bg-gray-300">
								<th scope="col" className="px-6 py-3">
									No
								</th>
								<th scope="col" className="px-6 py-3">
									Изох
								</th>
								<th>Тури</th>
								<th scope="col" className="px-6 py-3">
									Ўзбекистон сўми
								</th>
								<th scope="col" className="px-6 py-3">
									Доллар
								</th>
								<th scope="col" className="px-6 py-3">
									Cана
								</th>
							</tr>
						</thead>
						<tbody>
							{/* sandwich */}
							<ChopReportExpenses
								name={"Йўл ҳаққи"}
								type={"toll"}
								mainReport={mainReport}
							/>
						</tbody>

						{/*Завод озиқ овқати учун */}

						<thead>
							<ChopReportHeaderTable name={"Завод озиқ овқати учун"} />
							<tr className="bg-gray-300">
								<th scope="col" className="px-6 py-3">
									No
								</th>
								<th scope="col" className="px-6 py-3">
									Изох
								</th>
								<th>Тури</th>
								<th scope="col" className="px-6 py-3">
									Ўзбекистон сўми
								</th>
								<th scope="col" className="px-6 py-3">
									Доллар
								</th>
								<th scope="col" className="px-6 py-3">
									Cана
								</th>
							</tr>
						</thead>
						<tbody>
							<ChopReportExpenses
								name={"Озиқ Овқат"}
								type={"food"}
								mainReport={mainReport}
							/>
						</tbody>

						{/*Ташқи харажатлар учун */}

						<thead>
							<ChopReportHeaderTable name={"Ташқи харажатлар"} />
							<tr className="bg-gray-300">
								<th scope="col" className="px-6 py-3">
									No
								</th>
								<th scope="col" className="px-6 py-3">
									Изох
								</th>
								<th>Тури</th>
								<th scope="col" className="px-6 py-3">
									Ўзбекистон сўми
								</th>
								<th scope="col" className="px-6 py-3">
									Доллар
								</th>
								<th scope="col" className="px-6 py-3">
									Cана
								</th>
							</tr>
						</thead>
						<tbody>
							{/* sandwich */}
							<ChopReportExpenses
								name={"Бошқалар"}
								type={"other"}
								mainReport={mainReport}
							/>
						</tbody>
					{/* All  */}
						{/* Жами Кирим */}

						<thead>
							{/* <ChopReportHeaderTable name={"Ташқи харажатлар"} /> */}
							<tr className="bg-green-500 text-white text-lg">
								<th scope="col" colSpan={2} className="px-6 py-3">
									Жами Кирим
								</th>
								<th scope="col" colSpan={2} className="px-6 py-3">
									{mainReport?.finally_sum_incomes.toLocaleString()} Cум
								</th>
								<th scope="col" colSpan={2} className="px-6 py-3">
									{mainReport?.finally_dollar_incomes.toLocaleString()} Доллар
								</th>
							</tr>
						</thead>
						<tbody>
							<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600">
								<td colSpan={2} className="px-6 py-3">
									Сендвич
								</td>
								<td colSpan={2} className="px-6 py-3">
									{mainReport?.total_money_sum_sandwich_incomes?.toLocaleString()}{" "}
									Cум
								</td>
								<td colSpan={2} className="px-6 py-3">
									{mainReport?.total_money_dollar_sandwich_incomes?.toLocaleString()}{" "}
									Доллар
								</td>
							</tr>
							<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600">
								<td colSpan={2} className="px-6 py-3">
									Пенопласт
								</td>
								<td colSpan={2} className="px-6 py-3">
									{mainReport?.total_money_sum_pena_incomes?.toLocaleString()}{" "}
									Cум
								</td>
								<td colSpan={2} className="px-6 py-3">
									{mainReport.total_money_dollar_other_incomes
										? mainReport.total_money_dollar_other_incomes
										: "0"}{" "}
									Доллар
								</td>
							</tr>
							<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600">
								<td colSpan={2} className="px-6 py-3">
									Бошқа
								</td>
								<td colSpan={2} className="px-6 py-3">
									{mainReport?.total_money_sum_other_incomes?.toLocaleString()}{" "}
									Cум
								</td>
								<td colSpan={2} className="px-6 py-3">
									{mainReport?.total_money_dollar_other_incomes?.toLocaleString()}{" "}
									Доллар
								</td>
							</tr>
						</tbody>
						{/*Жами Чиқим */}

						<thead>
							{/* <ChopReportHeaderTable name={"Ташқи харажатлар"} /> */}
							<tr className="bg-red-500 text-white text-lg">
								<th scope="col" colSpan={2} className="px-6 py-3">
									Жами Чиқим
								</th>
								<th scope="col" colSpan={2} className="px-6 py-3">
									{mainReport?.finally_sum_expenses.toLocaleString()} Cум
								</th>
								<th scope="col" colSpan={2} className="px-6 py-3">
									{mainReport?.finally_dollar_expenses.toLocaleString()} Доллар
								</th>
							</tr>
						</thead>
						<tbody>
							<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600">
								<td colSpan={2} className="px-6 py-3">
									Aванс учун Чиқим
								</td>
								<td colSpan={2} className="px-6 py-3">
									{mainReport?.finally_sum_salaries?.toLocaleString()} Cум
								</td>
								<td colSpan={2} className="px-6 py-3">
									{mainReport?.finally_dollar_salaries?.toLocaleString()} Доллар
								</td>
							</tr>
							<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600">
								<td colSpan={2} className="px-6 py-3">
									Доимий Ҳаражатлар учун Чиқим
								</td>
								<td colSpan={2} className="px-6 py-3">
									{mainReport?.total_money_sum_usual_expenses?.toLocaleString()}{" "}
									Cум
								</td>
								<td colSpan={2} className="px-6 py-3">
									{mainReport?.total_money_dollar_usual_expenses?.toLocaleString()}{" "}
									Доллар
								</td>
							</tr>
							<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600">
								<td colSpan={2} className="px-6 py-3">
									Йўл ҳаққи учун
								</td>
								<td colSpan={2} className="px-6 py-3">
									{mainReport?.total_money_sum_toll_expenses?.toLocaleString()}{" "}
									Cум
								</td>
								<td colSpan={2} className="px-6 py-3">
									{mainReport?.total_money_dollar_toll_expenses?.toLocaleString()}{" "}
									Доллар
								</td>
							</tr>
							<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600">
								<td colSpan={2} className="px-6 py-3">
									Озиқ овқат учун
								</td>
								<td colSpan={2} className="px-6 py-3">
									{mainReport?.total_money_sum_food_expenses?.toLocaleString()}{" "}
									Cум
								</td>
								<td colSpan={2} className="px-6 py-3">
									{mainReport?.total_money_dollar_food_expenses?.toLocaleString()}{" "}
									Доллар
								</td>
							</tr>
							<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600">
								<td colSpan={2} className="px-6 py-3">
									Ташқи Ҳаражатлатар учун
								</td>
								<td colSpan={2} className="px-6 py-3">
									{mainReport?.total_money_sum_other_expenses?.toLocaleString()}{" "}
									Cум
								</td>
								<td colSpan={2} className="px-6 py-3">
									{mainReport?.total_money_dollar_other_expenses?.toLocaleString()}{" "}
									Доллар
								</td>
							</tr>

							<tr className="bg-gray-700 text-xl text-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-500 dark:hover:bg-gray-600">
								<td colSpan={2} className="px-6 py-3">
									Касса топширди
								</td>
								<td colSpan={2} className="px-6 py-3">
									{mainReport?.finally_sum_benefit?.toLocaleString()} Cум
								</td>
								<td colSpan={2} className="px-6 py-3">
									{mainReport?.finally_dollar_benefit?.toLocaleString()} Доллар
								</td>
							</tr>
						</tbody>
					</table>
					{/* button  */}
					<PDFDownload
						sectionId="income-content"
						fileName="sahifa.pdf"
					/>
				</>
			)}
		</div>
	);
};

export default ChopReport;
