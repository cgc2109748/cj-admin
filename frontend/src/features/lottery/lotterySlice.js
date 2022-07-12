import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import lotteryService from './lotteryService';

const initialState = {
  lotterys: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Create new lottery
export const createLottery = createAsyncThunk(
  'lottery/create',
  async (lotteryData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await lotteryService.createLottery(lotteryData, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);
// Update  lottery
export const updateLottery = createAsyncThunk(
  'lottery/update',
  async (lotteryData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await lotteryService.updateLottery(lotteryData, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// Get lottery
export const getLotterys = createAsyncThunk('lottery/getAll', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await lotteryService.getLotterys(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Delete user lottery
export const deleteLottery = createAsyncThunk('lottery/delete', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await lotteryService.deleteLottery(id, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// queryProductByType

// export const queryProductByType = createAsyncThunk(
//   'lotterys/queryProductByType',
//   async (lotteryData, thunkAPI) => {
//     try {
//       const token = thunkAPI.getState().auth.user.token;
//       return await lotteryService.queryProductByType(lotteryData, token);
//     } catch (error) {
//       const message =
//         (error.response && error.response.data && error.response.data.message) ||
//         error.message ||
//         error.toString();
//       return thunkAPI.rejectWithValue(message);
//     }
//   },
// );

export const lotterySlice = createSlice({
  name: 'lottery',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createLottery.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createLottery.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.lotterys.push(action.payload);
      })
      .addCase(createLottery.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getLotterys.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLotterys.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.lotterys = action.payload;
      })
      .addCase(getLotterys.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteLottery.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteLottery.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.lotterys = state.lotterys.filter(
          (lottery) => lottery._id !== action.payload.id,
        );
      })
      .addCase(deleteLottery.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
    // .addCase(queryProductByType.pending, (state) => {
    //   state.isLoading = true;
    // })
    // .addCase(queryProductByType.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.isSuccess = true;
    //   state.lotterys = state.lotterys.filter(
    //     (lottery) => lottery.type !== action.payload.type,
    //   );
    // })
    // .addCase(queryProductByType.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.isError = true;
    //   state.message = action.payload;
    // });
  },
});

export const { reset } = lotterySlice.actions;
export default lotterySlice.reducer;
