import axios from "axios";
import { API_ENDPOINTS } from "../constants";
import type { UserDetails, NewUserData } from "../types";

export const createUser = async (userData: NewUserData): Promise<{ userId: number }> => {
  const response = await axios.post(`${API_ENDPOINTS.USERS}/createuser`, {
    ...userData,
    type: "USER",
    is_agree: false,
    is_subscribed: false,
    subscription_start: null,
    subscription_end: null,
  });

  return { userId: response.data.userId };
};

export const loginUser = async (email: string, password: string) => {
  const response = await axios.post(`${API_ENDPOINTS.USERS}/login`, { email, password });
  return response.data;
};

export const getUserDetailsByID = async (userId: number): Promise<UserDetails> => {
  const response = await axios.get(`${API_ENDPOINTS.USERS}/getDetails/${userId}`);
  return response.data.data;
};

export const updateSubscription = async (userId: number) => {
  const response = await axios.put(`${API_ENDPOINTS.USERS}/subscription_start/${userId}`);
  return response.data;
};

export const deleteUser = async (userId: number) => {
  const response = await axios.delete(`${API_ENDPOINTS.USERS}/deleteUser/${userId}`);
  return response.data;
};

export const createUserProfile = async (details: any, userId: number) => {
  const response = await axios.post(`${API_ENDPOINTS.USER_PROFILES}/insert/${userId}`, details);
  return response.data;
};
