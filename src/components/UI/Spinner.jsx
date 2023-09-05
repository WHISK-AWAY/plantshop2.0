import React, {useEffect, useState} from 'react'

export default function Spinner({loading}) {
  //prevent scroll on overflow when the menu is open

  // const [isSpinnerUsed, setIsSpinnerUsed] = useState(false)
  useEffect(() => {
    if (loading) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });

      
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto'
    }
    
  }, [loading]);

  // useEffect(() => {

  //   setTimeout((e) => {

  //   }, 2000)
  // }, [])

  return (
    !loading ? (<div className='hidden'></div>) : (<section className="h-screen w-screen bg-white/90 fixed top-0 right-0 z-[100] backdrop-blur-sm flex justify-center items-center">
      <div className="spinner-container">
        <div className="loading-spinner"></div>
      </div>
    </section>)
    
  );
}
