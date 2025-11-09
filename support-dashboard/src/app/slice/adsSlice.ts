import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import {
  createAd as createAdService,
  deleteAd as deleteAdService,
  getAllAds,
  getAllNotApprovedAds,
  getApprovedAds,
  getNotRelevantAds,
  toggleApproved,
  toggleRelevant,
} from "../../services/adsService";
import { createUser } from "../../services/userService";
import type { Ad, NewAdData, NewUserData } from "../../types";

export type { Ad };

type AdsState = {
  ads: Ad[];
  loading: boolean;
  error: string | null;
};

const initialState: AdsState = {
  ads: [],
  loading: false,
  error: null,
};

export const fetchAds = createAsyncThunk("/fetchAds", async (_, { rejectWithValue }) => {
  try {
    const ads = await getApprovedAds();
    return ads;
  } catch (error: any) {
    return rejectWithValue(error.message || "שגיאה בטעינת מודעות");
  }
});

export const registerUserAndCreateAd = createAsyncThunk(
  "ads/registerUserAndCreateAd",
  async (
    { userData, adData }: { userData: NewUserData; adData: Omit<NewAdData, "id_user"> },
    { rejectWithValue }
  ) => {
    try {
      const userResponse = await createUser(userData);

      if (!userResponse.userId) {
        throw new Error("מזהה משתמש לא מוגדר");
      }

      const token = sessionStorage.getItem("token") || "";
      const newAd = await createAdService({ id_user: userResponse.userId, ...adData }, token);

      return newAd;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "נכשל ביצירת המשתמש והמודעה");
    }
  }
);

export const fetchAllAds = createAsyncThunk("ads/fetchAll", async () => {
  return await getAllAds();
});

export const fetchNotApprovedAds = createAsyncThunk("ads/fetchNotApproved", async () => {
  return await getAllNotApprovedAds();
});

export const toggleAdApproved = createAsyncThunk(
  "ads/toggleApproved",
  async ({ adId, token }: { adId: number; token: string }) => {
    return await toggleApproved(adId, token);
  }
);

export const toggleAdRelevant = createAsyncThunk(
  "ads/toggleRelevant",
  async ({ adId, token }: { adId: number; token: string }) => {
    return await toggleRelevant(adId, token);
  }
);

export const fetchNotRelevantAds = createAsyncThunk(
  "ads/getAllNotRelevantAds",
  async () => {
    return await getNotRelevantAds();
  }
);

export const deleteAdS = createAsyncThunk(
  "ads/deleteAd",
  async ({ adId }: { adId: number }) => {
    const token = sessionStorage.getItem("token") || "";
    await deleteAdService(adId, token);
    return adId;
  }
);

const adsSlice = createSlice({
  name: "ads",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAds.fulfilled, (state, action: PayloadAction<Ad[]>) => {
        state.loading = false;
        state.ads = action.payload as any;
      })
      .addCase(fetchAds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "שגיאה בטעינת נתונים";
      })

      .addCase(registerUserAndCreateAd.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUserAndCreateAd.fulfilled, (state, action: PayloadAction<Ad>) => {
        state.loading = false;
        state.ads.push(action.payload as any);
      })
      .addCase(registerUserAndCreateAd.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchAllAds.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllAds.fulfilled, (state, action: PayloadAction<Ad[]>) => {
        state.loading = false;
        state.ads = action.payload;
      })
      .addCase(fetchAllAds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "נכשל בשליפת המודעות";
      })

      .addCase(fetchNotApprovedAds.fulfilled, (state, action: PayloadAction<Ad[]>) => {
        state.ads = action.payload;
      })

      .addCase(toggleAdApproved.fulfilled, (state, action: PayloadAction<Ad>) => {
        const index = state.ads.findIndex((ad) => ad.id === action.payload.id);
        if (index !== -1) {
          state.ads[index] = action.payload as any;
        }
      })
      .addCase(toggleAdRelevant.fulfilled, (state, action: PayloadAction<Ad>) => {
        const index = state.ads.findIndex(ad => ad.id === action.payload.id);
        if (index !== -1) state.ads[index] = action.payload as any;
      })
      .addCase(fetchNotRelevantAds.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNotRelevantAds.fulfilled, (state, action: PayloadAction<Ad[]>) => {
        state.loading = false;
        state.ads = action.payload;
      })
      .addCase(fetchNotRelevantAds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "שגיאה בטעינת מודעות לא רלוונטיות";
      })
      .addCase(deleteAdS.fulfilled, (state, action: PayloadAction<number>) => {
        state.ads = state.ads.filter(ad => ad.id !== action.payload);
      })
      .addCase(deleteAdS.rejected, (state, action) => {
        state.error = action.error.message ?? "שגיאה במחיקת מודעה";
      });
  },
});

export default adsSlice.reducer;
