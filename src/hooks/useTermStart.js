import {useMemo} from "react";

import {useRequest, useSessionStorageState} from "@umijs/hooks";
import parseISO from "date-fns/parseISO"

import {BACKEND_URL} from "../config";

export const useTermStart = (session) => {
    const {data, loading, error} = useRequest(() => ({
        url: `${BACKEND_URL}/term_start`,
        method: "post",
        body: JSON.stringify({"session": session})
    }));
    const date = useMemo(() => {
        return (((data && data.term_start) ? parseISO(data.term_start) : undefined))
    }, [data]);
    return {date, loading, error};
}