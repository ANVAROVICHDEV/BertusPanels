import { Accordion } from "flowbite-react";
import moment from "moment";

const WorkerAccordion = ({ oneWorkers }) => {
	// console.log(oneWorkers);
	return (
		<Accordion collapseAll={true} className="mb-10">
			<Accordion.Panel>
				<Accordion.Title className=" hover:bg-gray-200">
					ОЛИНГАН ОЙЛИКЛАР БАТАФСИЛ:
				</Accordion.Title>
				<Accordion.Content>
					<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
						<table className="w-full  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
							<thead className="text-xs text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
								<tr>
									<th scope="col" className="ps-6 py-3">
										N
									</th>
									<th scope="col" className="px-6 py-3">
										Тури
									</th>
									<th scope="col" className="px-6 py-3">
										Сум/Доллар
									</th>
									<th scope="col" className="px-6 py-3">
										Изох
									</th>
									<th scope="col" className="px-6 py-3">
										Берилган Вақти
									</th>
								</tr>
							</thead>
							<tbody>
								{oneWorkers?.salaries?.slice().reverse().map((item, index) => (
									<tr
										key={index}
										className="bg-white text-base dark:bg-gray-800 hover:bg-blue-300 hover:text-black dark:hover:bg-blue-600 text-center"
									>
										{/* Index */}
										<td className="ps-6 py-4">{index + 1}</td>

										{/* Type */}
										<td className="ps-6 py-4">{item.type}</td>

										{/* Money */}
										<td className="ps-6 py-4">{item.money.toLocaleString()}</td>

										{/* Comment */}
										<td className="ps-6 py-4">{item.comment}</td>

										{/* Datetime */}
										<td className="ps-6 py-4">
											{item.datetime
												? `${moment(item.datetime).format(
														"YYYY-MM-DD",
												  )} | ${moment(item.datetime).format("HH:mm:ss")}`
												: "Мавжуд эмас"}
										</td>
									</tr> 
								)) } 
							</tbody>
						</table>
					</div>
				</Accordion.Content>
			</Accordion.Panel>
			<Accordion.Panel>
				<Accordion.Title className=" hover:bg-gray-200">
					ДАВОМАТИ:
				</Accordion.Title>
				<Accordion.Content>
					<div className="relative  overflow-x-auto shadow-md sm:rounded-lg">
						<table className="w-full  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
							<thead className="text-xs text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
								<tr>
									<th scope="col" className="ps-6 py-3">
										N
									</th>
									<th scope="col" className="px-6 py-3">
										Кунлар
									</th>
									<th scope="col" className="px-6 py-3">
										Келган вақти
									</th>
									<th scope="col" className="px-6 py-3">
										Кетган вақти
									</th>
								</tr>
							</thead>
							<tbody className="text-center">
								{oneWorkers?.attendances?.slice().reverse().map((item, index) => (
									<tr
										key={index}
										className="bg-white  text-base dark:bg-gray-800 hover:bg-blue-300 hover:text-black dark:hover:bg-blue-600 text-center"
									>
										{/* Index */}
										<td className="ps-6 py-4">{index + 1}</td>

										{/* Date */}
										<td className="ps-6 py-4">
											{item.date
												? moment(item.date).format("YYYY-MM-DD")
												: "Мавжуд эмас"}
										</td>

										{/* Came Datetime */}
										<td className="ps-6 py-4">
											{item.came_datetime
												? `${moment(item.came_datetime).format(
														"YYYY-MM-DD",
												  )} | ${moment(item.came_datetime).format("HH:mm:ss")}`
												: "Мавжуд эмас"}
										</td>

										{/* Went Datetime */}
										<td className="ps-6 py-4">
											{item.went_datetime
												? `${moment(item.went_datetime).format(
														"YYYY-MM-DD",
												  )} | ${moment(item.went_datetime).format("HH:mm:ss")}`
												: "Мавжуд эмас"}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</Accordion.Content>
			</Accordion.Panel>
		</Accordion>
	);
};

export default WorkerAccordion;
