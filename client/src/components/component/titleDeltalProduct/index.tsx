import classNames from "classnames/bind";

import styles from './titleDetailProduct.module.scss';
import StarEvaluate from '~/components/component/starEvaluate';

const cx = classNames.bind(styles);

const TitleDeltailProduct = ({title}: {title: string}) => {
  return (
    <div className={cx('wrapper')}>
      <h1 className={cx('name-detail')}>{title}</h1>
      <StarEvaluate/>
    </div>
  )
}

export default TitleDeltailProduct