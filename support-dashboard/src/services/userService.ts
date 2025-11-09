/**
 * User Service
 * שירות לטיפול במשתמשים - קריאות API למשתמשים
 */

import axios from "axios";
import { API_ENDPOINTS } from "../constants";
import type { UserDetails, NewUserData } from "../types";

/**
 * Create a new user
 * יצירת משתמש חדש
 */
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

/**
 * Login user
 * התחברות משתמש
 */
export const loginUser = async (email: string, password: string) => {
  const response = await axios.post(`${API_ENDPOINTS.USERS}/login`, { email, password });
  return response.data;
};

/**
 * Get user details by ID
 * קבלת פרטי משתמש לפי ID
 */
export const getUserDetailsByID = async (userId: number): Promise<UserDetails> => {
  const response = await axios.get(`${API_ENDPOINTS.USERS}/getDetails/${userId}`);
  return response.data.data;
};

/**
 * Update user subscription
 * עדכון מנוי משתמש
 */
export const updateSubscription = async (userId: number) => {
  const response = await axios.put(`${API_ENDPOINTS.USERS}/subscription_start/${userId}`);
  return response.data;
};

/**
 * Delete user
 * מחיקת משתמש
 */
export const deleteUser = async (userId: number) => {
  const response = await axios.delete(`${API_ENDPOINTS.USERS}/deleteUser/${userId}`);
  return response.data;
};

/**
 * Create user profile
 * יצירת פרופיל משתמש
 */
export const createUserProfile = async (details: any, userId: number) => {
  const response = await axios.post(`${API_ENDPOINTS.USER_PROFILES}/insert/${userId}`, details);
  return response.data;
};

