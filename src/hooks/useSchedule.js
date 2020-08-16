import {useMemo} from "react";

import {useRequest, useSessionStorageState} from "@umijs/hooks";

import {BACKEND_URL} from "../config";

export const useSchedule = (session, year, term) => {
    const {data, loading, error} = useRequest(() => ({
        url: `${BACKEND_URL}/schedule`,
        params: {year, term},
        method: "post",
        body: JSON.stringify({"session": session})
    }));
    const schedule = useMemo(() => {
        return ((data && data.classes) ? data.classes : [])
    }, [data])
    return {schedule, loading, error};
}