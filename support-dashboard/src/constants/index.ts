export const API_BASE_URL = "https://boomgefen-job-platform-1.onrender.com/api/v1";

export const API_ENDPOINTS = {
  ADS: `${API_BASE_URL}/ads`,
  USERS: `${API_BASE_URL}/users`,
  USER_PROFILES: `${API_BASE_URL}/user_profiles`,
  EMAIL: `${API_BASE_URL}/email`,
} as const;

export const BREAKPOINTS = {
  MOBILE: 600,
  TABLET: 960,
  DESKTOP: 1200,
} as const;

export const MAX_DESCRIPTION_LINES = 5;
export const NAVBAR_HEIGHT = 90;
export const FOOTER_HEIGHT = 50;

export const ANIMATION_DURATION = {
  FAST: 0.2,
  NORMAL: 0.3,
  SLOW: 0.5,
} as const;
