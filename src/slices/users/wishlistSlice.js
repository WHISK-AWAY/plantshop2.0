import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const { VITE_API_URL } = import.meta.env;

const initialState = {
  wishlist: [],
  loading: false,
};

export const fetchWishlist = createAsyncThunk(
  'wishlist/fetchWishlist',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth, token } = getState().auth;

      if (auth.id && token) {
        // request wishlist from db
        const { data } = await axios.get(
          VITE_API_URL + `/api/users/${auth.id}/wishlists`,
          {
            headers: { authorization: token },
          }
        );
        return data;
      } else {
        throw new Error('user is not logged in');
      }
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message || err);
    }
  }
);

export const adjustWishlist = createAsyncThunk(
  'wishlist/addOne',
  async ({ productId, action, wishlistId }, { getState, rejectWithValue }) => {
    try {
      if (typeof productId === 'string') productId = parseInt(productId);

      const { auth, token } = getState().auth;
      const userId = auth.id;

      if (userId && token) {
        const { data } = await axios.put(
          VITE_API_URL + `/api/users/${userId}/wishlists/${wishlistId}`,
          {
            productId: +productId,
            action,
          },
          {
            headers: { authorization: token },
          }
        );
        return data;
      } else throw new Error('user is not logged in');
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message || err);
    }
  }
);

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchWishlist.fulfilled, (state, { payload }) => {
      state.wishlist = payload;
      state.loading = false;
    });
    builder.addCase(fetchWishlist.rejected, (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    });
    builder.addCase(fetchWishlist.pending, (state, { payload }) => {
      state.loading = true;
    });
    builder.addCase(adjustWishlist.fulfilled, (state, { payload }) => {
      state.wishlist = [payload];
    });
  },
});

export const selectWishlist = (state) => state.wishlist.wishlist;
export const selectWishlistLoading = (state) => state.wishlist.loading;

export const {} = wishlistSlice.actions;

export default wishlistSlice.reducer;
