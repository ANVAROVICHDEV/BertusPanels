import axios from "./api";

const WorkerOpeations = {
	// GET ALL WORKERS
	async allWorkers(workerId, part = null, currentPage = 1, inputValue = "") {
		const response = await axios.get(`/workers/get`, {
			params: {
				ident: workerId,
				search: inputValue,
				part: part,
				page: currentPage,
				limit: 10,
			},
			headers: {
				Accept: "application/json",
			},
		});
		return response.data;
	},
	// GET ONE WORKER
	async oneWorkers(id) {
		const response = await axios.get(`/workers/get`, {
			params: {
				ident: id,
				page: 1,
				limit: 25,
			},
			headers: {
				Accept: "application/json",
			},
		});
		return response.data;
	},
	// CREATE WORKER
	async createWorker(name, workday, fixed, part) {
		const response = await axios.post(
			`/workers/create`,
			{
				name: name,
				workdays: workday,
				fixed: fixed,
				part: part,
			},
			{
				headers: {
					Accept: "application/json",
				},
			},
		);
		return response.data;
	},
	// DELETE WORKER

	async deleteWorker(workerID) {
		const response = await axios.delete(
			`/workers/delete`,
			{
				params: {
					ident: workerID,
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

	// UPDATE WORKER
	async updateWorker({ id, name, workdays, formattedFixed, part, formattedBalance }) {
		const response = await axios.put('/workers/update', {
			id: id,
			name: name,
			workdays: workdays,
			fixed: formattedFixed,
			part: part,
			balance: formattedBalance,
		  }, {
			headers: {
			  Accept: 'application/json',
			},
		  });
		  return response
	  }

	  
	  
	  
};
export default WorkerOpeations;
