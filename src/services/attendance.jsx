import axios from "./api";

const Attendance = {
	async attendanceWorker(formData) {
		const response = await axios.post(
			`/attendances/import-attendance/`,
			formData,
			{
				headers: {
					"Content-Type": "multipart/form-data",
					Accept: "application/json",
				},
			},
		);
		return response.data;
	},
};

export default Attendance;
