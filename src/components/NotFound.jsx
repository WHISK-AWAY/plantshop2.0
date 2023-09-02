import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="h-[calc(100vh_-_5rem)]  w-screen  bg-[url('/assets/bg_img/not_found_page1.webp')] bg-cover bg-no-repeat md:h-[calc(100vh_-_4rem)]  lg:h-[calc(100dvh_-_82px)] xl:h-[calc(100dvh_-_100px)] 2xl:h-[calc(100dvh_-_105px)] 5xl:h-[calc(100dvh_-_159px)] 6xl:h-[calc(100dvh_-_200px)] portrait:h-[calc(100dvh_-_5rem)] portrait:xs:h-[calc(100dvh_-_5rem)] portrait:md:h-[calc(100dvh_-_110px)] portrait:lg:h-[calc(100dvh_-_140px)]">
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
