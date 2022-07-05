import React from 'react';
import Tippy from '@tippyjs/react';

interface DropdownProps {
    children: React.ReactElement;
    content: React.ReactNode;
}


const Dropdown = ({children, content, ...rest}: DropdownProps) => {
  return (
    <Tippy>
        {children}
    </Tippy>
  )
}

export default Dropdown
