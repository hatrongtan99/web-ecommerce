import classNames from "classnames/bind";
import {useRouter} from 'next/router';

import styles from './breadcrumb.module.scss';
import Link from 'next/link';

const cx = classNames.bind(styles);

const Breadcrumb = () => {
  const router = useRouter();
  const pathNames = router.asPath.split('/').filter(x => x);
  return (
    <nav className={cx('wrapper')}>
        <ol className={cx("breadcrumb")}>
            <li className={cx("breadcrumb__item")}><Link href="/">Home</Link></li>
            {pathNames.map((name, index) => {
                
                const hrefTo = `/${pathNames.slice(0, index + 1).join('/')}`;

                if (index == pathNames.length - 1) {
                    return <li className={cx("breadcrumb__item")}>{name}</li>
                }
               return <li className={cx("breadcrumb__item")}><Link href={hrefTo}>{name}</Link></li>
            })}
        </ol>
    </nav>
  )
}

export default Breadcrumb