import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const { VITE_API_URL } = import.meta.env;

const initialState = {
  wishlist: [],
};

export const fetchWishlist = createAsyncThunk(
  'wishlist/fetchWishlist',
  async () => {
    let res;
    let userId;

    const token = localStorage.getItem('token');
    if (token) {
      res = await axios.get(VITE_API_URL + `/api/auth`, {
        headers: {
          authorization: token,
        },
      });

      // extract userId from token response
      userId = +res.data.id;

      // request wishlist from db
      const { data } = await axios.get(
        VITE_API_URL + `/api/users/${userId}/wishlists`,
        {
          headers: { authorization: token },
        }
      );
      return data;
    }
  }
);

export const adjustWishlist = createAsyncThunk(
  'wishlist/addOne',
  async ({ productId, action, wishlistId }) => {
    if (typeof productId === 'string') productId = parseInt(productId);
    let res;

    const token = localStorage.getItem('token');
    let userId = null;

    if (token) {
      res = await axios.get(VITE_API_URL + `/api/auth`, {
        headers: {
          authorization: token,
        },
      });

      // extract userId from token response
      userId = res.data.id;

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
    });
    builder.addCase(fetchWishlist.rejected, (state, action) => {
      console.log(action.error);
    });
    builder.addCase(adjustWishlist.fulfilled, (state, { payload }) => {
      state.wishlist = [payload];
    });
  },
});

export const selectWishlist = (state) => state.wishlist.wishlist;

export const {} = wishlistSlice.actions;

export default wishlistSlice.reducer;
