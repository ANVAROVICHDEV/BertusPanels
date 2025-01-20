import axios from "./api";

const MoneyOperations = {
	// Main Opeations GET
	async mainOperations(startDate, endDate) {
		const response = await axios.get(`/daily_data/all-data/`, {
			params: {
				start_date: startDate,
				end_date: endDate,
			},
			headers: {
				Accept: "application/json",
			},
		});
		return response.data;
	},

	// All Income && Outcome GET
	async allIncome(startDate, endDate, type, inputValue) {
		const response = await axios.get(`/incomes/get`, {
			params: {
				ident: 0,
				_type: type,
				search: inputValue,
				start_date: startDate,
				end_date: endDate,
				page: 1,
				limit: 25,
			},
			headers: {
				Accept: "application/json",
			},
		});
		return response.data;
	},
	async allOutcome(startDate, endDate, type, inputValue) {
		const response = await axios.get(`/expenses/get`, {
			params: {
				ident: 0,
				_type: type,
				search: inputValue,
				start_date: startDate,
				end_date: endDate,
				page: 1,
				limit: 25,
			},
			headers: {
				Accept: "application/json",
			},
		});
		return response.data;
	},

	// Add Income && Outcome POST
	async addIncome(raw) {
		const response = await axios.post(`/incomes/create`, raw, {
			headers: {
				Accept: "application/json",
			},
		});
		return response;
	},
	async addOutcome(raw) {
		const response = await axios.post(`/expenses/create`, raw, {
			headers: {
				Accept: "application/json",
			},
		});
		return response;
	},

	// Delete Income && Outcome DELETE

	async deleteIncome(id) {
		const response = await axios.delete(
			`/incomes/delete`,
			{
				params: {
					ident: id,
				},
			},
			{
				headers: {
					Accept: "application/json",
				},
			},
		);
		return response;
	},
	async deleteOutcome(id) {
		const response = await axios.delete(
			`/expenses/delete`,
			{
				params: {
					ident: id,
				},
			},
			{
				headers: {
					Accept: "application/json",
				},
			},
		);
		return response;
	},


	// CURRENCIES OPETATIONS

	// GET CURRENCIES
	async getCurrencies() {
		const response = await axios.get(`/currencies/get`, {
			params: {
				ident: 0,
				status:true
			},
			headers: {
				Accept: "application/json",
			},
		});
		return response.data;
	},

	// CREATE CURRENCIES

	async createCurrencies(value) {
		const response = await axios.post(`/currencies/create`, {
			price:value
		}, {
			headers: {
				Accept: "application/json",
			},
		});
		return response;
	},
};

export default MoneyOperations;
