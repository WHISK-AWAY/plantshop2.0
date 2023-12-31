import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  selectWishlist,
  fetchWishlist,
  adjustWishlist,
} from '../../slices/users/wishlistSlice';
import heartOutline from '../../assets/heart-outline.svg';
import heartFilled from '../../assets/heart-filled.svg';
import toast from 'react-hot-toast';

const LikedProduct = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();

  const wishlist = useSelector(selectWishlist);
  const authUser = useSelector((state) => state.auth.auth);

  useEffect(() => {
    if (authUser.id) dispatch(fetchWishlist());
  }, [authUser.id]);

  const handleHeartClick = () => {
    if (!authUser.id) {
      toast('Please login to mark favorites.', { duration: 2000 });
    } else {
      if (productIsLiked) {
        toast.error('Item removed from wishlist', { duration: 1000 });
      } else {
        toast.success('Item added to wishlist');
      }

      dispatch(
        adjustWishlist({
          productId,
          action: productIsLiked ? 'delete' : 'add',
          wishlistId: wishlist[0]?.id,
        })
      );
    }
  };

  // Boolean of if product is in the wishlist
  let productIsLiked = false;
  if (wishlist) {
    productIsLiked = wishlist[0]?.products.some(({ id }) => +id === +productId);
  }

  return (
    <>
      <button
        className='w-6 3xl:w-[8] 5xl:w-[11] 6xl:w-[20]'
        onClick={() => {
          handleHeartClick();
        }}
      >
        <img
          src={productIsLiked ? heartFilled : heartOutline}
          alt='heart outline icon'
        />
      </button>
    </>
  );
};

export default LikedProduct;
