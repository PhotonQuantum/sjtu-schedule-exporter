import React from "react";

import {DatePicker, KeyboardDatePicker} from "@material-ui/pickers";

import {useMediaQuery} from "@material-ui/core";
import {useTheme} from "@material-ui/core/styles";

export const AdaptiveDatePicker = (props) => {
    const theme = useTheme();
    const smallScreen = useMediaQuery(theme.breakpoints.down(600));
    return (
        <>
            {
                smallScreen ?
                    <DatePicker
                        {...props}
                    />
                    :
                    <KeyboardDatePicker
                        autoOk
                        variant="inline"
                        InputAdornmentProps={{position: "start"}}
                        {...props}
                    />
            }
        </>
    )

}