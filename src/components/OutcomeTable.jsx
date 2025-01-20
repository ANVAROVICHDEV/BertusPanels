import moment from "moment";
import { MdDelete } from "react-icons/md";
import MoneyOperations from "../services/moneyOpeations";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setRefreshRenderData } from "../slices/renderPage";

function OutcomeTable({ data }) {
	const dispatch = useDispatch();
	const typeMap = {
		usual: "Одатий",
		toll: "Йўл ҳаққи",
		food: "Озиқ Овқат",
		other: "Бошқалар",
		advance: "Aванс",
	};

	const deleteOutcome = async (id) => {
		if (window.confirm("Сиз ростдан ҳам ушбу ходимни ўчирмоқчимисиз?")) {
			try {
				const response = await MoneyOperations.deleteOutcome(id);
				toast.success("Амалиёт муваффақиятли амалга оширилди");
				dispatch(setRefreshRenderData());
			} catch (error) {
				console.log("Нимадир хато кетти қайтадан уруниб кўринг" + error);
			}
		}
	};
	return (
		<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
			<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
				<thead className="text-xs text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
					<tr>
						<th scope="col" className="px-6 py-3">
							N 
						</th>
						<th scope="col" className="px-6 py-3">
							Маҳсулот
						</th>
						<th scope="col" className="px-6 py-3">
							Ўзбек сўми
						</th>
						<th scope="col" className="px-6 py-3">
							Долларда
						</th>
						<th scope="col" className="px-6 py-3">
							Қўшимча маълумот
						</th>
						<th scope="col" className="px-6 py-3">
							Сана
						</th>
						<th scope="col" className="px-6 py-3">
							Ўчириш
						</th>
						
					</tr>
				</thead>
				<tbody>
					{data?.map((item, index) => (
						<tr
							className="bg-white text-center border-b text-base dark:bg-gray-800 dark:border-gray-700 hover:bg-blue-200 hover:text-black dark:hover:bg-gray-600"
							key={index}
						>
							<td className=" px-6 py-4">{index + 1}</td>
							<td className="px-6 py-4">
								{typeMap[item.type] || "Noma'lum type"}
							</td>
							<td className="px-6 py-4">
								{item.currency === "sum"
									? item.money?.toLocaleString("uz-UZ")
									: 0}
							</td>
							<td className="px-6 py-4">
								{item.currency == "dollar"
									? item.money?.toLocaleString("uz-UZ")
									: 0}
							</td>
							<td className="px-6 py-4">
								{item.comment.length > 16
									? item.comment.slice(0, 16) + "..."
									: item.comment}
							</td>
							<td className="px-6 py-4">
								{moment(item.dateTime).format("YYYY-MM-DD")}
							</td>
							<td className="px-6 py-4 flex justify-center">
								<MdDelete
									onClick={() => deleteOutcome(item.id)}
									className="text-red-500 text-2xl cursor-pointer"
								/>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default OutcomeTable;
