import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="h-[calc(100vh_-_5rem)]  w-screen  bg-[url('/assets/bg_img/not_found_page1.webp')] bg-cover bg-no-repeat portrait:h-[100svh] landscape:h-[100svh]">
      <div className='flex flex-col text-center justify-center w-full items-center h-full -translate-y-[15%]'>
        <div className='font-extrabold  flex w-screen flex-col  items-center justify-center  tracking-wide  text-primary-bright-white'>
          <p className='font-semibold text-[6.5vw] portrait:text-[19vw]'>404</p>
          <p className='text-[1.7vw] 2xl:text-[1.5vw] portrait:text-[5vw] portrait:md:text-[3vw]'>PAGE NOT FOUND :(</p>
        </div>
        <div className=' 2xl:text-[1vw] text-center text-[1.3vw] portrait:md:text-[2.7vw] tracking-wide portrait:text-[4vw] pt-1  text-primary-bright-white portrait:lg:text-[2.3vw]'>
          <p className='font-light'>
            take me back{' '}
            <Link to={'/'} className='font-semibold underline'>
              home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
