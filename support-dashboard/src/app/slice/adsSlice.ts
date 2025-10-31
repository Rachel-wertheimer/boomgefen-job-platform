import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { createAd, createUser, deleteAd, getAllAds, getAllNotApprovedAds, getApprovedAds, getNotRelevantAds, toggleApproved, toggleRelevant, type NewAdData, type NewUserData } from "../api/ads";

export type Ad = {
  id: number;
  id_user: number;
  company: string;
  type: string;
  goal: string;
  approved: number; // כדאי להוסיף את שדה האישור
  description: string;
  is_relevant: number; // חדש

};

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


// thunk אסינכרוני למשיכת הנתונים
export const fetchAds = createAsyncThunk("/fetchAds", async () => {
  return await getApprovedAds();
});
//יצרת מודעה חדשה
export const registerUserAndCreateAd = createAsyncThunk(
  "ads/registerUserAndCreateAd",
  async (
    { userData, adData }: { userData: NewUserData; adData: Omit<NewAdData, "id_user"> },
    { rejectWithValue }
  ) => {
    try {
      // קודם יוצרים User
      const userId = await createUser(userData);

      if (!userId) {
        throw new Error("מזהה משתמש לא מוגדר");
      }

      const newAd = await createAd({ id_user: userId, ...adData });

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
// thunk למחיקת מודעה
export const deleteAdS = createAsyncThunk(
  "ads/deleteAd",
  async ({ adId }: { adId: number }) => {
    return await deleteAd(adId)
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
      .addCase(fetchAds.fulfilled, (state, action) => {
        state.loading = false;
        state.ads = action.payload;
      })
      .addCase(fetchAds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "שגיאה בטעינת נתונים";
      })
      // --- Reducers חדשים עבור יצירת מודעה ---
      .addCase(registerUserAndCreateAd.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUserAndCreateAd.fulfilled, (state, action) => {
        state.loading = false;
        state.ads.push(action.payload);
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

      // מודעות לא מאושרות
      .addCase(fetchNotApprovedAds.fulfilled, (state, action: PayloadAction<Ad[]>) => {
        state.ads = action.payload;
      })

      // עדכון אישור מודעה
      .addCase(toggleAdApproved.fulfilled, (state, action: PayloadAction<Ad>) => {
        const index = state.ads.findIndex((ad) => ad.id === action.payload.id);
        if (index !== -1) {
          state.ads[index] = action.payload;
        }
      })
      .addCase(toggleAdRelevant.fulfilled, (state, action: PayloadAction<Ad>) => {
        const index = state.ads.findIndex(ad => ad.id === action.payload.id);
        if (index !== -1) state.ads[index] = action.payload;
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
