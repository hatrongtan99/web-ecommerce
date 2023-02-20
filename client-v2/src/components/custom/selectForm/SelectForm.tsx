import { FieldProps } from "formik";
import { ReactNode } from "react";

interface SelectFormProps extends FieldProps {
    children: ReactNode;
    leftlabel: string;
}

const SelectForm = ({
    field,
    form: { touched, errors },

    children,
    leftlabel,
    ...props
}: SelectFormProps) => {
    return (
        <>
            <div className="d-flex">
                {leftlabel && <label>{leftlabel}</label>}
                <select {...props} {...field}>
                    {children}
                </select>
            </div>
            {touched[field.name] && errors[field.name] && (
                <div
                    className="mt-1"
                    style={{ color: "red", fontSize: "0.8rem" }}
                >
                    {errors[field.name] as string}
                </div>
            )}
        </>
    );
};

export default SelectForm;
