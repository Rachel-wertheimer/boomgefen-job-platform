import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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
  "mail/sendUserMail",
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
  reducers: {},
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
  },
});

export default mailSlice.reducer;
