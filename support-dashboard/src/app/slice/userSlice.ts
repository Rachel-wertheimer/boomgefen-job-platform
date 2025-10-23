import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { createUser, createUserProfile, deleteUser, getUserDetailsByID, loginUser, updateSubscription } from "../api/user";
import { jwtDecode } from "jwt-decode";
import axios from "axios";


interface DecodedToken {
  userId: number;
  name: string;
  role: "USER" | "MANAGER";
}
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


// export const login = createAsyncThunk(
//   "/login",
//   async ({ email, password }: { email: string; password: string }, thunkAPI) => {
//     try {
//       const data = await loginUser(email, password);

//       // אם המשתמש ללא מנוי
//       if (data.error && data.userId) {
//         // שמירה ב-sessionStorage כדי להשתמש בדף תשלום
//         sessionStorage.setItem("userId", data.userId.toString());
//         return thunkAPI.rejectWithValue(data.error); // מחזיר את השגיאה אבל גם יש את ה-ID
//       }

//       // משתמש עם מנוי פעיל
//       sessionStorage.setItem("token", data.token);
//       const decoded: DecodedToken = jwtDecode(data.token);
//       return { token: data.token, user: decoded };
//     } catch (err: any) {
//       return thunkAPI.rejectWithValue(err.response?.data?.error || "Login failed");
//     }
//   }
// );
// 2
// export const login = createAsyncThunk(
//   "/login",
//   async ({ email, password }: { email: string; password: string }, thunkAPI) => {
//     try {
//       const data = await loginUser(email, password);

//       if (data.error && data.userId) {
//         // שמירה ב-sessionStorage כדי להשתמש בדף תשלום
//         sessionStorage.setItem("userId", data.userId.toString());
//         // מחזיר גם את השגיאה וגם את userId, לא כ־reject
//         return { error: data.error, userId: data.userId };
//       }

//       sessionStorage.setItem("token", data.token);
//       const decoded: DecodedToken = jwtDecode(data.token);
//       return { token: data.token, user: decoded };
//     } catch (err: any) {
//       return thunkAPI.rejectWithValue(err.response?.data?.error || "Login failed");
//     }
//   }
// );
export const login = createAsyncThunk(
  "/login",
  async ({ email, password }: { email: string; password: string }, thunkAPI) => {
    try {
      const data = await loginUser(email, password);

      if (data.error && data.userId) {
        // שמירה ב-sessionStorage כדי להשתמש בדף תשלום
        sessionStorage.setItem("userId", data.userId.toString());
        // מחזיר מבנה אחיד גם אם אין מנוי
        return { token: null, user: null, error: data.error, userId: data.userId };
      }

      // משתמש עם מנוי תקין
      sessionStorage.setItem("token", data.token);
      const decoded: DecodedToken = jwtDecode(data.token);
      return { token: data.token, user: decoded, error: null, userId: null };

    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.error || "Login failed");
    }
  }
);

export const registerUser = createAsyncThunk(
    "user/registerUser",
    async (formData: RegistrationFormData, { rejectWithValue }) => {
        try {
            // 1️⃣ יוצרים את המשתמש בטבלת users
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
            

            // 2️⃣ יוצרים את הפרטים בטבלת user_profiles
            const selectedProfessions = Object.keys(formData.professions).filter(p => formData.professions[p]);
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
            return rejectWithValue(err.response?.data?.error || "Registration failed");
        }
    }
);
// userSlice.ts
export const subscribeUser = createAsyncThunk(
    "user/subscribeUser",
    async (_, { rejectWithValue }) => {
      try {
        const userId = Number(sessionStorage.getItem("userId")); // שולף מה־localStorage
        if (!userId) throw new Error("User ID not found in storage");
  
        const data = await updateSubscription(userId);
        sessionStorage.removeItem("userId");

        return data;
      } catch (err: any) {
        return rejectWithValue(err.response?.data?.message || err.message || "Subscription failed");
      }
    }
  );
  export const deleteUserAccount = createAsyncThunk(
    "user/deleteUserAccount",
    async (_, { rejectWithValue }) => {
      try {
        const userId = Number(sessionStorage.getItem("userId"));
        if (!userId) throw new Error("User ID not found in storage");
  
        const response = await deleteUser(userId);
        sessionStorage.removeItem("userId");
        sessionStorage.removeItem("token");
        return response;
      } catch (err: any) {
        return rejectWithValue(err.response?.data?.message || err.message || "Delete user failed");
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
            return rejectWithValue(err.response?.data?.error || "Failed to fetch user details");
        }
    }
);

// userSlice.ts
export const submitRegistrationForm = createAsyncThunk(
    "user/submitRegistrationForm",
    async (formData: RegistrationFormData, { rejectWithValue }) => {
      try {
        const response = await axios.post("http://localhost:3001/api/v1/mail/submitForm", formData);
        return response.data;
      } catch (err: any) {
        return rejectWithValue(err.response?.data?.message || "Failed to submit form");
      }
    }
  );
  

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout(state) {
            state.token = null;
            state.currentUser = null; // ⭐ איפוס פרטי המשתמש ביציאה
            sessionStorage.removeItem("token");
        },
        // ⭐ Reducer לעדכון שדה בטופס
        updateRegistrationFormField(state, action: PayloadAction<{ field: keyof RegistrationFormData; value: any }>) {
            const { field, value } = action.payload;
            (state.registrationForm as any)[field] = value;
        },
        // ⭐ Reducer לעדכון מקצועות
        updateProfession(state, action: PayloadAction<{ name: string; checked: boolean }>) {
            const { name, checked } = action.payload;
            state.registrationForm.professions[name] = checked;
        },
        // ⭐ Reducer לאיפוס הטופס
        clearRegistrationForm(state) {
            state.registrationForm = initialRegistrationForm;
            state.registrationStatus = 'idle';
        },
    },
    extraReducers: (builder) => {
        builder
            // Reducers for Login
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
                state.currentUser = action.payload.user;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Reducers for Registration
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.registrationStatus = 'idle';
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.loading = false;
                state.registrationStatus = 'succeeded';
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.registrationStatus = 'failed';
            })
            .addCase(fetchUserDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserDetails.fulfilled, (state, action: PayloadAction<UserDetails>) => {
                state.loading = false;
                state.currentUser = action.payload; // שמירת המידע ב-state
            })
            .addCase(fetchUserDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(subscribeUser.pending, (state) => {
                state.loading = true;
                state.error = null;
              })
              .addCase(subscribeUser.fulfilled, (state, action) => {
                state.loading = false;
                state.currentUser = {
                  ...state.currentUser!,
                  is_subscribed: true,
                  subscription_end: action.payload.ad.endDate,
                };
              })
              .addCase(subscribeUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
              })
              .addCase(deleteUserAccount.pending, (state) => {
                state.loading = true;
                state.error = null;
              })
              .addCase(deleteUserAccount.fulfilled, (state) => {
                state.loading = false;
                state.token = null;
                state.currentUser = null;
                sessionStorage.clear(); // מוחק גם token וגם userId
              })
              .addCase(deleteUserAccount.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
              });
    },
});

export const { logout, updateRegistrationFormField, updateProfession, clearRegistrationForm } = userSlice.actions;
export default userSlice.reducer;