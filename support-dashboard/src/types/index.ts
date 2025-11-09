/**
 * TypeScript type definitions for the application
 * מרכז כל הגדרות הטיפוסים של האפליקציה
 */

// Ad Types
export interface Ad {
  id?: number;
  id_user: number;
  company: string;
  type: string;
  goal?: string;
  description: string;
  approved: boolean;
  is_relevant: number;
  created_at?: string;
  updated_at?: string;
}

// User Types
export interface User {
  id: number;
  name: string;
  email: string;
  role: 'USER' | 'MANAGER';
  token?: string;
}

export interface UserDetails {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  type?: string;
}

export interface NewUserData {
  full_name: string;
  email: string;
  phone: string;
}

export interface NewAdData {
  id_user: number;
  company: string;
  type: string;
  goal: string;
  description: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

// Component Props Types
export interface AdCardProps {
  ad: Ad;
  index: number;
  totalAds: number;
}

export interface AdsListProps {
  ads: Ad[];
  isMobile: boolean;
}

