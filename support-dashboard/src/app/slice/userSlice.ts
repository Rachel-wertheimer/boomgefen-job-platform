import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  createUser,
  createUserProfile,
  deleteUser,
  getUserDetailsByID,
  loginUser,
  updateSubscription,
} from "../api/user";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id: number;
  userId?: number;
  name: string;
  userName?: string;
  role: "USER" | "MANAGER";
  email?: string;
  exp?: number; }

interface RegistrationFormData {
  fullName: string;
  email: string;
  phone: string;
  age: string;
  portfolioLink: string;
  passWord: string;
  professions: Record<string, boolean>;
  educationExperience: string;
  additionalSkills: string;
  expectations: string;
  isDetailsCorrect: boolean;
  isCommitteeApproved: boolean;
  isReceivingOffers: boolean;
  hasSentFiles: boolean;
  otherProfession: string;
}

export interface UserDetails {
  userId: number;
  name: string;
  role: "USER" | "MANAGER";
  full_name?: string;
  email?: string;
  phone?: string;
  is_subscribed?: boolean;
  subscription_end?: string;
}

interface AuthState {
  token: string | null;
  currentUser: UserDetails | null;
  loading: boolean;
  error: string | null;
  registrationStatus: 'idle' | 'succeeded' | 'failed';
  registrationForm: RegistrationFormData;
}

const initialRegistrationForm: RegistrationFormData = {
  fullName: '',
  email: '',
  phone: '',
  age: '',
  portfolioLink: '',
  passWord: '',
  professions: {},
  educationExperience: '',
  additionalSkills: '',
  expectations: '',
  isDetailsCorrect: false,
  isCommitteeApproved: false,
  isReceivingOffers: false,
  hasSentFiles: false,
  otherProfession: '',
};

const initialState: AuthState = {
  token: sessionStorage.getItem("token"),
  currentUser: null,
  loading: false,
  error: null,
  registrationStatus: 'idle',
  registrationForm: initialRegistrationForm,
};

export const login = createAsyncThunk(
  "/login",
  async ({ email, password }: { email: string; password: string }, thunkAPI) => {
    try {
      const data = await loginUser(email, password);

      if (data.error && data.userId) {
        sessionStorage.setItem("userId", data.userId.toString());
        return { token: null, user: null, error: data.error, userId: data.userId };
      }

      sessionStorage.setItem("token", data.token);
      const decoded: DecodedToken | null = data.token ? jwtDecode(data.token) : null;
      return { token: data.token, user: decoded, error: null, userId: null };

    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.error || "התחברות נכשלה");
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (formData: RegistrationFormData, { rejectWithValue }) => {
    try {
      const userPayload = {
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        type: "ARTIST",
        is_agree: formData.isDetailsCorrect && formData.isCommitteeApproved,
        is_subscribed: formData.isReceivingOffers,
        subscription_start: null,
        subscription_end: null,
      };

      const userRes = await createUser(userPayload);
      const userId = userRes.userId; 

      const selectedProfessions = Object.keys(formData.professions)
        .filter(p => formData.professions[p]);
      if (formData.otherProfession) selectedProfessions.push(formData.otherProfession);

      const profilePayload = {
        age: parseInt(formData.age, 10),
        website: formData.portfolioLink,
        password: formData.passWord,
        occupation: selectedProfessions.join(", "),
        educationExperience: formData.educationExperience,
        additionalSkills: formData.additionalSkills,
        expectations: formData.expectations,
      };
      await createUserProfile(profilePayload, userId);
      return { userId, ...userPayload };
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || "ההרשמה נכשלה");
    }
  }
);


export const subscribeUser = createAsyncThunk(
  "user/subscribeUser",
  async (_, { rejectWithValue }) => {
    try {
      const userId = Number(sessionStorage.getItem("userId"));
      if (!userId) throw new Error("מזהה משתמש לא נמצא במאגר");

      const data = await updateSubscription(userId);
      sessionStorage.removeItem("userId");
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message || "רכישת מנוי נכשלה");
    }
  }
);

export const deleteUserAccount = createAsyncThunk(
  "user/deleteUserAccount",
  async (_, { rejectWithValue }) => {
    try {
      const userId = Number(sessionStorage.getItem("userId"));
      if (!userId) throw new Error("מזהה משתמש לא נמצא במאגר");

      const response = await deleteUser(userId);
      sessionStorage.clear();
      return response;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message || "מחיקת המשתמש נכשלה");
    }
  }
);

export const fetchUserDetails = createAsyncThunk(
  "/getDetails",
  async (userId: number, { rejectWithValue }) => {
    try {
      const data = await getUserDetailsByID(userId);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || "נכשל בשליפת פרטי המשתמש");
    }
  }
);


const initializeUserFromToken = (): UserDetails | null => {
  const token = sessionStorage.getItem("token");
  if (token) {
    try {
      const decoded: DecodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;  
      if (decoded.exp && decoded.exp < currentTime) {
        sessionStorage.removeItem("token");
        return null;
      }
      return {
        userId: decoded.id || decoded.userId || 0,
        name: decoded.name || decoded.userName || "",
        role: decoded.role,
        is_subscribed: undefined,
        subscription_end: undefined
      };
    } catch (err) {
      sessionStorage.removeItem("token");
      return null;
    }
  }
  return null;
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    ...initialState,
    currentUser: initializeUserFromToken()
  },
  reducers: {
    logout(state) {
      state.token = null;
      state.currentUser = null;
      sessionStorage.removeItem("token");
    },
    updateRegistrationFormField(state, action: PayloadAction<{ field: keyof RegistrationFormData; value: any }>) {
      const { field, value } = action.payload;
      (state.registrationForm as any)[field] = value;
    },
    updateProfession(state, action: PayloadAction<{ name: string; checked: boolean }>) {
      const { name, checked } = action.payload;
      state.registrationForm.professions[name] = checked;
    },
    clearRegistrationForm(state) {
      state.registrationForm = initialRegistrationForm;
      state.registrationStatus = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        if (action.payload.user) {
          state.currentUser = {
            userId: action.payload.user.userId || action.payload.user.id || 0,
            name: action.payload.user.name || "",
            role: action.payload.user.role,
            is_subscribed: undefined,
            subscription_end: undefined
          };
        }
      })
      .addCase(login.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; })
      .addCase(registerUser.pending, (state) => { state.loading = true; state.error = null; state.registrationStatus = 'idle'; })
      .addCase(registerUser.fulfilled, (state) => { state.loading = false; state.registrationStatus = 'succeeded'; })
      .addCase(registerUser.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; state.registrationStatus = 'failed'; })
      .addCase(fetchUserDetails.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchUserDetails.fulfilled, (state, action: PayloadAction<UserDetails>) => { state.loading = false; state.currentUser = action.payload; })
      .addCase(fetchUserDetails.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; })
      .addCase(subscribeUser.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(subscribeUser.fulfilled, (state, action) => {
        state.loading = false;
        if (state.currentUser && action.payload?.ad?.endDate) {
          state.currentUser = {
            ...state.currentUser,
            is_subscribed: true,
            subscription_end: action.payload.ad.endDate
          };
        }
      })
      .addCase(subscribeUser.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; })
      .addCase(deleteUserAccount.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(deleteUserAccount.fulfilled, (state) => { state.loading = false; state.token = null; state.currentUser = null; sessionStorage.clear(); })
      .addCase(deleteUserAccount.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; });
  },
});

export const { logout, updateRegistrationFormField, updateProfession, clearRegistrationForm } = userSlice.actions;
export default userSlice.reducer;
