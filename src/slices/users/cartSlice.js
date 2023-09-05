import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const { VITE_API_URL } = import.meta.env;

export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
  let dbCart = [];
  let localCart = [];
  let userId = null;
  let res;

  // pull cart info from database (if we have a token)
  const token = localStorage.getItem('token');

  if (token) {
    res = await axios.get(VITE_API_URL + `/api/auth`, {
      headers: {
        authorization: token,
      },
    });

    // extract userId from token response
    userId = +res.data.id;

    // request cart from db
    // expect response to be shaped as [{userId, productId, qty}]
    const { data } = await axios.get(
      VITE_API_URL + `/api/users/${userId}/cart`,
      {
        headers: { authorization: token },
      }
    );

    dbCart = data;
  }

  // pull cart from localStorage (even if we're logged in)
  // localCart looks like [{productId, qty}] (may also include userId)
  localCart = JSON.parse(localStorage.getItem('cart')) || [];

  // create hash of product IDs & quantities from both carts
  // larger number wins
  let simpleCart = {};

  for (let product of [...dbCart, ...localCart]) {
    if (Object.hasOwn(simpleCart, product.productId)) {
      if (userId !== null) product.userId = userId;
      simpleCart[product.productId] = Math.max(
        product.qty,
        simpleCart[product.productId]
      );
    } else simpleCart[product.productId] = product.qty;
  }

  simpleCart = Object.keys(simpleCart).map((key) => {
    return { userId, productId: parseInt(key), qty: simpleCart[key] };
  });

  // resulting cart object (identical to backend response):
  // { userId, productId, qty }
  window.localStorage.setItem('cart', JSON.stringify(simpleCart));
  if (userId !== null && token) {
    await axios.post(
      VITE_API_URL + `/api/users/${userId}/cart`,
      { cart: simpleCart },
      {
        headers: { authorization: token },
      }
    );
  }

  // use simplified / merged cart to request expanded cart (product detail + qty)
  res = await axios.post(VITE_API_URL + '/api/products/cart', simpleCart);
  const expandedCart = res.data;

  return { simpleCart, expandedCart };
});

export const addOneToCart = createAsyncThunk(
  'cart/addOneToCart',
  async (productId) => {
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
    }

    let localCart = JSON.parse(window.localStorage.getItem('cart')) || [];

    // iterate over cart items -- if same item already exists, iterate
    let found = false;
    let newQty = 1;
    for (let line of localCart) {
      if (line.productId === productId) {
        line.qty = line.qty + 1;
        newQty = line.qty;
        found = true;
        break;
      }
    }

    // if we never found the item in the cart, add it
    if (!found) localCart.push({ productId, userId, qty: 1 });

    window.localStorage.setItem('cart', JSON.stringify(localCart));

    // if there was a token (and a user ID), use it to update DB cart
    // send product ID & new qty (pulled from above) to PUT route
    if (token) {
      const updateObject = { productId, qty: newQty };
      const { data } = await axios.put(
        VITE_API_URL + `/api/users/${userId}/cart`,
        updateObject,
        {
          headers: { authorization: token },
        }
      );
    }

    res = await axios.post(VITE_API_URL + '/api/products/cart', localCart);
    const expandedCart = res.data;

    return { localCart, expandedCart };
  }
);

export const removeOneFromCart = createAsyncThunk(
  'cart/removeOneFromCart',
  async (productId) => {
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
    }

    let localCart = JSON.parse(window.localStorage.getItem('cart')) || [];

    // iterate over cart items -- if same item already exists, decrement (or delete if qty === 1)
    // if the item wasn't in the cart to begin with, act like nothing happened
    let newQty = 0;
    let found;

    for (let cartItem of localCart) {
      if (cartItem.productId === productId) {
        cartItem.qty = cartItem.qty - 1;
        newQty = cartItem.qty;
        found = true;
        break;
      }
    }

    if (!found) return; // exit early without hitting db / resetting localstorage

    // remove zero qty lines
    localCart = localCart.filter((cartItem) => cartItem.qty > 0);
    window.localStorage.setItem('cart', JSON.stringify(localCart));

    // if there was a token (and a user ID), use it to update DB cart
    // send product ID & new qty (pulled from above) to PUT route
    // backend PUT will delete row if qty === 0

    if (token) {
      const updateObject = { productId, qty: newQty };
      const { data } = await axios.put(
        VITE_API_URL + `/api/users/${userId}/cart`,
        updateObject,
        {
          headers: { authorization: token },
        }
      );
    }

    res = await axios.post(VITE_API_URL + '/api/products/cart', localCart);
    const expandedCart = res.data;

    return { localCart, expandedCart };
  }
);

export const removeCartRow = createAsyncThunk(
  'cart/removeCartRow',
  async (productId) => {
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
    }

    let localCart = JSON.parse(window.localStorage.getItem('cart')) || [];

    localCart = localCart.filter((cartRow) => cartRow.productId !== productId);

    res = await axios.post(VITE_API_URL + '/api/products/cart', localCart);
    const expandedCart = res.data;

    window.localStorage.setItem('cart', JSON.stringify(localCart));

    if (userId !== null && token) {
      await axios.post(
        VITE_API_URL + `/api/users/${userId}/cart`,
        { cart: localCart },
        {
          headers: { authorization: token },
        }
      );
    }

    return { localCart, expandedCart };
  }
);

export const purgeCart = createAsyncThunk('cart/purgeCart', async () => {
  let userId = null;

  const token = window.localStorage.getItem('token');
  window.localStorage.removeItem('cart');

  if (token) {
    let res = await axios.get(VITE_API_URL + `/api/auth`, {
      headers: {
        authorization: token,
      },
    });

    // extract userId from token response
    userId = res.data.id;
  }

  let axiosPayload = { action: 'purge' };

  if (token && userId !== null) {
    await axios.delete(VITE_API_URL + `/api/users/${userId}/cart`, {
      headers: { authorization: token },
      data: axiosPayload,
    });
  }

  return;
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
    expandedCart: [],
    loading: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCart.fulfilled, (state, { payload }) => {
      state.cart = payload.simpleCart;
      state.loading = false;
      state.expandedCart = payload.expandedCart;
    });
    builder.addCase(fetchCart.pending, (state, { payload }) => {
      state.loading = true;
    });
    builder.addCase(fetchCart.rejected, (state, { payload }) => {
      state.loading = false;
    });
    builder.addCase(addOneToCart.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.cart = payload.localCart;
      state.expandedCart = payload.expandedCart;
    });
    builder.addCase(removeOneFromCart.fulfilled, (state, { payload }) => {
      state.loading = false;
      if (!payload) return; // thunk will return null if nothing to remove
      state.cart = payload.localCart;
      state.expandedCart = payload.expandedCart;
    });
    builder.addCase(removeCartRow.fulfilled, (state, { payload }) => {
      state.loading = false;
      if (!payload) return; // thunk will return null if nothing to remove
      state.cart = payload.localCart;
      state.expandedCart = payload.expandedCart;
    });
    builder.addCase(purgeCart.fulfilled, (state, action) => {
      state.loading = false;
      state.cart = [];
      state.expandedCart = [];
    });
  },
});

export const selectCart = (state) => state.cart;
export const selectCartLoading = (state) => state.cart.loading;
export const selectCartSubtotal = (state) =>
  state.cart.expandedCart.reduce(
    (acc, cv) => (acc += +cv.product.price * cv.qty),
    0
  );

export default cartSlice.reducer;
