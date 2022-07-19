import { useState, useRef, useEffect } from "react";

import classNames from "classnames/bind";
import SlideShow from "../../../component/slideShow";

import styles from './slideDeltailProduct.module.scss';
import {MouseEvent} from 'react';

const imgFake = [
  'https://maydochuyendung.com/img/uploads/cache_image/500x-bosch-gbh-2-24-dre-1-1601264004.jpg',
  'https://maydochuyendung.com/img/uploads/cache_image/500x-GSB-120-li-2019.jpg', 
  'https://maydochuyendung.com/img/uploads/cache_image/500x-may-khoan-bua-bosch-gbh-2-24-dre.jpg', 
  'https://maydochuyendung.com/img/uploads/cache_image/500x-bosch-gbh-2-24-dre-1-1601264004.jpg',
  'https://maydochuyendung.com/img/uploads/cache_image/500x-GSB-120-li-2019.jpg'
]

const cx = classNames.bind(styles);

const SlideDetailProduct = () => {

  const [indexImg, setIndexImg] = useState<number>(1);
  const [needTransition, setNeedTransition] = useState(true);
  const [isMove, setIsMove] = useState(false);

  // ref
  const magnifyLensRef = useRef<HTMLDivElement[]>([]);
  const magnifyImgRef = useRef<HTMLDivElement[]>([]);

  // zoom img
  const habdleMouseMove = (e: MouseEvent<HTMLElement>, i: number) => {
    if (magnifyLensRef.current !== null && magnifyImgRef !== null) {
      const imgRect = magnifyImgRef.current[i].getBoundingClientRect();
      let x = e.pageX - imgRect.left - window.scrollX - (magnifyLensRef.current[i].offsetWidth / 2)
      let y = e.pageY - imgRect.top - window.scrollY - (magnifyLensRef.current[i].offsetHeight / 2)
      
      const MAX_X = imgRect.width - (magnifyLensRef.current[i].offsetWidth);
      const MAX_Y = imgRect.height - (magnifyLensRef.current[i].offsetHeight);

      if (x > MAX_X) x = MAX_X;
      if (x < 0) x = 0;
      if (y > MAX_Y) y = MAX_Y;
      if (y < 0) y = 0;

      magnifyLensRef.current[i].style.cssText = `top: ${y}px; left: ${x}px;`;
      const cx = imgRect.width / magnifyLensRef.current[i].offsetWidth;
      const cy = imgRect.height / magnifyLensRef.current[i].offsetHeight;

      magnifyImgRef.current[i].style.cssText = `
        opacity: 1;
        background: url(${imgFake[i]}) -${x*cx}px -${y*cy}px / ${imgRect.width * cx}px ${imgRect.height * cy}px no-repeat
      `
    }
  }

  const habdleMouseOut = (e: MouseEvent<HTMLElement>, i: number) => {
    magnifyImgRef.current[i].style.cssText = `
        background: unset;
        opacity: 0;
      `
  };

  // handle move slide
  const handleMoveSlide = (value: string) => {
    if (isMove) return
    if (value == 'next') {
        setIndexImg((indexImg + 1))
        setNeedTransition(true)
    } else if (value == 'prev') {
        setIndexImg((indexImg - 1))
        setNeedTransition(true)
    }
    setIsMove(true)
  };

  const handleTransitionEnd = () => {
    if (indexImg == imgFake.length - 1) {
        setNeedTransition(false)
        setIndexImg(1);
    } else if (indexImg == 0) {
        setNeedTransition(false)
        setIndexImg(imgFake.length - 2);
    }
    setIsMove(false)
  }

  let style = {transform: `translateX(${indexImg * -100}%)`, transition: `${needTransition ? 'all 0.25s ease 0s' : 'none'}`};

  return (
    <>
      <div className={cx('slide-wraper')}>
        <SlideShow handleMoveSlide={handleMoveSlide} handleTransitionEnd={handleTransitionEnd} style={style}>
            {imgFake.map((img, index) => {
              return (
                <div className={cx('slide-item')}>
                <img 
                  src={img} 
                />
                <div 
                  className={cx('magnify-lens')} 
                  ref={el => el && (magnifyLensRef.current[index] = el)} 
                  onMouseMove={(e) => habdleMouseMove(e, index)}
                ></div>
                <div 
                  className={cx('magnify')} 
                  onMouseOut={(e) => habdleMouseOut(e, index)}
                  onMouseMove={(e) => habdleMouseMove(e, index)}
                  ref={el => el && (magnifyImgRef.current[index] = el)}
                ></div>
              </div>
              )
            })}
        </SlideShow>
      </div>

      <div className={cx('img-list')}>
        {imgFake.map((img, index) => {
          if (index == 0 || index == imgFake.length - 1) return
          return (
            <div className={cx('img-list__item', {active: indexImg == index})} key={index}>
              <img src={img} onClick={() => setIndexImg(index)} />
            </div> 
          )
        })}
      </div>
    </>
  )
}

export default SlideDetailProduct