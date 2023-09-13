import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectWishlist, fetchWishlist, selectWishlistLoading } from '../slices/users/wishlistSlice';
import { selectProductLoading } from '../slices/product/productSlice';
import WishlistCard from './WishlistCard.jsx';

import btnHover from '../style_utils';
import Spinner from './UI/Spinner';

export default function Wishlist() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [imgLoaded, setImgLoaded] = useState(false);
  const productsLoading = useSelector(selectProductLoading);
  const wishlistLoading = useSelector(selectWishlistLoading)

  useEffect(() => {
    dispatch(fetchWishlist());
  }, []);


  const wishlist = useSelector(selectWishlist);

  useEffect(() => {
    const img = new Image();
    img.src = '/assets/bg_img/admin.webp';

    img.onload = () => {
      setImgLoaded(true);
    };
  }, []);

  useEffect(() => {
    if (imgLoaded && !wishlistLoading && !productsLoading) {
      setLoading(false);
    }
  }, [imgLoaded, productsLoading, wishlistLoading]);

  btnHover();


  if (!wishlist || wishlistLoading) return <Spinner loading={loading} />;

  return (
    !productsLoading &&
    !wishlistLoading && (
      <>
        <Spinner loading={loading} />
        <div className='relative  xl:pt-28 5xl:pt-44 6xl:pt-56'>
          <div className="absolute top-0 left-0 h-screen w-screen overflow-hidden bg-[url('/assets/bg_img/admin.webp')] bg-cover bg-fixed bg-bottom bg-no-repeat pt-3  font-outfit   portrait:w-full portrait:px-2 landscape:lg:pt-20 ">
            <h1 className='mb-4 text-center text-[2.7vw] font-bold  text-green-gray  mix-blend-luminosity lg:text-[2.6vw] xl:text-[2.3vw] 3xl:text-[2.3vw] 3xl:text-white 4xl:text-[2.1vw] 5xl:text-[1.8vw] 6xl:text-[1.5vw] portrait:text-green-gray  portrait:md:text-[4vw] portrait:text-[5vw] pt-20 landscape:pt-10 portrait:lg:pt-28 landscape:md:pt-[9%] landscape:5xl:pt-28 landscape:6xl:pt-44 landscape::short:pt-24 landscape:xs:pt-10 landscape:short:pt-28 landscape:short:text-[1.7rem] landscape:short:text-white'>
              WISHLIST
            </h1>
            <Link to={'/account'} className='flex justify-center '>
              <p className='bottom-2 absolute transition-all duration-700 hover:bg-primary-bright-white border border-green-gray text-[1.5vw] text-green-gray bg-white/80 w-36 flex items-center justify-center xl:text-[1.5vw] 3xl:text-[1.2vw] 4xl:text-[1vw] 5xl:text-[.8vw] 4xl:w-48 6xl:w-52 5xl:bottom-12 portrait:text-[4vw] portrait:md:text-[2.4vw] portrait:md:bottom-7 portrait:md:w-52 portrait:lg:w-64 landscape:short:text-[1rem]'>
                go back
              </p>
            </Link>
            <div className='mx-auto max-h-[70svh] portrait:h-[80svh] landscape:2xl:max-h-[80svh] landscape:h-[65svh] landscape:4xl:h-[75svh] landscape:5xl:h-[65svh] landscape:short:h-[65svh] landscape:xl:h-[80svh] landscape:2xl:h-[70svh] w-fit max-w-[1200px] overflow-y-auto border border-green-gray bg-white/80 p-2 md:min-w-[700px] lg:text-[2.8vw] 4xl:min-w-[900px] 5xl:max-h-[65svh] 5xl:min-w-[900px]  portrait:w-[90vw] portrait:border-green-gray portrait:xxs:w-[96svw] portrait:xs:min-h-[78svh] portrait:xs:max-w-[90svw] portrait:md:min-h-[75svh] portrait:lg:h-[90svh] landscape:w-[90svw]'>
              {wishlist[0]?.products.length > 0 ? (
                wishlist[0]?.products.map((product) => {
                  return <WishlistCard key={product.id} product={product} />;
                })
              ) : (
                <div className='mx-auto flex h-full w-fit flex-col items-center justify-center pt-10 text-center text-green-gray'>
                  <h2 className='text-[2.2vw]  xl:text-[2vw] 2xl:text-[1.6vw] 4xl:text-[1.3vw] 5xl:text-[1.1vw]  portrait:md:text-[3.7vw] portrait:text-[5vw]'>
                    No items in your wishlist...
                  </h2>
                  <p className='text-[1.7vw] xl:text-[1.5vw] 2xl:text-[1.2vw] 4xl:text-[1vw] 5xl:text-[.9vw] portrait:text-[3.7vw] portrait:md:text-[1.4rem]'>
                    Click the heart icon on a product to add one!
                  </p>
                  <Link
                    className='btn mt-8 self-center  py-1 px-4 text-[1.3vw] text-white hover:scale-[1.04] transition-all duration-700 2xl:text-[1vw] 4xl:text-[.8vw] portrait:px-6  portrait:text-[4vw] portrait:md:text-[2.5vw]'
                    to={'/products'}
                  >
                    <span>shop now</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    )
  );
}
