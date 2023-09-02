import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const { VITE_API_URL } = import.meta.env;

export const fetchAllUsers = createAsyncThunk(
  'getAllUsers',
  async ({ token }, { rejectWithValue }) => {
    try {
      let { data } = await axios.get(VITE_API_URL + `/api/users`, {
        headers: {
          authorization: token,
        },
      });
      return data;
    } catch (err) {
      console.log('axios error getting all users');
      return rejectWithValue(err);
    }
  }
);

export const fetchSingleUser = createAsyncThunk(
  'getSingleUser',
  async ({ id, token }, { rejectWithValue }) => {
    try {
      let { data } = await axios.get(VITE_API_URL + `/api/users/${id}`, {
        headers: {
          authorization: token,
        },
      });
      return data;
    } catch (err) {
      console.log('axios error getting single user');
      return rejectWithValue(err);
    }
  }
);

export const updateSingleUser = createAsyncThunk(
  'updateSingleUser',
  async ({ id, updates, token }, { rejectWithValue }) => {
    try {
      let { data } = await axios.put(
        VITE_API_URL + `/api/users/${id}`,
        updates,
        {
          headers: {
            authorization: token,
          },
        }
      );
      return data;
    } catch (err) {
      console.log('axios error updating single user');
      return rejectWithValue(err);
    }
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    user: {},
    error: '',
    status: '',
  },
  reducers: {
    resetStatus: (state) => {
      state.status = '';
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.fulfilled, (state, { payload }) => {
        state.users = payload;
        state.status = 'success';
        state.error = '';
      })
      .addCase(fetchAllUsers.pending, (state, { payload }) => {
        state.status = 'loading';
      })
      .addCase(fetchAllUsers.rejected, (state, { payload }) => {
        state.status = 'failed';
        console.log('failed payload', payload);
        state.error = payload.message;
      })
      .addCase(fetchSingleUser.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.status = 'success';
        state.error = '';
      })
      .addCase(fetchSingleUser.pending, (state, { payload }) => {
        state.status = 'loading';
      })
      .addCase(fetchSingleUser.rejected, (state, { payload }) => {
        state.status = 'failed';
        console.log('failed payload', payload);
        state.error = payload.message;
      })
      .addCase(updateSingleUser.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.status = 'success';
        state.error = '';
      })
      .addCase(updateSingleUser.pending, (state, { payload }) => {
        state.status = 'loading';
      })
      .addCase(updateSingleUser.rejected, (state, { payload }) => {
        state.status = 'failed';
        console.log('failed payload', payload);
        state.error = payload.message;
      });
  },
});

export const { resetStatus } = userSlice.actions;

export const selectUsers = (state) => state.users;

export default userSlice.reducer;
