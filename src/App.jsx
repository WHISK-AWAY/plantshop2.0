import React, { useEffect, lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

// import // Homepage,
// // AllProducts,
// // SingleProduct,
// // NavBar,
// // Login,
// // UserAccount,
// // Cart,
// // Signup,
// // EditProfile,
// // OrderHistory,
// // CartView,
// // NotFound,
// // OrderHistoryDetails,
// // Checkout,
// // OrderConfirmation,
// // Wishlist,
// './index';

import Homepage from './components/Homepage.jsx';
import AllProducts from './components/AllProducts.jsx';
import SingleProduct from './components/SingleProduct.jsx';
import NavBar from './components/UI/NavBar.jsx';
import Cart from './components/UI/Cart.jsx';
import Login from './components/Login.jsx';
import UserAccount from './components/UserAccount.jsx';
import Signup from './components/Signup.jsx';
import EditProfile from './components/EditProfile.jsx';
import OrderHistory from './components/OrderHistory.jsx';
import CartView from './components/CartView.jsx';
import NotFound from './components/NotFound.jsx';
import OrderHistoryDetails from './components/OrderHistoryDetails.jsx';
import Checkout from './components/Checkout.jsx';
import OrderConfirmation from './components/OrderConfirmation.jsx';
// import Wishlist from './components/Wishlist.jsx';
const Wishlist = lazy(() => import('./components/Wishlist.jsx'));

import AdminDashboard from './components/Admin/AdminDashboard.jsx';
import AddNewProduct from './components/Admin/AddNewProduct.jsx';
import AddNewPromo from './components/Admin/AddNewPromo.jsx';
import AdminProductView from './components/Admin/AdminProductView.jsx';
import AdminPromoCodeView from './components/Admin/AdminPromoCodeView.jsx';
import AdminUserMgmt from './components/Admin/AdminUserMgmt.jsx';
import EditProduct from './components/Admin/EditProduct.jsx';
import EditPromos from './components/Admin/EditPromos.jsx';
// const AddNewProduct = lazy(() => import('./Admin/AddNewProduct.jsx'));
// const AddNewPromo = lazy(() => import('./Admin/AddNewPromo.jsx'));
// const AdminProductView = lazy(() => import('./Admin/AdminProductView.jsx'));
// const AdminPromoCodeView = lazy(() => import('./Admin/AdminPromoCodeView.jsx'));
// const AdminUserMgmt = lazy(() => import('./Admin/AdminUserMgmt.jsx'));
// const EditProduct = lazy(() => import('./Admin/EditProduct.jsx'));
// const EditPromos = lazy(() => import('./Admin/EditPromos.jsx'));

import { selectAuth, attemptTokenLogin } from './slices/users/authSlice';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(attemptTokenLogin());
    // preloadImages();
  }, []);

  const { auth } = useSelector(selectAuth);

  return (
    <React.Fragment>
      <div className="font-outfit text-green-gray">
        <NavBar auth={auth} />
        <Cart />
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/products' element={<AllProducts />} />
          <Route path='/products/:productId' element={<SingleProduct />} />
          <Route path='/account' element={<UserAccount />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/account/editprofile' element={<EditProfile />} />
          <Route path='/account/orderhistory' element={<OrderHistory />} />
          <Route
            path='/account/wishlist'
            element={
              <Suspense fallback={<p>yep</p>}>
                <Wishlist />
              </Suspense>
            }
          />
          <Route path='/cart' element={<CartView />} />
          <Route path='/shipping' element={<Checkout />} />
          <Route path='/confirmation' element={<OrderConfirmation />} />
          <Route
            path='/account/orderhistory/:orderId'
            element={<OrderHistoryDetails />}
          />
          <Route path='/*' element={<NotFound />} />
          <Route path='/account/admin' element={<AdminDashboard />}>
            <Route path='products' element={<AdminProductView />} />
            <Route path='addproduct' element={<AddNewProduct />} />
            <Route path='promos' element={<AdminPromoCodeView />} />
            <Route path='addpromo' element={<AddNewPromo />} />
            <Route path='users' element={<AdminUserMgmt />} />
            <Route path='editpromos/:promoId' element={<EditPromos />} />
            <Route path='editproduct/:productId' element={<EditProduct />} />
          </Route>
        </Routes>
      </div>
    </React.Fragment>
  );
}

async function preloadImages() {
  async function preloadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;

      img.onload = () => resolve(img);
      img.onerror = () => reject(src);
    });
  }

  const bgImages = [
    '/assets/bg_img/cart.webp',
    '/assets/misc_bg/shipping.webp',
    '/assets/bg_img/wishlist_page.webp',
    '/assets/bg_img/homepage13.webp',
    '/assets/bg_img/not_found_page1.webp',
    '/assets/bg_img/order_conf_page.webp',
    '/assets/bg_img/login_signin_page.webp',
  ];

  const promiseList = [];

  for (let img of bgImages) {
    promiseList.push(preloadImage(img));
  }

  const res = await Promise.all(promiseList);
}
