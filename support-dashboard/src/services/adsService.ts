import axios from "axios";
import { API_ENDPOINTS } from "../constants";
import type { Ad, NewAdData } from "../types";

export const getApprovedAds = async (): Promise<Ad[]> => {
  try {
    const response = await axios.get(`${API_ENDPOINTS.ADS}/getAllApprovedAds`);
    
    if (response.data?.data && Array.isArray(response.data.data)) {
      return response.data.data;
    }
    
    if (Array.isArray(response.data)) {
      return response.data;
    }
    
    console.warn("Invalid response structure from getAllApprovedAds:", response.data);
    return [];
  } catch (error: any) {
    console.error("Error fetching approved ads:", error);
    return [];
  }
};

export const getAllAds = async (): Promise<Ad[]> => {
  try {
    const response = await axios.get(`${API_ENDPOINTS.ADS}/getAll`);
    return response.data?.data || [];
  } catch (error: any) {
    console.error("Error fetching all ads:", error);
    return [];
  }
};

export const getAllNotApprovedAds = async (): Promise<Ad[]> => {
  try {
    const response = await axios.get(`${API_ENDPOINTS.ADS}/getAllNotApprovedAds`);
    return response.data?.data || [];
  } catch (error: any) {
    console.error("Error fetching not approved ads:", error);
    return [];
  }
};

export const getNotRelevantAds = async (): Promise<Ad[]> => {
  try {
    const response = await axios.get(`${API_ENDPOINTS.ADS}/getAllNotRelevantAds`);
    return response.data?.data || [];
  } catch (error: any) {
    console.error("Error fetching not relevant ads:", error);
    return [];
  }
};

export const createAd = async (adData: NewAdData, token: string): Promise<Ad> => {
  const response = await axios.post(
    `${API_ENDPOINTS.ADS}/createAds`,
    adData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.data;
};

export const toggleApproved = async (adId: number, token: string): Promise<Ad> => {
  const response = await axios.put(
    `${API_ENDPOINTS.ADS}/toggleApproved/${adId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.ad;
};

export const toggleRelevant = async (adId: number, token: string): Promise<Ad> => {
  const response = await axios.put(
    `${API_ENDPOINTS.ADS}/toggleRelevant/${adId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.ad;
};

export const updateAdContent = async (
  adId: number,
  token: string,
  adData: { company: string; type: string; goal: string; description: string }
): Promise<Ad> => {
  const response = await axios.put(
    `${API_ENDPOINTS.ADS}/updateContent/${adId}`,
    adData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.ad;
};

export const deleteAd = async (adId: number, token: string): Promise<void> => {
  await axios.delete(`${API_ENDPOINTS.ADS}/deleteAd/${adId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
