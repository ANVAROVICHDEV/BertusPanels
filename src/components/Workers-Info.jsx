import ControlBtn from "./Control-Btn";
import { ICONS } from "../constants/images";
import { useState } from "react";
import { CreateWorker, WorkersTable } from "../index";
const WorkersInfo = () => {
	const [activeBtn, setActiveBtn] = useState("Ҳаммаси");
	const [part, setPart] = useState(null);
	const [showAddWorker, setShowAddWorker] = useState(false);
	const [workersUpdated, setWorkersUpdated] = useState(false);

	const buttons = [
		{ name: "Ҳаммаси", part: null },
		{ name: "Офис", part: "office" },
		{ name: "Сендвич", part: "sandwich" },
		{ name: "Пенопласт кесиш", part: "peno_cutting" },
		{ name: "Пенопласт ясаш", part: "peno_making" },
		{ name: "Бошқа", part: "other" },
	];

	const handleBtnClick = (part, name) => {
		setPart(part);
		setActiveBtn(name); // Bosilgan tugmani saqlash
	};

	const handleWorkersUpdated = () => {
		setWorkersUpdated(!workersUpdated); // Holatni yangilash
	};
	return (
		<div>
			<nav className="flex justify-between items-center mt-7">
				<button
					onClick={() => setShowAddWorker(true)}
					className="flex justify-around items-center gap-4 bg-blue-700 py-3 px-6 rounded-lg text-white"
				>
					<span>Ҳодим қўшиш</span>
					<img className="w-5 h-5 relative top-0.5" src={ICONS.PLUS} alt="" />
				</button>

				{buttons.map((item) => (
					<ControlBtn
						key={item.name}
						name={item.name} // name qiymatini ControlBtn komponentiga uzatamiz
						onClick={() => handleBtnClick(item.part, item.name)} // Bosilgan tugma nomini qayta saqlash
						active={activeBtn === item.name} // Hozirgi faollashtirilgan tugma bilan solishtirish
					/>
				))}
			</nav>

			<WorkersTable part={part} workersUpdated={workersUpdated} />
			{showAddWorker && (
				<CreateWorker
					onWorkerCreated={handleWorkersUpdated}
					setShowAddWorker={setShowAddWorker}
				/>
			)}
		</div>
	);
};

export default WorkersInfo;
