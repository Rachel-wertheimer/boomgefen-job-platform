import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { sendMail } from "../api/mail";

interface MailState {
  sendingMail: boolean;
  mailError: string | null;
}

const initialState: MailState = {
  sendingMail: false,
  mailError: null,
};

// Thunk לשליחת מייל
export const sendUserMail = createAsyncThunk(
  "/sendMail",
  async (payload: { to: string; subject: string; text: string }, { rejectWithValue }) => {
    try {
      const data = await sendMail(payload.to, payload.subject, payload.text);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || "Failed to send mail");
    }
  }
);


const mailSlice = createSlice({
  name: "mail",
  initialState,
  reducers: {
    // אם רוצים להוסיף פה פונקציות נוספות אפשר
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendUserMail.pending, (state) => {
        state.sendingMail = true;
        state.mailError = null;
      })
      .addCase(sendUserMail.fulfilled, (state) => {
        state.sendingMail = false;
      })
      .addCase(sendUserMail.rejected, (state, action) => {
        state.sendingMail = false;
        state.mailError = action.payload as string;
      });
    //   .addCase(submitFinalForm.pending, (state) => {
    //     state.status = 'loading';
    //     state.error = null;
    // })
    // .addCase(submitFinalForm.fulfilled, (state) => {
    //     state.status = 'succeeded';
    // })
    // .addCase(submitFinalForm.rejected, (state, action) => {
    //     state.status = 'failed';
    //     state.error = action.payload as string;
    // });
  },
});

export default mailSlice.reducer;
