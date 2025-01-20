import { Link } from "react-router-dom";

const AllReportUI = ({ title, name, sum = 0, dollar = 0, locatioN }) => {
	return (
		<tr className="text-lg">
			<td
				className={`p-2 border-r-2 border-gray-300 font-bold ${
					title === "КИРИМ" ? "text-green-500" : "text-red-500"
				}`}
			>
				<h3>{title}</h3>
			</td>
			<td className="border-r-2 border-gray-300">{name}</td>
			<td className="p-2 border-r-2 border-gray-300">{sum} УЗС</td>
			<td className="p-2 border-r-2 border-gray-300">{dollar} УСД</td>
			<td>
				<Link to={locatioN} className="text-blue-500">
					Батафсил малумот
				</Link>
			</td>
		</tr>
	);
};

export default AllReportUI;
