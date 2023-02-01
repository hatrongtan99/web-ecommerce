import classNames from "classnames/bind";
import { useMemo } from "react";

import styles from "./breadcrumb.module.scss";
import Link from "next/link";

const cx = classNames.bind(styles);

const Breadcrumb = ({
  listPath,
}: {
  listPath: { name: string; path: string }[];
}) => {
  const pathNames = useMemo(() => {
    return listPath.map((item) => item.path);
  }, [listPath]);

  return (
    <nav className={`container-fluid ${cx("wrapper")}`}>
      <ol className={`container ${cx("breadcrumb")}`}>
        <li className={cx("breadcrumb__item")}>
          <Link href="/">Trang chủ</Link>
        </li>
        {listPath.map((item, index) => {
          const hrefTo = `/${pathNames.slice(0, index + 1).join("/")}`;
          const name = item.name;

          if (index == pathNames.length - 1) {
            return (
              <li className={cx("breadcrumb__item")} key={index}>
                {name}
              </li>
            );
          }
          return (
            <li className={cx("breadcrumb__item")} key={index}>
              <Link href={hrefTo}>{name}</Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
