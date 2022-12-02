import SearchInput from "./searchInput";
import classNames from 'classnames/bind';
import styles from './header.module.scss';

const cx = classNames.bind(styles);

const Header = () => {

  return (
    <header className={`container-fluid ${cx('header-wrapper')}`}>
      <div className={`row ${cx('header')}`}>
        <div className={`col-2 ${cx('header__logo')}`}>logo</div>

        {/* search */}
        <SearchInput />

        {/* cart */}
        <div className={`col-2 ${cx('header__cart')}`}></div>
        <div className={`col-2 ${cx('header__contact')}`}></div>
      </div>
    </header>
  )
}

export default Header