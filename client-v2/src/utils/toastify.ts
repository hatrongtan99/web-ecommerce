import { toast } from "react-toastify";

const notify = (
    type: "success" | "error" | "warn" = "success",
    message: string = ""
) => {
    return toast[type](message);
};

export default notify;
