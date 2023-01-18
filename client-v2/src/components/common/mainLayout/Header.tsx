import classNames from "classnames/bind";
import styles from "./mainLayout.module.scss";
import SearchInput from "./SearchInput";

const cx = classNames.bind(styles);

const Header = () => {
  return (
    <header className={`container-fluid ${cx("header-wrapper")}`}>
      <div className={`row ${cx("header")}`}>
        <div className={`col-2 ${cx("header__logo")}`}>logo</div>

        {/* search */}
        <div className={`col-3 ${cx("header__search")}`}>
          <SearchInput />
        </div>

        {/* cart */}
        <div className={`col-2 ${cx("header__cart")}`}></div>
        <div className={`col-2 ${cx("header__contact")}`}></div>
      </div>
    </header>
  );
};

export default Header;
