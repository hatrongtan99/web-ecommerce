import classNames from 'classnames/bind';
import styles from './filterInput.module.scss';
import {GrCheckbox} from 'react-icons/gr';
import {BsCheckLg} from 'react-icons/bs';
const cx = classNames.bind(styles);
import type {MouseEvent} from 'react';
import Image from 'next/image';

interface FilterInput {
    title?: string;
    image?: string;
    active: boolean;
    handleclick?: (e: MouseEvent<HTMLElement>) => void;
}

const FilterInput = ({title, image, active, handleclick, ...props}: FilterInput) => {
    
  return (
    <div className={cx('filter-input', {active})} {...props} onClick={handleclick}>
        <BsCheckLg className={cx('filter-input__checked')}/>
        <GrCheckbox className={cx('filter-input__unchecked')}/>
        {title ? <span>{title}</span> : null}
        {image ? <div className={cx('img')}><Image layout='fill' objectFit='contain' src={image} alt=''/></div>: null}
    </div>
  )
}

export default FilterInput