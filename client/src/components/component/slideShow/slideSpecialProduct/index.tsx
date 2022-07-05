import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './slideSpecialProduct.module.scss';

import SlideShow from '..';
import ProductItem from '~/components/component/productItem';

const cx = classNames.bind(styles);

const SlideSpecialProduct = () => {
    
    const [data, setData] = useState([]);
    const [indexImg, setIndexImg] = useState(4);
    const [needTransition, setNeedTransition] = useState(true);
    const [isMove, setIsMove] = useState(false)

    useEffect(() => {
        const fetchImg = async () => {
            const res = await (await fetch('https://jsonplaceholder.typicode.com/photos')).json();
            let data = res.slice(0, 12)
            data = [...data, ...data.slice(0, 4)]
            data = [...data.slice(data.length - 8, data.length - 4), ... data]
            setData(data)
        }

        fetchImg()
    }, [])

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

    let style = {transform: `translateX(${indexImg * -25}%)`, transition: `${needTransition ? 'all 0.25s ease 0s' : 'none'}`}

    const handleTransitionEnd = () => {
        if (indexImg == data.length - 5) {
            setNeedTransition(false)
            setIndexImg(3);
        } else if (indexImg == 3) {
            setNeedTransition(false)
            setIndexImg(data.length - 5);
        }
        setIsMove(false)
    }
    
  return (
    <SlideShow handleMoveSlide={handleMoveSlide}>
        <div className={`${cx('slide-product-wrapper')}`} style={style} onTransitionEnd={handleTransitionEnd} >
            {data && data.map((img, index) => {
                return (
                    <div className={`col-3`} key={index}>
                        <ProductItem brandImg={false}/>
                    </div>
                )
            })}
        </div>
    </SlideShow>
  )
}

export default SlideSpecialProduct