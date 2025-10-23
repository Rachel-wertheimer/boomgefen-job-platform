import axios from "axios";
import type { Ad } from "../slice/adsSlice";

const BASE_URL = "http://localhost:3001/api/v1/ads";
const BASE_URL_USERS = "http://localhost:3001/api/v1/users";

export const getApprovedAds = async (): Promise<Ad[]> => {
  const response = await axios.get(`${BASE_URL}/getAllApprovedAds`);
  console.log(response.data.data);
  return response.data.data;
};


export type NewAdData = {
  id_user: number;
  company: string;
  type: string;
  goal: string;
  description: string;
};

export type NewUserData = {
  full_name: string;
  email: string;
  phone: string;
};

export const createUser = async (userData: NewUserData): Promise<number> => {
  const response = await axios.post(`${BASE_URL_USERS}/createuser`, {
    ...userData,
    type: "USER",
    is_agree: false,
    is_subscribed: false,
    subscription_start: null,
    subscription_end: null,
  });
  return response.data.userId; // נחזיר את ה-ID שנוצר
};


export const createAd = async (adData: NewAdData): Promise<Ad> => {
  const response = await axios.post(`${BASE_URL}/createAds`, adData);
  return response.data.data; // מחזירים את המודעה החדשה שנוצרה
};

export const getAllAds = async () => {
  const res = await axios.get(`${BASE_URL}/getAll`);
  return res.data.data;
};

export const getAllNotApprovedAds = async () => {
  const res = await axios.get(`${BASE_URL}/getAllNotApprovedAds`);
  return res.data.data;
};

export const toggleApproved = async (adId: number, token: string) => {
  const res = await axios.put(
    `${BASE_URL}/toggleApproved/${adId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data.ad;
};
export const toggleRelevant = async (adId: number, token: string) => {
  const res = await axios.put(
    `${BASE_URL}/toggleRelevant/${adId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data.ad;
}
export const getNotRelevantAds = async () => {
  const res = await axios.get(`${BASE_URL}/getAllNotRelevantAds`);
  return res.data.data;
};