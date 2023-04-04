import Button from "../button/Button";

interface Props {
    id: string;
    title?: string;
    body: string;
    titleDismiss?: string;
    titleAgree: string;
    handleAgree?: any;
}

const BackdropModal = ({
    id,
    title,
    body,
    titleDismiss = "Close",
    titleAgree,
    handleAgree,
}: Props) => {
    return (
        <div
            className="modal fade"
            id={id}
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        {title && (
                            <h5
                                className="modal-title"
                                id="staticBackdropLabel"
                            >
                                {title}
                            </h5>
                        )}
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">{body}</div>
                    <div className="modal-footer">
                        <Button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            {titleDismiss}
                        </Button>

                        <Button
                            type="button"
                            variant="primary"
                            style={{ padding: "6px 0", borderRadius: "5px" }}
                            data-bs-dismiss="modal"
                            onClick={handleAgree}
                        >
                            {titleAgree}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BackdropModal;
