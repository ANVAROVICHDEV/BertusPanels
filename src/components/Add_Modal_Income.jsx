import { toast } from "react-toastify";
import moment from "moment";
import { useState } from "react";
import { ICONS } from "../constants/images";
import MoneyOperations from "../services/moneyOpeations";
import { useDispatch, useSelector } from "react-redux";
import { refreshData } from "../slices/dataSlice";

function AddModalIncome({ setModalIncome }) {
	const [name, setName] = useState("");
	const [comment, setComment] = useState("");
	const [money, setMoney] = useState("");
	const [type, setType] = useState("sandwich");
	const [currency, setCurrency] = useState("sum");
	const [date, setDate] = useState(moment().format("YYYY-MM-DDTHH:mm:ss")); // Hozirgi sana
	const dispatch = useDispatch();
	const { startDate, endDate } = useSelector((state) => state.date);
	const handleDateChange = (e) => {
		const selectedDate = e.target.value;
		const currentDateTime = moment(selectedDate)
			.set({
				hour: moment().hour(),
				minute: moment().minute(),
				second: moment().second(),
			})
			.format(`${selectedDate}THH:mm:ss`);
		setDate(currentDateTime);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const raw = {
			name,
			type,
			money: parseFloat(money.replace(/\s/g, "")),
			comment,
			currency,
			datetime: date,
		};
		const postData = async () => {
			try {
				const response = await MoneyOperations.addIncome(raw);
				toast.success("Амалиёт муваффақиятли амалга оширилди");
				dispatch(refreshData({ startDate, endDate }));
				setModalIncome(false); // modalni yopish
			} catch (error) {
				console.error("Xatolik:", error.response?.data || error.message);
				toast.error("Амалиётда хатолик юз берди");
			}
		};
		postData();
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
			<div className="w-96 bg-white p-6 rounded-lg">
				<button
					onClick={() => setModalIncome(false)}
					className="ml-auto flex justify-center items-center p-2 rounded-lg bg-gray-300 mb-5"
				>
					<img src={ICONS.EXITMODAL} alt="Exit" className="w-4" />
				</button>
				<form onSubmit={handleSubmit} className="flex flex-col gap-4">
					<input
						required
						value={name}
						onChange={(e) => setName(e.target.value)}
						type="text"
						placeholder="Мижоз исми :"
						className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
					/>
					<select
						value={type}
						onChange={(e) => setType(e.target.value)}
						className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
					>
						<option value="sandwich">Сендвич</option>
						<option value="pena">Пенопласт</option>
						<option value="other">Бошқа...</option>
					</select>
					<input
						required
						value={money.toLocaleString()}
						onChange={(e) =>
							setMoney(e.target.value.toString().replaceAll(" ", ""))
						}
						type="text"
						placeholder="Пул миқдори:"
						className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
					/>
					<input
						required
						value={comment}
						onChange={(e) => setComment(e.target.value)}
						type="text"
						placeholder="Изоҳ / Маҳсулот номи :"
						className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
					/>
					<select
						value={currency}
						onChange={(e) => setCurrency(e.target.value)}
						className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
					>
						<option value="sum">Сум</option>
						<option value="dollar">Доллар</option>
					</select>
					<input
						type="date"
						value={date.slice(0, 10)}
						onChange={handleDateChange}
						className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
					/>
					<button
						type="submit"
						className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
					>
						Қўшиш
					</button>
				</form>
			</div>
		</div>
	);
}

export default AddModalIncome;
