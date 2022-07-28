import classNames from "classnames/bind";
import styles from './spinner.module.scss';
const cx = classNames.bind(styles)

const Spinner = () => {
  return (
    <div className={`${cx('modal')} d-flex justify-content-center align-items-center`}>
      <div className="spinner-border" role="status"></div>
    </div>
  )
}

export default Spinner