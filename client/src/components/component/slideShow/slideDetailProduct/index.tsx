import { useState } from "react";

import classNames from "classnames/bind";
import SlideShow from "../../slideShow";

import styles from './slideDeltailProduct.module.scss';
import {MouseEvent} from 'react';

const imgFake = ['https://maydochuyendung.com/img/uploads/cache_image/500x-GSB-120-li-2019.jpg', 'https://maydochuyendung.com/img/uploads/cache_image/500x-may-khoan-bua-bosch-gbh-2-24-dre.jpg', 'https://maydochuyendung.com/img/uploads/cache_image/500x-bosch-gbh-2-24-dre-1-1601264004.jpg']
const cx = classNames.bind(styles);

const SlideDetailProduct = () => {

  const [coordinates, setCoordinates] = useState<{X: number, Y: number}>({X: 1, Y: 1});

  const [indexImg, setIndexImg] = useState<number>(0);

  // button next or prev
  const handleMoveSlide = (value: string) => {
    if (value === 'next') {
      setIndexImg(indexImg + 1)
    } else {
      setIndexImg(indexImg - 1)
    }
  }

  // zoom img
  const habdleMouseMove = (e: MouseEvent<HTMLElement>) => {
    setCoordinates({X: e.clientX, Y: e.clientY})
  }

  const handleMouseOut = (e: MouseEvent<HTMLElement>) => {
    setCoordinates({X: 1, Y: 1})
  };

  // hanlde click list img
  return (
    <>
      <div className={cx('slide-wraper')}>
        <SlideShow handleMoveSlide={handleMoveSlide}>
          <div className={cx('slide')} style={{width: `${imgFake.length * 450}px`, transform: `translateX(${indexImg * (-100 / imgFake.length)}%)`}}>
            {imgFake.map((img, index) => (
                <div className={cx('slide-item')} onMouseMove={habdleMouseMove} onMouseOut={handleMouseOut} >
                  <img className={cx('img-slide', 'img-main')} src={img}/>
                  <img
                    style={{top: `${coordinates.X}px`, left: `${coordinates.Y}px`}} 
                    className={cx('img-zoom')} 
                    src={img}
                  />
                </div>
            ))}
          </div>
        </SlideShow>
      </div>

      <div className={cx('img-list')}>
        {/* {imgFake.map((img, index) => (
          <img src={img} onClick={() => setIndexImg(index)} key={index}/>
        ))} */}
      </div>
    </>
  )
}

export default SlideDetailProduct