import {useRequest, useSessionStorageState} from "@umijs/hooks";
import {BACKEND_URL} from "../config";

export const useLogin = () => {
    const [session, setSession] = useSessionStorageState("sessionId", undefined);
    const {loading, error, run: login} = useRequest((username, password) => ({
        url: `${BACKEND_URL}/login`,
        method: "post",
        body: JSON.stringify({"username": username, "password": password})
    }), {
        manual: true,
        onSuccess: (result, params) => setSession(result.session)
    });
    const {run: logout} = useRequest({
        url: `${BACKEND_URL}/logout`,
        method: "post",
        body: JSON.stringify({"session": session})
    }, {
        manual: true,
        onSuccess: () => setSession(),
        onError: () => setSession()
    });
    return {session, loading, error, login, logout};
}