import React, { useState } from "react";
import { ICONS } from "../constants/images";
import LoansOperations from "../services/loansOperations";
import { toast } from "react-toastify";

const Course = ({ setShowLoans , id, restRender , setRestRender}) => {
	const [value, setValue] = useState("");
    
    const giveLoansWorker = async () => {
        try {
			const response = await LoansOperations.giveLoans(value ,id)
			setRestRender(!restRender);
			setShowLoans(false);
			toast.success("Амалиёт муваффақиятли амалга оширилди");
		} catch (error) {
			console.log(error);
			toast.error("Амалиётда хатолик юз берди");
		}
    }
	const handleSubmit = (e) => {
		e.preventDefault();
        giveLoansWorker()
	};
	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black/30 z-[999]">
			<div className="w-[400px] rounded-2xl bg-white p-5 ">
				<button
					onClick={() => {
						setShowLoans(false);
					}}
					className="ml-auto mb-5 flex items-center justify-center rounded-lg bg-gray-300 p-2 hover:bg-gray-400"
				>
					<img src={ICONS.EXITMODAL} alt="" className="w-4" />
				</button>
				<h3 className="mb-8 text-xl font-semibold">Қарз миқдорини белгилаш</h3>
				<form onSubmit={handleSubmit} className="flex flex-col gap-4">
					<div className="flex flex-col items-center gap-4 sm:gap-2">
						<label className="w-full">
							<input
								required
								value={value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
								onChange={(e) => {
									setValue(e.target.value.toString().replaceAll(" ", ""));
								}}
								placeholder="Бериладиган пул миқдорини киритинг!"
								type="text"
								className="w-full rounded-lg border border-gray-300 bg-gray-100 p-3 text-lg focus:border-blue-500 focus:outline-none sm:text-base"
							/>
						</label>
						<button
							type="submit"
							className="w-full rounded-lg bg-blue-500 px-5 py-3 text-white hover:bg-blue-600"
						>
							Берилди
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Course;
