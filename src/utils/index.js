import toast from "react-hot-toast";

export const notify = ({ type, message }) => toast[type](message);
