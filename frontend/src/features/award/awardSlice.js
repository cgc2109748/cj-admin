import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import awardService from './awardService';
import lotteryService from '../lottery/lotteryService';

const initialState = {
  award: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Create new award
export const createAward = createAsyncThunk(
  'award/create',
  async (awardData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await awardService.createAward(awardData, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// Get user award
export const getAwards = createAsyncThunk('award/getAll', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await awardService.getAwards(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Update  award
export const updateAward = createAsyncThunk(
  'award/update',
  async (awardData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await awardService.updateAward(awardData, token);
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
export const deleteAward = createAsyncThunk('award/delete', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await awardService.deleteAward(id, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const awardSlice = createSlice({
  name: 'award',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAward.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAward.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.award.push(action.payload);
      })
      .addCase(createAward.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAwards.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAwards.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.award = action.payload;
      })
      .addCase(getAwards.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateAward.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAward.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.award = action.payload;
      })
      .addCase(updateAward.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteAward.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAward.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.award = state.award.filter((award) => award._id !== action.payload.id);
      })
      .addCase(deleteAward.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = awardSlice.actions;
export default awardSlice.reducer;
