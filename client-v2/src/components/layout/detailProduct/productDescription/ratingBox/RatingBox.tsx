import classNames from 'classnames/bind';
import Button from '~components/custom/button/Button';
import { AiTwotoneStar } from 'react-icons/ai';

import styles from './ratingBox.module.scss';

const cx = classNames.bind(styles);

const RatingBox = () => {
    const rating = 4;
    return (
        <div className={cx('rating')}>
            <div className={cx('rating__header')}>
                <h3>Đánh giá sản phẩm</h3>
                <Button size="sm">Đánh Giá Ngay</Button>
            </div>

            <div className={cx('rating__box')}>
                <div className={cx('rating__box__result')}>
                    <p>{rating.toFixed(1)}</p>
                    <div className={cx('rating__box__star')}>
                        {new Array(5).fill(0).map((star, index) => (
                            <AiTwotoneStar
                                size={25}
                                color={index + 1 <= rating ? '#f4c91f' : '#ddd'}
                                key={index}
                            />
                        ))}
                    </div>
                    <span>1 đánh giá</span>
                </div>

                <div className={`row ${cx('rating__products')}`}>
                    <div className="col-6">
                        <div className={cx('rating__products__item')}>
                            <div className={cx('info-left')}>
                                5 <AiTwotoneStar size={18} color="#f4c91f" />
                            </div>
                            <div className={cx('rating-process')}>
                                <span></span>
                            </div>
                            <div className={cx('info-right')}>
                                <p>100%</p>
                                <span>1 đánh giá</span>
                            </div>
                        </div>

                        <div className={cx('rating__products__item')}>
                            <div className={cx('info-left')}>
                                4 <AiTwotoneStar size={18} color="#f4c91f" />
                            </div>
                            <div className={cx('rating-process')}>
                                <span></span>
                            </div>
                            <div className={cx('info-right')}>
                                <p>0%</p>
                                <span>0 đánh giá</span>
                            </div>
                        </div>

                        <div className={cx('rating__products__item')}>
                            <div className={cx('info-left')}>
                                3 <AiTwotoneStar size={18} color="#f4c91f" />
                            </div>
                            <div className={cx('rating-process')}>
                                <span></span>
                            </div>
                            <div className={cx('info-right')}>
                                <p>0%</p>
                                <span>0 đánh giá</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className={cx('rating__products__item')}>
                            <div className={cx('info-left')}>
                                2 <AiTwotoneStar size={18} color="#f4c91f" />
                            </div>
                            <div className={cx('rating-process')}>
                                <span></span>
                            </div>
                            <div className={cx('info-right')}>
                                <p>0%</p>
                                <span>0 đánh giá</span>
                            </div>
                        </div>

                        <div className={cx('rating__products__item')}>
                            <div className={cx('info-left')}>
                                1 <AiTwotoneStar size={18} color="#f4c91f" />
                            </div>
                            <div className={cx('rating-process')}>
                                <span></span>
                            </div>
                            <div className={cx('info-right')}>
                                <p>0%</p>
                                <span>0 đánh giá</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RatingBox;
