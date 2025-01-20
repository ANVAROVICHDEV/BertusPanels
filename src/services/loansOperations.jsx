import axios from "./api";

const LoansOperations = {
	// POST LOANS
	async giveLoans(value, id) {
		// console.log(id, value)
		const response = await axios.post(
			`/loans/create`,
			{
				total: value,
				worker_id: id,
			},
			{
				headers: {
					Accept: "application/json",
				},
			},
		);
		return response;
	},
	

};

export default LoansOperations;
