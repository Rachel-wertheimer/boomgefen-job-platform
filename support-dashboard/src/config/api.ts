/**
 * API configuration and client setup
 * הגדרות API וקונפיגורציה
 */

import axios from "axios";
import { API_ENDPOINTS } from "../constants";

/**
 * Create axios instance with default configuration
 * יצירת instance של axios עם הגדרות ברירת מחדל
 */
export const apiClient = axios.create({
  baseURL: API_ENDPOINTS.ADS,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Add request interceptor for authentication
 * הוספת interceptor לבקשות עבור אימות
 */
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Add response interceptor for error handling
 * הוספת interceptor לתגובות עבור טיפול בשגיאות
 */
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem("token");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

