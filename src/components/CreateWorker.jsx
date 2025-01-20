import React, { useEffect, useState } from "react";
import { ICONS } from "../constants/images";
import WorkerOpeations from "../services/workerOperations";
import { toast } from "react-toastify";

const CreateWorker = ({ setShowAddWorker, onWorkerCreated }) => {
	const [name, setname] = useState("");
	const [workdays, setworkdays] = useState();
	const [fixed, setfixed] = useState("");
	const [part, setpart] = useState("office");
	const createWorkers = async () => {
		try {
			const response = await WorkerOpeations.createWorker(
				name,
				parseInt(workdays),
				parseInt(fixed),
				part,
			);
			toast.success("Ҳодим муваффақиятли қўшилди!")
			onWorkerCreated(); // Hodim yaratildi deb xabar berish
			setShowAddWorker(false);
		} catch (error) {
			console.log(error);
			toast.error("Ҳодим қўшишда хатолик юз берди!")

		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		createWorkers();
	};

	return (
		<div className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-30 flex justify-center items-center z-50">
			<div className="w-96 rounded-2xl bg-white p-6">
				<div className="flex justify-between items-center mb-6">
					<h3 className=" text-2xl font-semibold">Ҳодим қўшиш</h3>
					<button
						onClick={() => setShowAddWorker(false)}
						className="flex items-center justify-center p-2 border-none rounded-lg cursor-pointer bg-gray-300 "
					>
						<img src={ICONS.EXITMODAL} alt="" className="w-4" />
					</button>
				</div>
				<form onSubmit={handleSubmit}>
					<div className="flex flex-col gap-3">
						<select
							onChange={(e) => setpart(e.target.value)}
							className="w-full p-3 bg-gray-100 border border-gray-400 rounded-lg"
						>
							<option value="office">Офис</option>
							<option value="sandwich">Сендвич</option>
							<option value="peno_cutting">Пенопласт кесиш</option>
							<option value="peno_making">Пенопласт ясаш</option>
							<option value="other">Бошқа</option>
						</select>
						<label>
							<input
								required
								onChange={(e) => setname(e.target.value)}
								placeholder="Исм фамиляси :"
								type="text"
								className="w-full p-3 bg-gray-100 border border-gray-400 rounded-lg"
							/>
						</label>
					</div>

					<div className="flex flex-col gap-3 mt-3">
						<label>
							<input
								required
								value={fixed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
								onChange={(e) =>
									setfixed(e.target.value.toString().replaceAll(" ", ""))
								}
								placeholder="Фикса ойлик: Сум"
								type="text"
								className="w-full p-3 bg-gray-100 border border-gray-400 rounded-lg"
							/>{" "}
							{/* УЗС */}
						</label>
						<label>
							<input
								required
								onChange={(e) => setworkdays(e.target.value)}
								placeholder="Бир ойда ишлайди: Kун"
								type="text"
								className="w-full p-3 bg-gray-100 border border-gray-400 rounded-lg"
							/>{" "}
							{/* кун */}
						</label>
						<button
							type="submit"
							className="bg-blue-500 text-white py-3 mt-5 rounded-lg cursor-pointer"
						>
							Қўшиш
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CreateWorker;
