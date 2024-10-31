import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const showToast = (type: string, message: string, time: number) => {
    if (type === 'warning') {
        toast.warning(message, {
            position: "top-center",
            autoClose: time,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    } else if (type === 'success') {
        toast.success(message, {
            position: "top-center",
            autoClose: time,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
};