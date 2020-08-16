import {useRequest, useSessionStorageState} from "@umijs/hooks";
import {BACKEND_URL} from "../config";

import {formatISO} from "date-fns";

export const useEmail = (session, onSuccess) => {
    const {loading, error, run: send} = useRequest(({year, term, termStart}) => ({
        url: `${BACKEND_URL}/mail_ics`,
        params: {
            year: year,
            term: term,
            term_start_date: formatISO(termStart, {representation: "date"})
        },
        method: "post",
        body: JSON.stringify({"session": session})
    }), {
        manual: true,
        onSuccess: onSuccess
    });
    return {loading, error, send};
}

