import { Navigate } from "react-router-dom";
import { getItem } from "../../helpers/persistanse-storage";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!getItem("access_token");

  // Autentifikatsiya tekshiruv holati
  if (!isAuthenticated) {
    console.warn("Foydalanuvchi autentifikatsiyadan o'tmagan. Login sahifasiga yo'naltirilyapti.");
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute
