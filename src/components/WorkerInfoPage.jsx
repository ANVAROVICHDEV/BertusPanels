import React, { useEffect, useState } from "react";
import { BackToButton, CreateWorker, GiveSalaryWorker, Loader, Loans, WorkerAccordion, WorkerEdit } from "../index";
import WorkerOpeations from "../services/workerOperations";
import { useNavigate, useParams } from "react-router-dom";
import { ICONS } from "../constants/images";
import { toast } from "react-toastify";

const WorkerInfoPage = () => {
	const { id } = useParams(); // dynamic URL parametrini olish
	const [oneWorkers, setOneWorkers] = useState(null);
	const [loading, setLoading] = useState(false);
	const [workdayCount, setWorkdayCount] = useState(null);
	const [showGiveSalary, setShowGiveSalary] = useState(false);
	const [restRender, setRestRender] = useState(false)
	const [showLoans, setShowLoans] = useState(false)
	const [showUpdate, setShowUpdate] = useState(false)

	const navigate = useNavigate()
	const typeMap = {
		office: "Офис",
		sandwich: "Сендвич",
		peno_cutting: "Пенопласт кесиш",
		peno_making: "Пенопласт ясаш",
		other: "Бошқалар",
	};
	const oneworkerGet = async () => {
		setLoading(true);
		try {
			const response = await WorkerOpeations.oneWorkers(id);
			setOneWorkers(response.data[0]); // Ma'lumotlarni olish va saqlash
			setWorkdayCount(response.attendance_count);
			setLoading(false);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	const handleDeleteWorker = async (workerID) => {
		if(window.confirm("Сиз ростдан ҳам ушбу ходимни ўчирмоқчимисиз?")){
			try {
				const response = await WorkerOpeations.deleteWorker(workerID)
				toast.success("Ходим муваффақиятли ўчирилди!")
				navigate("/workers")
			} catch (error) {
				console.log(error)
				toast.error("Ходимни ўчиришда хатолик юз берди!")
			}
		}
		
	}

	useEffect(() => {
		if (id) {
			oneworkerGet(); 
		}
	}, [id, restRender]);



	return loading ? (
		<Loader />
	) : (
		oneWorkers && (
			<>
				<BackToButton location={"/workers"} />

				<div className="relative h-[230px] flex justify-between items-start flex-wrap bg-white border-2 border-gray-300 shadow-lg rounded-2xl my-10">
					<div className="flex items-center gap-2.5 px-10 py-2.5 my-2">
						<div>
							<p>
								<b>ФИШ: </b>
							</p>
							<p>{oneWorkers.name}</p>
						</div>
					</div>
					<div className="flex items-center gap-2.5 px-10 py-2.5 border-l-2 border-r-2 border-gray-300 my-2">
						<div>
							<p>
								<b>Иш куни:</b>
							</p>
							<p>
								{workdayCount} / {oneWorkers.workdays} кун
							</p>
						</div>
					</div>
					<div className=" flex items-center gap-2.5 px-10 py-2.5  border-r-2 border-gray-300 my-2">
						<div>
							<p>
								<b>Фикса маоши:</b>
							</p>
							<p>{oneWorkers.fixed?.toLocaleString()} сўм</p>
						</div>
					</div>
					<div className=" flex items-center gap-2.5 px-10 py-2.5  border-r-2 border-gray-300 my-2">
						<div>
							<p>
								<b>Баланси:</b>
							</p>
							<p>{oneWorkers.balance?.toLocaleString()}</p>
						</div>
					</div>
					<div className=" flex items-center gap-2.5 px-10 py-2.5  border-r-2 border-gray-300 my-2">
						<div>
							<p>
								<b>Бўлим:</b>
							</p>
							<p>{typeMap[oneWorkers.part]}</p>
						</div>
					</div>
					<div className=" loans flex flex-col gap-2.5 px-5 py-2.5   border-gray-300 my-2">
						<div>
							<p>
								<b>Олинган қарзлар:</b>
							</p>
							<br />
							{oneWorkers.loans[0]?.total ? (
								<>
									<p>
										<b>Қиймати:</b>{" "}
										{oneWorkers.loans[0]?.total?.toLocaleString()}
									</p>
									<p>
										<b>Қолган қарз:</b>{" "}
										{oneWorkers.loans[0]?.residual?.toLocaleString()}
									</p>
									<p>
										<b>Санаси:</b> {oneWorkers.loans[0]?.datetime.slice(0, 10)}
									</p>
								</>
							) : (
								<p>Қарз олинмаган!</p>
							)}
						</div>
					</div>

					<div className=" absolute right-2.5 bottom-2.5 flex items-end justify-end gap-2.5 p-0 m-0">
						<button
							onClick={() => handleDeleteWorker(oneWorkers.id)}
							className=" bg-blue-500 text-white h-7 flex items-center justify-center rounded px-2 cursor-pointer"
						>
							Ўчириш
						</button>
						<button
							onClick={() => {
							
								setShowGiveSalary(true);
							}}
							className="bg-blue-500 text-white h-7 flex items-center justify-center rounded px-2 cursor-pointer"
						>
							Ойлик бериш
						</button>
						<button
							onClick={() => {
								setShowLoans(true);
							}}
							className="bg-blue-500 text-white h-7 flex items-center justify-center rounded px-2 cursor-pointer"
						>
							Қарз бериш
						</button>
						<button
							onClick={() => setShowUpdate(true)}
							className="workerEdit bg-blue-500 text-white h-7 flex items-center justify-center rounded px-2 cursor-pointer"
						>
							<img src={ICONS.EDIT} alt="" className="w-5" />
						</button>
					</div>
				</div>
				<WorkerAccordion oneWorkers={oneWorkers}/>
				{
					showGiveSalary && <GiveSalaryWorker id={id} restRender={restRender} setRestRender={setRestRender} setShowGiveSalary={setShowGiveSalary}/>
				}

				{
					showLoans && <Loans id={id} restRender={restRender} setRestRender={setRestRender} setShowLoans={setShowLoans}/>
				}

				{
					showUpdate && <WorkerEdit id={id} setShowUpdate={setShowUpdate} restRender={restRender} setRestRender={setRestRender}/>
				}
			</>
		)
	);
};

export default WorkerInfoPage;
