import React from "react";
import { MdKeyboardBackspace } from "react-icons/md";
import { Link } from "react-router-dom";

const BackToButton = ({location, color="bg-blue-500"}) => {
	return (
		<Link to={location}>
			<button className={`px-6 py-2 text-white rounded-xl flex items-center gap-3 text-base cursor-pointer ${color}`}>
				<MdKeyboardBackspace className="w-5 h-5" /> <span>Орқага</span>
			</button>
		</Link>
	);
};

export default BackToButton;
