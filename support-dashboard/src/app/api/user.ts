import axios from "axios";

// ה-URL של השרת ב-Render
const BASE_URL_USERS = "https://boomgefen-job-platform-1.onrender.com/api/v1/users";
const BASE_URL_PROFILES = "https://boomgefen-job-platform-1.onrender.com/api/v1/user_profiles";


// ====================== USERS ======================
export const createUser = async (userData: {
  full_name: string;
  email: string;
  phone: string;
}) => {
  const response = await axios.post(`${BASE_URL_USERS}/createuser`, {
    ...userData,
    type: "USER",
    is_agree: false,
    is_subscribed: false,
    subscription_start: null,
    subscription_end: null,
  });

  // נחזיר בדיוק את מה שהשרת מחזיר
  return { userId: response.data.userId };
};
export const loginUser = async (email: string, password: string) => {
  const response = await axios.post(`${BASE_URL_USERS}/login`, { email, password });
  return response.data;
};

export const getUserDetailsByID = async (user_id: number) => {
  const response = await axios.get(`${BASE_URL_USERS}/getDetails/${user_id}`);
  return response.data.data;
};

export const updateSubscription = async (userId: number) => {
  const response = await axios.put(`${BASE_URL_USERS}/subscription_start/${userId}`);
  return response.data;
};

export const deleteUser = async (userId: number) => {
  const response = await axios.delete(`${BASE_URL_USERS}/deleteUser/${userId}`);
  return response.data;
};

// ====================== USER PROFILES ======================
export const createUserProfile = async (details: any, userId: number) => {
  const response = await axios.post(`${BASE_URL_PROFILES}/insert/${userId}`, details);
  return response.data;
};


