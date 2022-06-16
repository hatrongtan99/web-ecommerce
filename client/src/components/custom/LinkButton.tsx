import {ReactNode} from 'react';
import Link from 'next/link';
import {MouseEvent} from 'react'

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
  
    const allClass = `custom-link-btn ${variant} ${size} ${disable ? 'btn-disabled' : ''}`;

    return (
    <Link href={href} {...props}>
        <a className={allClass} onClick={(e) => disable ? e.preventDefault() : null}>
            {leftIcon && <span style={{marginLeft: '-2px'}}>{leftIcon}</span>}
            {children}
            {rightIcon && <span style={{marginRight: '-2px'}}>{rightIcon}</span>}
        </a>
    </Link>
  )
}

export default LinkButton