import { ErrorMessage, FieldProps } from 'formik';

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
    form,

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
            <ErrorMessage name={field.name} render={(msg) => <div className='mt-1' style={{color: 'red', fontSize: '0.8rem'}}>{msg}</div>}/>
        </>
  )
}

export default InputForm