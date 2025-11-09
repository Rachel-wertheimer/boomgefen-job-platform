/**
 * Email Service
 * שירות לשליחת אימיילים
 */

import axios from "axios";
import { API_ENDPOINTS } from "../constants";

export interface MailPayload {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

/**
 * Send email
 * שליחת אימייל
 */
export const sendMail = async (payload: MailPayload): Promise<any> => {
  try {
    const response = await axios.post(`${API_ENDPOINTS.EMAIL}/send`, payload);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to send email");
  }
};

