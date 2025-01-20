import React, { useState } from "react";
import { ICONS } from "../constants/images";
import SalariesOperations from "../services/salariesOperations";
import { toast } from "react-toastify";

const GiveSalaryWorker = ({
	setShowGiveSalary,
	restRender,
	setRestRender,
	id,
}) => {
	const [type, settype] = useState("kpi");
	const [money, setmoney] = useState("");
	const [comment, setcomment] = useState("");
	const [currency, setcurrency] = useState("sum");
	const salariesGet = async () => {
		try {
			const response = await SalariesOperations.giveSalaries(
				type,
				id,
				money,
				comment,
				currency,
			);
			setRestRender(!restRender);
			setShowGiveSalary(false);
			toast.success("Амалиёт муваффақиятли амалга оширилди");
		} catch (error) {
			console.log(error);
			toast.error("Амалиётда хатолик юз берди");
		}
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		salariesGet();
	};
	return (
		<div class="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-30 flex justify-center items-center z-50">
			<div class="w-full max-w-3xl bg-white rounded-3xl p-6 md:p-10">
				<div className="flex justify-between items-center">
					<h3 class="text-lg md:text-2xl font-semibold mb-8">Ойлик бериш</h3>
					<button
						class="ml-auto flex items-center justify-center p-2 bg-gray-300 rounded-md mb-5 hover:bg-gray-400"
						onClick={() => setShowGiveSalary(false)}
					>
						<img src={ICONS.EXITMODAL} alt="exit" class="w-4" />
					</button>
				</div>
				<form onSubmit={handleSubmit} class="space-y-6">
					<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
						<select
							class="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
							onChange={(e) => settype(e.target.value)}
						>
							<option value="kpi">кпи</option>
							<option value="work_day_bonus">Кунлик бонус</option>
							<option value="extra_bonus">ехтра_бонус</option>
							<option value="penalty">Жарима</option>
							<option value="pension">пенсия</option>
							<option value="advance">аванс</option>
							<option value="absolute">абсолуте</option>
							<option value="loan">Қарзини олиш</option>
						</select>
						<input
							type="text"
							placeholder="Изоҳ қўшиш"
							class="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
							onChange={(e) => setcomment(e.target.value)}
						/>
					</div>
					<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div class="relative">
							<input
								type="text"
								placeholder="Пул миқдори:"
								class="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
								value={money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
								onChange={(e) =>
									setmoney(e.target.value.toString().replaceAll(" ", ""))
								}
							/>
						</div>
						<select
							class="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
							onChange={(e) => setcurrency(e.target.value)}
						>
							<option value="sum">сум</option>
							<option value="dollar">доллар</option>
						</select>
					</div>
					<button
						type="submit"
						class="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
					>
						Берилди
					</button>
				</form>
			</div>
		</div>
	);
};

export default GiveSalaryWorker;
