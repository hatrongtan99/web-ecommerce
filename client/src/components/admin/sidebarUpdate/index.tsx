import classNames from 'classnames/bind';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useAppSelector } from '~/redux/hooks';
import { ProductBycategoryAndSlugResult } from '~/types/index';
import styles from './sidebar.module.scss';

const cx = classNames.bind(styles);

const linkListUpdate = (product: ProductBycategoryAndSlugResult) => {
    return [
        {
            display: 'Sản Phẩm',
            path: `/admin/update/${product.category}/${product.slug}`
        },
        {
            display: 'Catalog',
            path: `/admin/update/catalog/${product.category}/${product.slug}`
        },
        {
            display: 'Mô tả',
            path: `/admin/update/description/${product.category}/${product.slug}`
        }
    ]
} 

const SidebarUpdate = () => {
    const router = useRouter()
    const product = useAppSelector(state => state.products.dataByCategoryAndSlug);
    return (
        <div className={cx('sidebar-update')}>
            <ul className={cx('link-list')}>
                {linkListUpdate(product).map((item, index) => (
                    <li key={index} className={cx({active: router.asPath == item.path})}>
                        <Link href={item.path}>{item.display}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default SidebarUpdate