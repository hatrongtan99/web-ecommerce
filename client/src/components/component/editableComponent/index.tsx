import { FieldProps } from 'formik';
import React, {useRef, ReactElement, ReactNode} from 'react'

interface EditableComponentProps extends FieldProps{
    children: ReactElement;
    onChangeProps?: (v: any) => void
}

const EditableComponent = ({
    field,
    form,
    children, 
    onChangeProps
}: EditableComponentProps) => {
    const elementRef = useRef<HTMLElement>(null);

    const onKeyUp = () => {
        if (elementRef.current) {
            const value = elementRef.current.innerText;
            if (onChangeProps) {
                onChangeProps(value);
            }
        }
    };

    const element: ReactElement = React.cloneElement(children, {
        ...field,
    contentEditable: true,
    suppressContentEditableWarning: true,
    ref: elementRef,
    onKeyUp: onKeyUp
    });
    return element;
}

export default EditableComponent