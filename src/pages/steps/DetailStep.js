import React, {useEffect, useMemo} from "react";

import {FormControl, Grid, InputLabel, makeStyles, MenuItem, Select, Typography} from "@material-ui/core";

import DateFnsUtils from "@date-io/date-fns";
import {isValid, startOfWeek} from "date-fns";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";

import {AdaptiveDatePicker} from "../../components/AdaptiveDatePicker";
import {useTermStart} from "../../hooks/useTermStart";

const useStyles = makeStyles((theme) => ({
    title: {
        marginBottom: theme.spacing(2)
    }
}));
const dateEqual = (dateLeft, dateRight) => {
    const yearEqual = (dateLeft.getFullYear() === dateRight.getFullYear());
    const monthEqual = (dateLeft.getMonth() === dateRight.getMonth());
    const dayEqual = (dateLeft.getDay() === dateRight.getDay());
    return yearEqual && monthEqual && dayEqual;
}
export const DetailStep = ({session, scheduleConfig, setScheduleConfig, setError, setValid}) => {
    const classes = useStyles();

    const {date: termStart, error} = useTermStart(session);
    useEffect(() => {
        if (!scheduleConfig.termStart && termStart)
            setScheduleConfig({termStart})
    }, [termStart]);

    const dateYear = useMemo(() => {
        return new Date(scheduleConfig.year, 1, 1)
    }, [scheduleConfig.year])

    const [termStartError, termStartText] = useMemo(() => {
        const date = scheduleConfig.termStart;
        if (!isValid(date)) {
            return [true, "请输入有效的日期"];
        } else if (!dateEqual(startOfWeek(date, {weekStartsOn: 1}), date)) {
            return [true, "学期必须从周一开始"];
        } else {
            return [false, ""];
        }
    }, [scheduleConfig.termStart])
    const [yearError, yearText] = useMemo(() => {
        const date = scheduleConfig.year;
        console.log(date);
        if (!isValid(date)) {
            return [true, "请输入有效的日期"];
        } else {
            return [false, ""];
        }
    }, [scheduleConfig.year])
    useEffect(() => setValid(!yearError && !termStartError), [yearError, termStartError]);

    useEffect(() => setError(error), [error]);

    return (
        <>
            <Typography variant="h6" className={classes.title}>课表设置</Typography>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <AdaptiveDatePicker
                            views={["year"]}
                            inputVariant="outlined"
                            label="学年"
                            error={yearError}
                            helperText={yearText}
                            value={dateYear}
                            onChange={(date) => (setScheduleConfig({year: (date ? date.getFullYear() : undefined)}))}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel>学期</InputLabel>
                            <Select
                                value={scheduleConfig.term}
                                onChange={(e) => setScheduleConfig({term: e.target.value})}
                                label="学期"
                            >
                                <MenuItem value={0}>秋季</MenuItem>
                                <MenuItem value={1}>春季</MenuItem>
                                <MenuItem value={2}>夏季</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <AdaptiveDatePicker
                            format="yyyy/MM/dd"
                            inputVariant="outlined"
                            label="学期开始时间"
                            error={termStartError}
                            helperText={termStartText}
                            value={scheduleConfig.termStart}
                            onChange={(date) => {
                                setScheduleConfig({termStart: date});
                            }}
                            fullWidth
                        />
                    </Grid>
                </Grid>
            </MuiPickersUtilsProvider>
        </>
    )
}
