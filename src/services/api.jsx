import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { getItem, setItem, removeItem } from "../helpers/persistanse-storage";

// API asosiy manzili
axios.defaults.baseURL = "https://iteachpython.uz";

// Token muddati tugaganligini tekshirish
const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const decodedToken = jwtDecode(token);
    const { exp } = decodedToken;

    const currentTime = Date.now() / 1000; // Hozirgi vaqtni olish
    const isExpired = currentTime >= exp; // Token muddati tugaganmi

    console.log(`Token muddati (exp): ${new Date(exp * 1000)}`);
    console.log(`Hozirgi vaqt: ${new Date(currentTime * 1000)}`);
    console.log(`Token tugaganmi? ${isExpired}`);
    
    return isExpired;
  } catch (err) {
    console.error("Tokenni dekodlashda xatolik:", err);
    return true;
  }
};





// Foydalanuvchini tizimdan chiqarish funksiyasi
let isLoggingOut = false;
const handleLogout = () => {
  if (isLoggingOut) return;
  isLoggingOut = true;

  removeItem("access_token");
  removeItem("refresh_token");
  removeItem("access_token_expires_in");
  removeItem("refresh_token_expires_in");
  console.log("Foydalanuvchi tizimdan chiqarildi.");
  window.location.href = "/login";
};

// Access tokenni yangilash funksiyasi
const refreshAccessToken = async () => {
  const refreshToken = getItem("refresh_token");
  if (!refreshToken || isTokenExpired(refreshToken)) {
    console.warn("Refresh token yaroqsiz yoki mavjud emas.");
    handleLogout();
    return null;
  }

  try {
    const response = await axios.post("/refresh_token", null, {
      params: { refresh_token: refreshToken },
      headers: { Accept: "application/json" },
    });

    const newToken = response.data.access_token;
    if (newToken) {
      setItem("access_token", newToken);
      console.log("Access token muvaffaqiyatli yangilandi.");
      return newToken;
    }
    throw new Error("Access token olishda xatolik.");
  } catch (error) {
    console.error("Refresh token ishlamayapti:", error);
    handleLogout();
    return null;
  }
};

// So'rovlar uchun interseptor
axios.interceptors.request.use((config) => {
  const token = getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Javoblar uchun interseptor
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log("Interceptor xatosi:", error.response?.status);

    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      console.log("401 qayta urinish jarayoni boshlandi...");

      const newToken = await refreshAccessToken();
      if (newToken) {
        console.log("Token muvaffaqiyatli yangilandi. So‘rov qayta yuborilmoqda...");
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axios(originalRequest);
      }
    }
    console.warn("Interceptor orqali token yangilanmadi.");
    return Promise.reject(error);
  }
);

// Tokenlarni avtomatik tekshirish va yangilash
const startTokenCheck = () => {
  setInterval(async () => {
    console.log("Tokenni tekshirish jarayoni boshlandi...");
    const accessToken = getItem("access_token");
    if (accessToken && isTokenExpired(accessToken)) {
      console.log("Access token muddati tugagan, yangilanmoqda...");
      const newToken = await refreshAccessToken();
      if (!newToken) {
        console.warn("Tokenni yangilash imkonsiz, foydalanuvchi chiqariladi.");
        handleLogout();
      }
    }
  }, 60000); // 1 daqiqada bir marta tekshiradi
};


startTokenCheck();

export default axios;
