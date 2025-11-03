import axios from "axios";
export type MailPayload = {
  to: string;
  subject: string;
  text?: string;
  html?: string;
};
const MAIL_BASE_URL = "https://boomgefen-job-platform-1.onrender.com/api/v1/email";
export const sendMail = async (payload: MailPayload) => {
  try {
    const res = await axios.post(`${MAIL_BASE_URL}/send`, payload);
    return res.data; 
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to send email");
  }
};
