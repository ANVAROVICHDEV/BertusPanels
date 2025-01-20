import { toast } from "react-toastify";
import moment from "moment";
import { useState } from "react";
import { ICONS } from "../constants/images";
import MoneyOperations from "../services/moneyOpeations";
import { refreshData } from "../slices/dataSlice";
import { useDispatch, useSelector } from "react-redux";
function AddModalOucome({ setModalOutcome }) {
	const [comment, setComment] = useState("");
	const [money, setMoney] = useState("");
	const [type, setType] = useState("usual");
	const [currency, setCurrency] = useState("sum");
	const [date, setDate] = useState(moment().format("YYYY-MM-DDTHH:mm:ss")); // Hozirgi sana
	const { startDate, endDate } = useSelector((state) => state.date);
	const dispatch = useDispatch();
	const handleDateChange = (e) => {
		const selectedDate = e.target.value;
		const currentDateTime = moment(selectedDate)
			.set({
				hour: moment().hour(),
				minute: moment().minute(),
				second: moment().second(),
			})
			.format(`${selectedDate}THH:mm:ss`); // Sana va hozirgi vaqtni qo'shish

		setDate(currentDateTime); // Sana va vaqtni to'ldirish
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const raw = {
			type,
			money: parseFloat(money.replace(/\s/g, "")),
			comment,
			currency,
			datetime: date,
		};

		const postData = async () => {
			try {
				const response = await MoneyOperations.addOutcome(raw);
				toast.success("Амалиёт муваффақиятли амалга оширилди");
				dispatch(refreshData({ startDate, endDate }));
				setModalOutcome(false); // modalni yopish
			} catch (error) {
				console.error("Xatolik:", error.response?.data || error.message);
				toast.error("Амалиётда хатолик юз берди");
			}
		};
		postData();
	};

	return (
		<div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 flex justify-center items-center">
			<div className="w-96 bg-white p-5 rounded-xl">
				<button
					onClick={() => setModalOutcome(false)}
					className="ml-auto flex justify-center items-center p-2 rounded-lg bg-gray-300 mb-5"
				>
					<img src={ICONS.EXITMODAL} alt="Exit" className="w-3.5" />
				</button>
				<form
					onSubmit={handleSubmit}
					className="flex flex-col items-center gap-3"
				>
					<select
						onChange={(e) => setType(e.target.value)}
						value={type}
						className="w-full p-2 bg-gray-100 border border-gray-100 rounded-lg outline-none"
					>
						<option value="usual">Одатий</option>
						<option value="toll">Йўл хаққи</option>
						<option value="food">Озиқ-овқат</option>
						<option value="other">Бошқа</option>
					</select>

					<input
						required
						value={money.toLocaleString()}
						onChange={(e) => setMoney(e.target.value.replaceAll(" ", ""))}
						type="text"
						placeholder="Пул миқдори:"
						className="w-full p-2 bg-gray-100 border border-gray-100 rounded-lg outline-none"
					/>

					<input
						required
						value={comment}
						onChange={(e) => setComment(e.target.value)}
						type="text"
						placeholder="Изоҳ / Маҳсулот номи :"
						className="w-full p-2 bg-gray-100 border border-gray-100 rounded-lg outline-none"
					/>

					<select
						onChange={(e) => setCurrency(e.target.value)}
						value={currency}
						className="w-full p-2 bg-gray-100 border border-gray-100 rounded-lg outline-none"
					>
						<option value="sum">сум</option>
						<option value="dollar">доллар</option>
					</select>

					{/* Sana inputi */}
					<input
						type="date"
						value={date.slice(0, 10)} // Faqat sanani ko'rsatish
						onChange={handleDateChange}
						placeholder="Сана"
						className="w-full p-2 bg-gray-100 border border-gray-100 rounded-lg outline-none"
					/>

					<button
						type="submit"
						className="w-full p-3 bg-indigo-500 text-white rounded-lg mt-5 cursor-pointer"
					>
						Қўшиш
					</button>
				</form>
			</div>
		</div>
	);
}

export default AddModalOucome;
