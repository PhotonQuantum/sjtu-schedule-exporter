import {useEffect, useState} from "react";
import {useBoolean} from "@umijs/hooks";

export const useMessage = () => {
    const {state: isOpen, setTrue: setOpen, setFalse: setClose} = useBoolean(false);
    const [snackPack, setSnackPack] = useState([]);
    const [message, setMessage] = useState(undefined);
    useEffect(() => {
        if (snackPack.length && !message) {
            setMessage({...snackPack[0]});
            setSnackPack((prev) => prev.slice(1));
            setOpen();
        } else if (snackPack.length && message && isOpen) {
            setClose();
        }
    }, [snackPack, message, isOpen]);
    const addMessage = (msg) => setSnackPack((prev) => [...prev, msg])
    const clearMessage = () => setMessage(undefined);
    return {message, isOpen, setOpen, setClose, addMessage, clearMessage}
}