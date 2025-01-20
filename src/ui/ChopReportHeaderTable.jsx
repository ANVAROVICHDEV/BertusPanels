import React from "react";

const ChopReportHeaderTable = ({name}) => {
	return (
		<tr className="bg-gray-200">
			<th scope="col" colSpan={6} className="px-6 py-3">
				<h2 className="text-lg font-semibold">{name}</h2>
			</th>
		</tr>
	);
};

export default ChopReportHeaderTable;
