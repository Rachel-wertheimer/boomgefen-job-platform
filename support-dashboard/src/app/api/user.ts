import axios from "axios";

const BASE_URL = "http://localhost:3001/api/v1/users";
const BASE_URL_Profiles = "http://localhost:3001/api/v1/user_profiles";


export const loginUser = async (email: string, password: string) => {
  const response = await axios.post(`${BASE_URL}/login`, { email, password });
  return response.data; // מחזיר { token }
};

export const getUserDetailsByID = async (user_id: number) => {
  const response = await axios.get(`${BASE_URL}/getDetails/${user_id}`);
    return response.data.data; 
};

export const createUser = async (user: any) => {
  const response = await axios.post(`${BASE_URL}/createUser`, user);
  return response.data; 
};

export const createUserProfile = async (details: any, userId: number) => {
  const response = await axios.post(`${BASE_URL_Profiles}/insert/${userId}`, details);
  return response.data;
};
export const updateSubscription = async (userId: number) => {
  const response = await axios.put(`${BASE_URL}/subscription_start/${userId}`);
  return response.data; // מחזיר { success: true, ad: { endDate } }
};
export const deleteUser = async (userId: number) => {
  const response = await axios.delete(`${BASE_URL}/deleteUser/${userId}`);
  return response.data; // מחזיר { success: true, message: 'User deleted successfully' }
};

