import { FieldProps } from 'formik';

interface InputFormProps extends FieldProps {
    leftlabel?: string;
    rightLabel?: string;
    className: string;
    name: string;
    id: string;
    onchange: any
}

const InputForm = ({
    field,
    form: {touched, errors},

    id,
    leftlabel, 
    rightLabel, 
    className, 
    ...props
}: InputFormProps) => {
    return (
        <>
            <div className='d-flex'>
                {leftlabel && <label htmlFor={id || field.name}>{leftlabel}</label>}
                <input
                    {...field}
                    {...props}
                    id={id || field.name}
                    className={className}
                />
                {rightLabel && <label htmlFor={id || field.name} >{rightLabel}</label>}
            </div>
            {touched[field.name] && errors[field.name] && <div className='mt-1' style={{color: 'red', fontSize: '0.8rem'}}>{errors[field.name] as string}</div>}
        </>
  )
}

export default InputForm