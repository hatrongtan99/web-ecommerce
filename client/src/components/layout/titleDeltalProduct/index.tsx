import classNames from "classnames/bind";

import styles from './titleDetailProduct.module.scss';
import StarEvaluate from '~/components/component/starEvaluate';

const cx = classNames.bind(styles);

const TitleDeltailProduct = () => {
  return (
    <div className={cx('wrapper')}>
      <h1 className={cx('name-detail')}>Máy khoan búa Milwaukee M18 CHX-0X0 (bare)</h1>
      <StarEvaluate/>
    </div>
  )
}

export default TitleDeltailProduct