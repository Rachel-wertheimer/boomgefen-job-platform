import axios from "axios";
const BASE_URL = "http://localhost:3001/api/v1/mail";

export const sendMail = async (to: string, subject: string, text: string) => {
    const response = await axios.post(`${BASE_URL}/sendMail`, {
      to,
      subject,
      text,
    });
    return response.data;
  };


