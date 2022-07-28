import { FieldProps } from 'formik';

interface InputFormProps extends FieldProps {
    leftlabel?: string;
    rightLabel?: string;
    className: string;
    name: string;
    id: string;
}

const InputForm = ({
    field,
    form: {touched, errors},

    name, 
    id,
    leftlabel, 
    rightLabel, 
    className, 
    ...props
}: InputFormProps) => {
    return (
        <>
            {leftlabel && <label htmlFor={id || name}>{leftlabel}</label>}
            <input
                {...field}
                {...props}
                id={id}
                className={className} 
            />
            {rightLabel && <label htmlFor={id || name} >{rightLabel}</label>}
            {touched[field.name] && errors[field.name] && <div className='mt-1' style={{color: 'red', fontSize: '0.8rem'}}>{errors[field.name] as string}</div>}
        </>
  )
}

export default InputForm