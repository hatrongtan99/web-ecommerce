import { useState, useEffect, useRef } from 'react';

import SlideShow from '../../../component/slideShow';
import ProductItem from '~/components/component/productItem';


const SlideSpecialProduct = () => {
    
    const [data, setData] = useState<[]>([]);
    
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

    const [indexImg, setIndexImg] = useState<number>(4);
    const [needTransition, setNeedTransition] = useState(true);
    const [isMove, setIsMove] = useState(false);


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
    if (indexImg == data.length - 5) {
        setNeedTransition(false)
        setIndexImg(3);
    } else if (indexImg == 3) {
        setNeedTransition(false)
        setIndexImg(data.length - 5);
    }
    setIsMove(false)
  }

  let style = {transform: `translateX(${indexImg * -25}%)`, transition: `${needTransition ? 'all 0.25s ease 0s' : 'none'}`};

  return (
    <SlideShow handleMoveSlide={handleMoveSlide} handleTransitionEnd={handleTransitionEnd} style={style}>
            {data && data.map((img, index) => {
                return (
                    <div className={`col-3`} key={index}>
                        <ProductItem brandImg={false}/>
                    </div>
                )
            })}
    </SlideShow>
  )
}

export default SlideSpecialProduct