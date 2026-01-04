import axios from "axios";
import type { Ad } from "../slice/adsSlice";

const BASE_URL = "https://boomgefen-job-platform-1.onrender.com/api/v1/ads";
const BASE_URL_USERS = "https://boomgefen-job-platform-1.onrender.com/api/v1/users";

export const getApprovedAds = async (): Promise<Ad[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/getAllApprovedAds`);
    // Validate response structure
    if (response.data && response.data.data && Array.isArray(response.data.data)) {
      return response.data.data;
    }
    // If structure is different, try to return the data directly
    if (Array.isArray(response.data)) {
      return response.data;
    }
    // Return empty array if data is invalid
    console.warn('Invalid response structure from getAllApprovedAds:', response.data);
    return [];
  } catch (error: any) {
    console.error('Error fetching approved ads:', error);
    // Return empty array instead of throwing to prevent app crash
    return [];
  }
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
    type: "ARTIST",
    is_agree: false,
    is_subscribed: false,
    subscription_start: null,
    subscription_end: null,
  });
  return response.data.userId; 
};


export const createAd = async (adData: NewAdData): Promise<Ad> => {
  const response = await axios.post(`${BASE_URL}/createAds`, adData);
  return response.data.data; 
};

export const getAllAds = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/getAll`);
    return res.data?.data || [];
  } catch (error: any) {
    console.error('Error fetching all ads:', error);
    return [];
  }
};

export const getAllNotApprovedAds = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/getAllNotApprovedAds`);
    return res.data?.data || [];
  } catch (error: any) {
    console.error('Error fetching not approved ads:', error);
    return [];
  }
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
  try {
    const res = await axios.get(`${BASE_URL}/getAllNotRelevantAds`);
    return res.data?.data || [];
  } catch (error: any) {
    console.error('Error fetching not relevant ads:', error);
    return [];
  }
};

export const updateAdContent = async (adId: number, token: string, adData: { company: string; type: string; goal: string; description: string }) => {
  const res = await axios.put(
    `${BASE_URL}/updateContent/${adId}`,
    adData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data.ad;
};
export const deleteAd = async (AdId: number) => {
  const response = await axios.delete(`${BASE_URL}/deleteAd/${AdId}`);
  return response.data;
};