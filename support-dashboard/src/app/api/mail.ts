// import axios from "axios";
// const BASE_URL = "https://boomgefen-job-platform-1.onrender.com/api/v1/mail";

// export const sendMail = async (to: string, subject: string, text: string) => {
//     const response = await axios.post(`${BASE_URL}/sendMail`, {
//       to,
//       subject,
//       text,
//     });
//     return response.data;
//   };


import axios from "axios";


const BASE_URL_MAIL = "https://boomgefen-job-platform-1.onrender.com/api/v1/mail";



// ====================== MAIL ======================
export const sendMail = async (to: string, subject: string, text: string) => {
  const response = await axios.post(`${BASE_URL_MAIL}/sendMail`, {
    to,
    subject,
    text,
  });
  return response.data;
};
