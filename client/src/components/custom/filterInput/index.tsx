import classNames from 'classnames/bind';
import styles from './filterInput.module.scss';
import {GrCheckboxSelected, GrCheckbox} from 'react-icons/gr';
import {BsCheckLg} from 'react-icons/bs';
const cx = classNames.bind(styles);
import type {MouseEvent} from 'react';

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
        {image ? <img src={image} />: null}
    </div>
  )
}

export default FilterInput