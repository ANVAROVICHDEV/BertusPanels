// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {jwtDecode} from "jwt-decode"; // To'g'ri import
// import { getItem, setItem, removeItem } from "../../helpers/persistanse-storage";
// import { useNavigate } from "react-router-dom"; // Login sahifasiga yo'naltirish uchun

// const TokenTester = () => {
//   const [accessToken, setAccessToken] = useState(getItem("access_token") || "");
//   const [refreshToken, setRefreshToken] = useState(getItem("refresh_token") || "");
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   // Access Tokenning muddati tugaganligini tekshiradi
//   const isTokenExpired = (token) => {
//     if (!token) return true;
//     try {
//       const decodedToken = jwtDecode(token);
//       const currentTime = Date.now() / 1000;
//       return decodedToken.exp < currentTime;
//     } catch (error) {
//       console.error("Tokenni dekodlashda xatolik:", error);
//       return true;
//     }
//   };

//   // Refresh Tokenning muddati tugaganligini tekshiradi
//   const isRefreshTokenExpired = (refreshToken) => {
//     if (!refreshToken) return true;
//     try {
//       const decodedToken = jwtDecode(refreshToken);
//       const currentTime = Date.now() / 1000;
//       return decodedToken.exp < currentTime;
//     } catch (error) {
//       console.error("Refresh tokenni dekodlashda xatolik:", error);
//       return true;
//     }
//   };

//   const refreshAccessToken = async () => {
//     try {
//       setResult(null);
//       setError(null);

//       const response = await axios.post(
//         `/refresh_token`,
//         null,
//         {
//           params: { refresh_token: refreshToken },
//           headers: { Accept: "application/json" },
//         }
//       );

//       const newAccessToken = response.data.access_token;

//       setItem("access_token", newAccessToken);
//       setAccessToken(newAccessToken);
//       setResult("Access token muvaffaqiyatli yangilandi!");
//     } catch (err) {
//       setError("Access tokenni yangilashda xatolik: " + err.message);
//     }
//   };

//   useEffect(() => {
//     const checkAndRefreshToken = async () => {
//       if (isTokenExpired(accessToken)) {
//         console.log("Access token muddati tugagan, yangilanmoqda...");
//         await refreshAccessToken();
//       } else {
//         console.log("Access token hali yaroqli.");
//       }

//       if (isRefreshTokenExpired(refreshToken)) {
//         console.log("Refresh token muddati tugagan, foydalanuvchi tizimdan chiqarilmoqda...");
//         // LocalStorage dan barcha ma'lumotlarni o'chiradi va login sahifasiga yo'naltiradi
//         removeItem("access_token");
//         removeItem("refresh_token");
//         removeItem("access_token_expires_in");
//         removeItem("refresh_token_expires_in");
//         navigate("/login"); // Login sahifasiga yo'naltirish
//       }
//     };

//     const intervalId = setInterval(checkAndRefreshToken, 5000); // Har 5 soniyada tokenni tekshiradi
//     return () => clearInterval(intervalId);
//   }, [accessToken, refreshToken, navigate]);

//   const handleViewTokens = () => {
//     setAccessToken(getItem("access_token"));
//     setRefreshToken(getItem("refresh_token"));
//   };

//   const handleClearTokens = () => {
//     removeItem("access_token");
//     removeItem("refresh_token");

//     setAccessToken("");
//     setRefreshToken("");
//     setResult("Tokenlar tozalandi!");
//     setError(null);
//   };

//   return (
//     <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
//       <h2>Token Tester</h2>

//       <div style={{ marginBottom: "20px" }}>
//         <button onClick={handleViewTokens} style={{ marginRight: "10px" }}>
//           Tokenlarni ko'rish
//         </button>
//         <button onClick={handleClearTokens}>
//           Tokenlarni tozalash
//         </button>
//       </div>

//       <div style={{ marginBottom: "10px" }}>
//         <strong>Access Token:</strong>
//         <div style={{ wordWrap: "break-word", backgroundColor: "#f0f0f0", padding: "10px", borderRadius: "5px" }}>
//           {accessToken || "Access token yo'q"}
//         </div>
//       </div>

//       <div style={{ marginBottom: "10px" }}>
//         <strong>Refresh Token:</strong>
//         <div style={{ wordWrap: "break-word", backgroundColor: "#f0f0f0", padding: "10px", borderRadius: "5px" }}>
//           {refreshToken || "Refresh token yo'q"}
//         </div>
//       </div>

//       {result && <div style={{ color: "green", marginTop: "10px" }}>{result}</div>}
//       {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}
//     </div>
//   );
// };

// export default TokenTester;