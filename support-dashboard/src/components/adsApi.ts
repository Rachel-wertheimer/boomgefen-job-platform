import axios from "axios";
const API_URL = "https://boomgefen-job-platform-1.onrender.com/api/v1/ads";
export const getAllAds = async () => {
  const res = await axios.get(`${API_URL}/getAll`);
  return res.data.data;
};

export const getAllNotApprovedAds = async () => {
  const res = await axios.get(`${API_URL}/getAllNotApprovedAds`);
  return res.data.data;
};
export const toggleApproved = async (adId: number, token: string) => {
  const res = await axios.put(
    `${API_URL}/toggleApproved/${adId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data.ad;
};
