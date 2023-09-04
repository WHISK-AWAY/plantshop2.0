import React, {useEffect} from 'react'

export default function Spinner() {
  //prevent scroll on overflow when the menu is open
  // useEffect(() => {
  //   if (expand) {
  //     document.body.style.overflow = 'hidden';
  //     return () => {
  //       document.body.style.overflow = '';
  //     };
  //   }
  // }, []);

  // useEffect(() => {

  //   setTimeout((e) => {

  //   }, 2000)
  // }, [])

  return (
    <section className="h-screen w-screen bg-white/90 absolute top-0 right-0 z-[100] backdrop-blur-sm flex justify-center items-center  ">
      <div className="spinner-container">
        <div className="loading-spinner"></div>
      </div>
    </section>
  );
}
