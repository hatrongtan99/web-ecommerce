import {ReactNode} from 'react';
import Link from 'next/link';
import classNames from 'classnames/bind';
import styles from './linkButton.module.scss';

const cx = classNames.bind(styles)

type LinkButtonProps = {
    href: string;
    children: ReactNode;
    variant?: 'primary' | 'primary-border' | 'secondary-border';
    size?: 'sm' | 'md' | 'lg';
    disable?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
};

const LinkButton = ({
    href, 
    children,
    variant = 'primary',
    size = 'md', 
    disable,
    leftIcon, 
    rightIcon, 
    ...props
}: LinkButtonProps) => {
  
    const allClassName = cx('custom-link-btn', {[size]: size, [variant]: variant, 'btn-disable': disable})

    return (
    <Link href={href} {...props}>
        <a className={allClassName} onClick={(e) => disable ? e.preventDefault() : null}>
            {leftIcon && <span style={{marginLeft: '-2px'}}>{leftIcon}</span>}
            {children}
            {rightIcon && <span style={{marginRight: '-2px'}}>{rightIcon}</span>}
        </a>
    </Link>
  )
}

export default LinkButton