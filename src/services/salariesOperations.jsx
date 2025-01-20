import axios from "./api";

const SalariesOperations = {
	// GET SALARIES
	async allSalaries(startDate, endDate) {
		const response = await axios.get(`/salaries/get`, {
			params: {
				ident: 0,
				start_date: startDate,
				end_date: endDate,
				page: 1,
				limit: 1000,
			},
			headers: {
				Accept: "application/json",
			},
		});
		return response.data;
	},
	// POST SALARIES
	async giveSalaries(type, id, money, comment, currency) {
		const response = await axios.post(
			`/salaries/create`,
			{
				type: type,
				worker_id: id,
				money: money,
				comment: comment,
				currency: currency,
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

export default SalariesOperations;
