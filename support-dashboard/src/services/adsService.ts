/**
 * Ads Service
 * שירות לטיפול במודעות - קריאות API למודעות
 */

import axios from "axios";
import { API_ENDPOINTS } from "../constants";
import type { Ad, NewAdData } from "../types";

/**
 * Fetch all approved ads
 * קבלת כל המודעות המאושרות
 */
export const getApprovedAds = async (): Promise<Ad[]> => {
  try {
    const response = await axios.get(`${API_ENDPOINTS.ADS}/getAllApprovedAds`);
    
    // Validate response structure
    if (response.data?.data && Array.isArray(response.data.data)) {
      return response.data.data;
    }
    
    // Fallback: try to return data directly if structure is different
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

/**
 * Fetch all ads (admin only)
 * קבלת כל המודעות (רק למנהלים)
 */
export const getAllAds = async (): Promise<Ad[]> => {
  try {
    const response = await axios.get(`${API_ENDPOINTS.ADS}/getAll`);
    return response.data?.data || [];
  } catch (error: any) {
    console.error("Error fetching all ads:", error);
    return [];
  }
};

/**
 * Fetch all not approved ads
 * קבלת כל המודעות שלא אושרו
 */
export const getAllNotApprovedAds = async (): Promise<Ad[]> => {
  try {
    const response = await axios.get(`${API_ENDPOINTS.ADS}/getAllNotApprovedAds`);
    return response.data?.data || [];
  } catch (error: any) {
    console.error("Error fetching not approved ads:", error);
    return [];
  }
};

/**
 * Fetch all not relevant ads
 * קבלת כל המודעות שלא רלוונטיות
 */
export const getNotRelevantAds = async (): Promise<Ad[]> => {
  try {
    const response = await axios.get(`${API_ENDPOINTS.ADS}/getAllNotRelevantAds`);
    return response.data?.data || [];
  } catch (error: any) {
    console.error("Error fetching not relevant ads:", error);
    return [];
  }
};

/**
 * Create a new ad
 * יצירת מודעה חדשה
 */
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

/**
 * Toggle ad approval status
 * שינוי סטטוס אישור מודעה
 */
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

/**
 * Toggle ad relevance status
 * שינוי סטטוס רלוונטיות מודעה
 */
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

/**
 * Update ad content
 * עדכון תוכן מודעה
 */
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

/**
 * Delete an ad
 * מחיקת מודעה
 */
export const deleteAd = async (adId: number, token: string): Promise<void> => {
  await axios.delete(`${API_ENDPOINTS.ADS}/deleteAd/${adId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

