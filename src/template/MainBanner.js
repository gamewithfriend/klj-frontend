import React, { useState, useEffect } from 'react';
import bannerStyle from "../style/banner.module.css";
import gymImage1 from '../assets/image/gym.jpg';
import gymImage2 from '../assets/image/gym2.jpg';

const MainBanner = () => {
  const images = [gymImage1, gymImage2];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [zIndex, setZIndex] = useState(-1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [images]);

  const handlePrev = () => {
    setCurrentIndex(prevIndex => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prevIndex => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const handleWheel = (e) => {
    if (e.deltaY > 0 && opacity > 0.1) { // 휠을 아래로 내리면서 투명도를 조절
      setOpacity(opacity - 0.1);
    } else if (e.deltaY < 0 && opacity < 1) { // 휠을 위로 올리면서 투명도를 조절
      setOpacity(opacity + 0.1);
    }
  };

  return (
    <div className={bannerStyle.sliderContainer} onWheel={handleWheel} style={{ opacity: opacity}}>
      <div className={bannerStyle.sliderWrapper} style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Image ${index + 1}`}
            className={bannerStyle.sliderImage}
          />
        ))}
      </div>
      <button className={bannerStyle.prevBtn} onClick={handlePrev}>{'<'}</button>
      <button className={bannerStyle.nextBtn} onClick={handleNext}>{'>'}</button>
    </div>
  );
};

export default MainBanner;
