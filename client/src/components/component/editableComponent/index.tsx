import React, {useRef, ReactElement, ReactNode} from 'react'

interface EditableComponentProps {
    children: ReactElement;
    onChange?: (v: any) => void
}
const EditableComponent = ({children, onChange}: EditableComponentProps) => {
    const elementRef = useRef<HTMLElement>(null);

    const onMouseUp = () => {
        if (elementRef.current) {
            const value = elementRef.current.innerText;
            if (onChange) {
              onChange(value);
            }
        }
    };

    const element: ReactElement = React.cloneElement(children, {
    contentEditable: true,
    suppressContentEditableWarning: true,
    ref: elementRef,
    onKeyUp: onMouseUp
    });
    return element;
}

export default EditableComponent