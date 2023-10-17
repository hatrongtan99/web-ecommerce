import { ElementType, ReactNode, ComponentProps, CSSProperties, HtmlHTMLAttributes } from "react";
import classNames from "classnames/bind";
import styles from "./button.module.scss";

const cx = classNames.bind(styles);

type ButtonProps<T extends ElementType> = {
    as?: T;
    children: ReactNode;
    size?: "sm" | "md" | "lg";
    variant?:
        | "primary"
        | "primary-border"
        | "secondary-border"
        | "secondary"
        | "text";
    disable?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
};

type MyButtonProps<T extends ElementType> = ButtonProps<T> &
    Omit<ComponentProps<T>, keyof ButtonProps<T>>;

const Button = <T extends ElementType>({
    as,
    children,
    size = "md",
    variant = "primary",
    disable = false,
    leftIcon,
    rightIcon,
    ...props
}: MyButtonProps<T>) => {
    let Component = as || "button";

    const allClassName = cx("custom-btn", {
        [size]: size,
        [variant]: variant,
        "btn-disable": disable,
    });

    if (disable) {
        Object.keys(props as {}).forEach((key) => {
            if (
                // @ts-ignore
                (key.startsWith("on") && typeof props[key] == "function") ||
                key.startsWith("data-bs")
            ) {
                // @ts-ignore
                delete props[key];
            }
        });
    }
    return (
        <Component className={allClassName} {...props}>
            {leftIcon && <span style={{ marginLeft: "-2px" }}>{leftIcon}</span>}
            {children}
            {rightIcon && (
                <span style={{ marginRight: "-2px" }}>{rightIcon}</span>
            )}
        </Component>
    );
};
export default Button;
