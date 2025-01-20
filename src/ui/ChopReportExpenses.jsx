import { format } from "date-fns";

const ChopReportExpenses = ({ mainReport, type }) => {
	const typeMap = {
		usual: "Одатий",
		toll: "Йўл ҳаққи",
		food: "Озиқ Овқат",
		other: "Бошқалар",
	};
	return (
		<>
			{mainReport?.expenses?.filter((item) => item.type === type).length > 0 ? (
				mainReport?.expenses
					?.filter((item) => item.type === type)
					.map((item, index) => (
						<tr
							key={item.id}
							className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
						>
							<td className="px-6 py-2">{(index += 1)}</td>
							<td className="px-6 py-2">{item.comment}</td>
							<td className="px-6 py-2">{typeMap[item.type]}</td>
							<td className="px-6 py-2">
								{item.currency === "sum"
									? item.amount.toLocaleString() + " Cум"
									: 0}
							</td>
							<td className="px-6 py-2">
								{item.currency === "dollar"
									? item.amount.toLocaleString() + " Доллар"
									: 0}
							</td>
							<td className="px-6 py-2">
								{format(new Date(item.datetime), "dd-MM-yyyy") +
									", " +
									format(new Date(item.datetime), "HH:mm:ss")}
							</td>
						</tr>
					))
			) : (
				<tr>
					<td className="border border-gray-300" colSpan={6}>
						Маълумот мавжуд эмас
					</td>
				</tr>
			)}
		</>
	);
};

export default ChopReportExpenses;
