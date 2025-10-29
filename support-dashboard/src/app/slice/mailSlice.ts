// import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
// import { sendEmail, type EmailData } from "../api/mail";

// type EmailState = {
//   sending: boolean;
//   error: string | null;
//   successMessage: string | null;
// };

// const initialState: EmailState = {
//   sending: false,
//   error: null,
//   successMessage: null,
// };

// // thunk אסינכרוני לשליחת מייל
// export const sendEmailThunk = createAsyncThunk(
//   "email/sendEmail",
//   async (emailData: EmailData, { rejectWithValue }) => {
//     try {
//       const response = await sendEmail(emailData);
//       return response.message;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data?.message || "Failed to send email");
//     }
//   }
// );

// const emailSlice = createSlice({
//   name: "email",
//   initialState,
//   reducers: {
//     resetEmailState(state) {
//       state.sending = false;
//       state.error = null;
//       state.successMessage = null;
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(sendEmailThunk.pending, (state) => {
//         state.sending = true;
//         state.error = null;
//         state.successMessage = null;
//       })
//       .addCase(sendEmailThunk.fulfilled, (state, action: PayloadAction<string>) => {
//         state.sending = false;
//         state.successMessage = action.payload;
//       })
//       .addCase(sendEmailThunk.rejected, (state, action) => {
//         state.sending = false;
//         state.error = action.payload as string;
//       });
//   },
// });

// export const { resetEmailState } = emailSlice.actions;
// export default emailSlice.reducer;
