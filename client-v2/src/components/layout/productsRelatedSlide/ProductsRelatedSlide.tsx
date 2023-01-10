import classNames from 'classnames/bind';
import { MouseEvent, useState } from 'react';
import ProductItem from '~components/common/product/productItem/ProductItem';
import SlideShow from '~components/common/product/slideShow/SlideShow';

import styles from './productsRelatedSlide.module.scss';
const cx = classNames.bind(styles);

interface ProductsRelatedSlideProps {
    title: string;
}

const ProductsRelatedSlide = ({ title }: ProductsRelatedSlideProps) => {
    const [indexImg, setIndexImg] = useState<number>(4);
    const [needTransition, setNeedTransition] = useState(true);
    const [isMove, setIsMove] = useState(false);

    const handleMoveSlide = (value: string) => {
        if (isMove) return;
        if (value == 'next') {
            setIndexImg(indexImg + 1);
            setNeedTransition(true);
        } else if (value == 'prev') {
            setIndexImg(indexImg - 1);
            setNeedTransition(true);
        }
        setIsMove(true);
    };

    const handleTransitionEnd = () => {
        // if (indexImg == data.length - 5) {
        //     setNeedTransition(false)
        //     setIndexImg(3);
        // } else if (indexImg == 3) {
        //     setNeedTransition(false)
        //     setIndexImg(data.length - 5);
        // }
        // setIsMove(false)
    };

    let style = {
        transform: `translateX(${indexImg * -25}%)`,
        transition: `${needTransition ? 'all 0.25s ease 0s' : 'none'}`,
    };

    return (
        <div className={cx('product-related')}>
            <h3 className={cx('title')}>{title}</h3>
            <SlideShow
                handleMoveSlide={handleMoveSlide}
                handleTransitionEnd={handleTransitionEnd}
                style={style}
            >
                <div className={`col-3`}>
                    <ProductItem brandImg={false} />
                </div>

                <div className={`col-3`}>
                    <ProductItem brandImg={false} />
                </div>

                <div className={`col-3`}>
                    <ProductItem brandImg={false} />
                </div>

                <div className={`col-3`}>
                    <ProductItem brandImg={false} />
                </div>
            </SlideShow>
        </div>
    );
};

export default ProductsRelatedSlide;
