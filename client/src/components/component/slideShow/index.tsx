import classNames from 'classnames/bind';
import styles from './slideShow.module.scss';
import {GrNext, GrPrevious} from 'react-icons/gr';

import type { ReactNode } from 'react';
const cx = classNames.bind(styles);

interface SlideShowProps {
    children: ReactNode;
    handleMoveSlide: (value: string) => void;
}

const SlideShow = ({children, handleMoveSlide}: SlideShowProps) => {
  return (
    <div className={cx('slide-wrapper')}>
        <span className={cx('slide-btn', 'prev')}>
            <button onClick={() => handleMoveSlide('prev')}><GrPrevious size={20}/></button>
        </span>
        {children}
        <span className={cx('slide-btn', 'next')}>
            <button onClick={() => handleMoveSlide('next')}><GrNext size={20}/></button>
        </span>
    </div>
  )
}

export default SlideShow