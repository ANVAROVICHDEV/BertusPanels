import React, { useState } from "react";
import { BackToButton, WorkersInfo, FileInput, SearchInput } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Attendance from "../services/attendance";
import { toast } from "react-toastify";

const WorkersPage = () => {
	const [file, setFile] = useState(null); // Faylni saqlash uchun state
	const inputValue = useSelector((state) => state.input.value);

	const handleSubmit = async (event) => {
		event.preventDefault();
	  
		if (!file) {
		  toast.error("Илтимос, файл танланг!");
		  return;
		}
	  
		const formData = new FormData();
		formData.append("file", file);
	  
		// Debug uchun yuborilayotgan ma'lumotni konsolda ko'ring
		// for (let pair of formData.entries()) {
		//   console.log(`${pair[0]}: ${pair[1]}`);
		// }
	  
		try {
		  const response = await Attendance.attendanceWorker(formData);
		  toast.success("Файл муваффақиятли юборилди!");
		} catch (error) {
		  if (error.response) {
			const { detail } = error.response.data;
			toast.error(detail || "Файлни юклашда хато юз берди!");
		  } else {
			toast.error("Серверга уланишда хато юз берди.");
		  }
		}
	  };
	  

	return (
		<div>
			<nav className="flex justify-between items-center py-5 ">
				<div className="detailLogo">
					<BackToButton location={"/"} color="bg-blue-700 hover:bg-blue-500" />
				</div>

				<SearchInput inputValue={inputValue} />

				<FileInput file={file} setFile={setFile} handleSubmit={handleSubmit} />

				<Link
					title="Кун, Ой, Йиллик ҳисоботларни чоп этиш"
					to={"/chop-worker-salaries"}
					className="flex items-center gap-4 bg-gray-200 text-black px-7 py-2 rounded-lg text-base"
				>
					Чоп етиш{" "}
				</Link>
			</nav>
			<WorkersInfo />
		</div>
	);
};

export default WorkersPage;
