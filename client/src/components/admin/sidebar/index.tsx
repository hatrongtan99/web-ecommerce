import classNames from "classnames/bind";
import Link from 'next/link';
import {useState,} from 'react';
import {AiFillHome} from 'react-icons/ai';
import {IoBagHandleSharp} from 'react-icons/io5';
import {GoTriangleDown} from 'react-icons/go';
import {IoCartSharp} from 'react-icons/io5';
import {SiAddthis} from 'react-icons/si';

import styles from './sidebar.module.scss';
import Image from "next/image";

const cx = classNames.bind(styles);

const sidebarList = [
    {
        leftIcon: <AiFillHome size='24'/>,
        display: 'Dashboard',
        rightIcon: null,
        path: '/admin',
        children: null
    },
    {
        leftIcon: <IoBagHandleSharp size='24'/>,
        display: 'Products',
        rightIcon: <GoTriangleDown/>,
        path: null,
        children: [
            {
                leftIcon: null,
                display: 'Product list view',
                rightIcon: null,
                path: '/admin/product-list-view',
                children: null
            },
            {
                leftIcon: null,
                display: 'Categories',
                rightIcon: null,
                path: '/admin/categories',
                children: null
            }
        ]
    },
    {
        leftIcon: <SiAddthis size='23'/>,
        display: 'Add product',
        rightIcon: null,
        path: '/admin/create-product',
        children: null
    },
    {
        leftIcon: <SiAddthis size='23'/>,
        display: 'Add categories',
        rightIcon: null,
        path: '/admin/create-categories',
        children: null
    },

]

const SideBar = () => {

    const [openSubMenu, setOpenSubMenu] = useState<number | null>(null);
    const [activeMemu, setActiveMenu] = useState<number>(0)
    
  return (
    <div className={`col-2 ${cx('side-bar')}`}>
        <div className={cx('logo')}>
            <Image layout="fill" objectFit="contain" src='https://www.ecommerce-admin.com/demo/images/logo.svg' alt='logo'/>
        </div>

        <ul className={(cx('menu-aside'))}>
            {sidebarList.map((sidebar, index) => {
                return (
                    <li key={index} className={cx('menu-aside__item', {active: activeMemu == index})} onClick={() => setActiveMenu(index)}>
                        {sidebar.path ? 
                            <Link href={sidebar.path} >
                                <a className={cx('menu-aside__item__inner', 'no-children')}>
                                    {sidebar.leftIcon}
                                    <span>{sidebar.display}</span>
                                </a>
                            </Link>
                        : (
                            <div className={cx('menu-aside__item__inner')}>
                                <div className={cx('main-menu-item')}>
                                    {sidebar.leftIcon}
                                    <span>{sidebar.display}</span>
                                    
                                    <div className={cx('right-icon')} onClick={() => openSubMenu ? setOpenSubMenu(null) : setOpenSubMenu(index)}>
                                        {sidebar.rightIcon}
                                    </div>
                                </div>
                                

                                <div className={cx('sub-menu-item', {active: openSubMenu == index})}>
                                    {sidebar.children?.map((subMenu, index) => {
                                        return (
                                            <Link href={subMenu.path} key={index}>
                                                <a>{subMenu.display}</a>
                                            </Link>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                        }
                    </li>
                )
            })}
        </ul>
    </div>
  )
}

export default SideBar