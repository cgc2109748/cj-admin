import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import lotteryLogsService from './lotteryLogsService';

const initialState = {
  productLogs: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Create new lotteryLogs
export const createLotteryLog = createAsyncThunk(
  'lotteryLogs/create',
  async (lotteryLogsData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await lotteryLogsService.createProductLog(lotteryLogsData, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// Get user lotteryLogs
export const getLotteryLogs = createAsyncThunk(
  'lotteryLogs/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await lotteryLogsService.getLotteryLogs(token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// Delete user lotteryLogs
export const deleteLotteryLogs = createAsyncThunk(
  'lotteryLogs/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await lotteryLogsService.deleteLotteryLogs(id, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const lotteryLogsSlice = createSlice({
  name: 'lotteryLogs',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createLotteryLog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createLotteryLog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.productLogs.push(action.payload);
      })
      .addCase(createLotteryLog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getLotteryLogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLotteryLogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.productLogs = action.payload;
      })
      .addCase(getLotteryLogs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteLotteryLogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteLotteryLogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.productLogs = state.productLogs.filter(
          (productLogs) => productLogs._id !== action.payload.id,
        );
      })
      .addCase(deleteLotteryLogs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = lotteryLogsSlice.actions;
export default lotteryLogsSlice.reducer;
