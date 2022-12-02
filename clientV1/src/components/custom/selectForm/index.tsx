import { ErrorMessage, FieldProps } from "formik";
import { ReactNode } from "react";

interface SelectFormProps extends FieldProps {
    children: ReactNode;
    leftlabel: string
}

const SelectForm = ({
    field,
    form: {touched, errors},

    children,
    leftlabel,
    ...props
}: SelectFormProps) => {
  return (
    <>
      <div className='d-flex'>
        {leftlabel && <label>{leftlabel}</label>}
        <select {...props} {...field} >
            {children}
        </select>
      </div>
      <ErrorMessage name={field.name} render={(msg) => <div className='mt-1' style={{color: 'red', fontSize: '0.8rem'}}>{msg}</div>}/>
    </>
  )
}

export default SelectForm