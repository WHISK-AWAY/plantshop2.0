import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit';
import axios from 'axios';

const { VITE_API_URL } = import.meta.env;

const initialState = {
  products: [],
  singleProduct: {},
  filterBy: [],
  searchBy: '',
  error: '',
  loading: false,
  status: '',
  similarPage: 0,
  productPage: 0,
  useSearch: false,
};

// Set pagination increment
const PRODUCTS_PER_PAGE = 12;

export const fetchAllProducts = createAsyncThunk(
  'products/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${VITE_API_URL}/api/products`);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchSingleProduct = createAsyncThunk(
  'products/fetchOne',
  async (productId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        VITE_API_URL + `/api/products/${productId}`
      );
      return data;
    } catch (err) {
      console.log('axios error getting all users');
      return rejectWithValue(err);
    }
  }
);

export const editSingleProduct = createAsyncThunk(
  'editProduct',
  async ({ productId, updates, token }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        VITE_API_URL + `/api/products/${productId}`,
        updates,
        {
          headers: {
            authorization: token,
          },
        }
      );
      return data;
    } catch (error) {
      console.log('axios error updating single product');
      return rejectWithValue(error);
    }
  }
);

export const addProduct = createAsyncThunk(
  'addProduct',
  async ({ token, newProduct }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        VITE_API_URL + `/api/products`,
        newProduct,
        {
          headers: {
            authorization: token,
          },
        }
      );
      return data;
    } catch (error) {
      console.log('axios error adding new product');
      return rejectWithValue(error);
    }
  }
);

export const deleteSingleProduct = createAsyncThunk(
  'deleteProduct',
  async ({ productId, token }, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(
        VITE_API_URL + `/api/products/${productId}`,
        {
          headers: {
            authorization: token,
          },
        }
      );
      return data;
    } catch (error) {
      console.log('axios error updating single product');
      return rejectWithValue(error);
    }
  }
);

// export const selectFilteredProducts = createSelector(
//   [(state) => state.products.products, (state) => state.products.filterBy],
//   (allProducts, filterBy) => {
//     if (filterBy.length === 0) return allProducts;

//     return allProducts.filter((product) => {
//       return product.tags.some(({ tagName }) => {
//         return filterBy.includes(tagName);
//       });
//     });
//   }
// );

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    resetStatusError(state) {
      state.status = '';
      state.error = '';
      state.similarPage = 0;
    },
    similarPageChange(state, { payload }) {
      if (payload[0] === 'next')
        state.similarPage = Math.min(payload[1] - 4, state.similarPage + 4);
      if (payload === 'previous')
        state.similarPage = Math.max(0, state.similarPage - 4);
    },
    productPageChange(state, { payload }) {
      let productCount;

      if (state.filterBy.length === 0) {
        productCount = state.products.length;
      } else {
        productCount = state.products.filter((prod) => {
          return prod.tags.some(({ tagName }) => {
            if (!state.filterBy.length) return state.products;
            return state.filterBy.includes(tagName);
          });
        }).length;
      }

      if (payload[0] === 'next') {
        if (state.productPage + PRODUCTS_PER_PAGE >= productCount) {
          return;
        } else {
          state.productPage = state.productPage + PRODUCTS_PER_PAGE;
        }
      }

      if (payload === 'previous')
        state.productPage = Math.max(0, state.productPage - PRODUCTS_PER_PAGE);
    },

    adjustFilter(state, { payload }) {
      state.productPage = 0;
      if (payload) state.filterBy = [payload];
      // If it's an empty string set filter to blank
      else state.filterBy = [];
      // set useSearch to false
      state.useSearch = false;
      state.searchBy = '';
    },
    adjustSort(state, { payload }) {
      const sortKey = payload;

      switch (sortKey) {
        case 'name-asc':
          state.products.sort((a, b) =>
            a.name.toLowerCase() >= b.name.toLowerCase() ? 1 : -1
          );
          break;
        case 'name-desc':
          state.products.sort((a, b) =>
            a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1
          );
          break;
        case 'price-asc':
          state.products.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          state.products.sort((a, b) => b.price - a.price);
          break;
        default:
          return;
      }
    },
    adjustSearchBy(state, { payload }) {
      state.searchBy = payload || '';
      state.useSearch = true;
      state.filterBy = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.status = 'success';
        state.loading = false;
        state.error = '';
      })
      .addCase(fetchAllProducts.pending, (state, action) => {
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.status = 'success';
        state.error = '';
        state.singleProduct = action.payload;
      })
      .addCase(editSingleProduct.fulfilled, (state, { payload }) => {
        state.singleProduct = payload;
        state.status = 'success';
        state.error = '';
      })
      .addCase(editSingleProduct.pending, (state, { payload }) => {
        state.status = 'loading';
      })
      .addCase(editSingleProduct.rejected, (state, { payload }) => {
        state.status = 'failed';
        console.log('failed payload', payload);
        state.error = payload.message;
      })
      .addCase(addProduct.fulfilled, (state, { payload }) => {
        state.singleProduct = payload;
        state.status = 'success';
        state.error = '';
      })
      .addCase(addProduct.pending, (state, { payload }) => {
        state.status = 'loading';
      })
      .addCase(addProduct.rejected, (state, { payload }) => {
        state.status = 'failed';
        console.log('failed payload', payload);
        state.error = payload.message;
      })
      .addCase(deleteSingleProduct.fulfilled, (state, { payload }) => {
        state.singleProduct = payload;
        state.status = 'success';
        state.error = '';
      })
      .addCase(deleteSingleProduct.pending, (state, { payload }) => {
        state.status = 'loading';
      })
      .addCase(deleteSingleProduct.rejected, (state, { payload }) => {
        state.status = 'failed';
        console.log('failed payload', payload);
        state.error = payload.message;
      });
  },
});

export const {
  resetStatusError,
  similarPageChange,
  productPageChange,
  adjustFilter,
  adjustSort,
  adjustSearchBy,
} = productSlice.actions;

export const selectAllProducts = (state) => state.products.products;
export const selectSingleProduct = (state) => state.products.singleProduct;
export const selectProductStatus = (state) => state.products.status;
export const selectProductLoading = (state) => state.products.loading;
export const selectFilterBy = (state) => state.products.filterBy;
// Page for scrolling through similar items
export const selectSimilarPage = (state) => state.products.similarPage;
// Page for scrolling through ALL products page
export const selectProductPage = (state) => state.products.productPage;

export const selectSearchBy = (state) => state.products.searchBy;

export const selectUseSearch = (state) => state.products.useSearch;

export const selectFilteredProducts = createSelector(
  [(state) => state.products.products, (state) => state.products.filterBy],
  (allProducts, filterBy) => {
    if (filterBy.length === 0) return allProducts;

    return allProducts.filter((product) => {
      return product.tags.some(({ tagName }) => {
        return filterBy.includes(tagName);
      });
    });
  }
);

export const selectSearchedItems = createSelector(
  [(state) => state.products.products, (state) => state.products.searchBy],
  (allProducts, searchBy) => {
    return allProducts.filter((product) => {
      return (
        product?.name.toLowerCase().includes(searchBy) ||
        product?.tags.some(({ tagName }) =>
          tagName.toLowerCase().includes(searchBy?.toLowerCase())
        )
      );
    });
  }
);

// Selects all products that have a matching tag to current product
export const selectSimilar = createSelector(
  [(state) => state.products.products, (state) => state.products.singleProduct],
  (allProducts, currentProd) => {
    const currentProdTags = currentProd.tags?.map(({ tagName }) => tagName);

    return allProducts.filter((product) => {
      return (
        product?.tags.some(({ tagName }) =>
          currentProdTags?.includes(tagName)
        ) && product?.id !== currentProd.id
      );
    });
  }
);

export default productSlice.reducer;
