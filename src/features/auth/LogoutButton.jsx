import { useDispatch } from "react-redux";
import { logoutUser } from "../../slices/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LogoutButton = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = () => {
		try {
			// Redux state'ini yangilash
			dispatch(logoutUser());
      toast.success("LogOut successful!"); // Muvaffaqiyatli login xabari
			// Foydalanuvchini login sahifasiga yo'naltirish
			navigate("/login");
		} catch (error) {
      toast.error("LogOut unSuccessful!"); // Muvaffaqiyatli login xabari
    }
	};

	return (
		<button onClick={handleLogout} className="bg-red-500 text-white px-5 py-2 rounded-lg text-lg">
			Тизимдан чиқиш
		</button>
	);
};

export default LogoutButton;
