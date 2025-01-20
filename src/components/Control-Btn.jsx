import React from "react";

const ControlBtn = ({ name, onClick, active }) => {
	return (
		<button
			onClick={onClick}
			className={`py-3 px-6 rounded-lg text-black transition-colors duration-300 ${
				active
					? "bg-gray-400 text-white hover:bg-gray-500"
					: "bg-gray-200 hover:bg-gray-300"
			}`}
		>
			{name}
		</button>
	);
};

export default ControlBtn;
