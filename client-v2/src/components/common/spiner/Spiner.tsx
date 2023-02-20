const Spinner = () => {
    return (
        <div
            className={`d-flex justify-content-center align-items-center`}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(81, 81, 81, 0.2)",
                zIndex: 100,
            }}
        >
            <div className="spinner-border" role="status"></div>
        </div>
    );
};

export default Spinner;
