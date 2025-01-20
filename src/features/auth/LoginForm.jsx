import { LOGOS, BACKGROUNDS } from "../../constants/images";
import { FaRegUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { Input } from "../../ui/index";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
	loginUserFailture,
	loginUserStart,
	loginUserSuccess,
} from "../../slices/auth";
import AuthService from "../../services/authService";
import { getItem } from "../../helpers/persistanse-storage";
const LoginForm = () => {
	const dispatch = useDispatch();
	const { isLoading } = useSelector((state) => state.auth);
	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	useEffect(() => {
		// Agar token mavjud bo'lsa, foydalanuvchini asosiy sahifaga yo'naltirish
		if (getItem("access_token")) {
			navigate("/"); // yoki kerakli sahifaga yo'naltirish
		}
	}, [navigate]);

	const handleLogin = async (e) => {
		e.preventDefault();
		dispatch(loginUserStart());
		const user = new URLSearchParams({
			grant_type: "password",
			username: username,
			password: password,
			scope: "",
			client_id: "string",
			client_secret: "string",
		});

		try {
			const response = await AuthService.userLogin(user, {
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
					accept: "application/json",
				},
			});
			dispatch(loginUserSuccess(response.data));
			toast.success("Login successful!"); // Muvaffaqiyatli login xabari
			navigate("/");
		} catch (error) {
			dispatch(loginUserFailture(error.response?.data?.detail));
			toast.error("Login failed!"); // Xatolik haqida xabar
		}
	};

	return (
		<div
			className="flex items-center justify-center h-screen bg-cover bg-center"
			style={{ backgroundImage: `url(${BACKGROUNDS.LOGIN})` }}
		>
			<div className="bg-loginBackgroud p-6 rounded-3xl w-full max-w-md">
				<div className="text-center mb-6">
					<img
						src={LOGOS.LOGIN}
						alt="Logo"
						className="mx-auto w-24 -mt-[70px]"
					/>
				</div>
				<form className="space-y-4 w-[400px] rounded">
					<Input
						placeholder={"Логин :"}
						icon={<FaRegUser />}
						state={username}
						setState={setUsername}
					/>

					<Input
						placeholder={"Парол :"}
						icon={<RiLockPasswordLine />}
						type={"password"}
						state={password}
						setState={setPassword}
					/>
					<button
						disabled={isLoading}
						onClick={handleLogin}
						type="submit"
						className="w-full py-3 text-lg font-medium text-white bg-loginButton rounded-xl hover:bg-blue-700 transition"
					>
						{isLoading ? "Loading..." : "Login"}
					</button>
				</form>
			</div>
		</div>
	);
};

export default LoginForm;
