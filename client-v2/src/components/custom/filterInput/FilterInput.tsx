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
    handleClick?: (e: MouseEvent<HTMLElement>) => void;
}

const FilterInput = ({
    title,
    image,
    active,
    handleClick,
    ...props
}: FilterInputProps) => {
    return (
        <div
            className={cx("filter-input", { active })}
            {...props}
            onClick={handleClick}
        >
            <div className="d-flex justify-content-center align-items-center">
                <p>
                    <BsCheckLg
                        className={cx("filter-input__checked", {
                            image_brand: !!image,
                        })}
                    />
                    <GrCheckbox className={cx("filter-input__unchecked")} />
                    {title ? <span>{title}</span> : null}
                </p>

                {image ? (
                    <Image
                        src={image}
                        alt="Picture of the brand"
                        style={{ marginTop: "5px" }}
                        width={60}
                        height={30}
                    />
                ) : null}
            </div>
        </div>
    );
};

export default FilterInput;
