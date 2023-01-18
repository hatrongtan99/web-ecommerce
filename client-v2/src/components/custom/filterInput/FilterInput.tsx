import { MouseEvent } from "react";
import { BsCheckLg } from "react-icons/bs";
import { GrCheckbox } from "react-icons/gr";
import Image from "next/image";
import classNames from "classnames/bind";

import styles from "./filterInput.module.scss";
const cx = classNames.bind(styles);

interface FilterInputProps {
  title?: string;
  image?: string;
  active: boolean;
  handleclick?: (e: MouseEvent<HTMLElement>) => void;
}

const FilterInput = ({
  title,
  image,
  active,
  handleclick,
  ...props
}: FilterInputProps) => {
  return (
    <div
      className={cx("filter-input", { active })}
      {...props}
      onClick={handleclick}
    >
      <div>
        <BsCheckLg className={cx("filter-input__checked")} />
        <GrCheckbox className={cx("filter-input__unchecked")} />
        {title ? <span>{title}</span> : null}
      </div>
      {image ? (
        <Image
          src={image}
          alt="Picture of the brand"
          style={{ marginTop: "5px" }}
          width={30}
          height={30}
        />
      ) : null}
    </div>
  );
};

export default FilterInput;
