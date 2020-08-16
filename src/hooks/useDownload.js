import fileDownload from "js-file-download";

import {useRequest, useSessionStorageState} from "@umijs/hooks";
import {BACKEND_URL} from "../config";

import {formatISO} from "date-fns";

export const useDownload = (session) => {
    const {loading, error, run: download} = useRequest(({year, term, termStart}) => ({
        url: `${BACKEND_URL}/schedule_ics`,
        params: {
            year: year,
            term: term,
            term_start_date: formatISO(termStart, {representation: "date"})
        },
        method: "post",
        body: JSON.stringify({"session": session})
    }), {
        manual: true,
        onSuccess: (result, params) => {
            const param = params[0];
            fileDownload(result, `schedule_${param.year}_${param.term}.ics`, "text/calendar");
        }
    });
    return {loading, error, download};
}

