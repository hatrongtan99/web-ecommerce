
interface ModalPromtProps {
    id: string;
    content: string;
    title?: string;
    buttonTitle: string;
    handle: () => void;
}

const ModalPromt = ({id, content, handle, title, buttonTitle}: ModalPromtProps) => {

    const handleHidenAfterClick = () => {
        handle()
    }

  return (
    <div className="modal fade" id={id} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">{title}</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                {content}
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleHidenAfterClick}>{buttonTitle}</button>
            </div>
            </div>
        </div>
    </div>
  )
}

export default ModalPromt