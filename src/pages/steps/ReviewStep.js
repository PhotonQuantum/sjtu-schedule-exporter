import React, {useEffect} from "react";
import {List, ListItem, ListItemText, Typography} from "@material-ui/core";
import {useSchedule} from "../../hooks/useSchedule";
import {makeStyles} from "@material-ui/core/styles";
import {format, parse} from "date-fns"

const useStyles = makeStyles((theme) => ({
    listItem: {
        padding: theme.spacing(1, 0),
    },
    total: {
        fontWeight: 700,
    },
    title: {
        marginTop: theme.spacing(2),
    },
}));

const chineseMap = {
    1: "一",
    2: "二",
    3: "三",
    4: "四",
    5: "五",
    6: "六",
    7: "日"
}

const parseTime = (lesson) => {
    const weekOfDay = chineseMap[lesson.day];
    const begin = format(parse(lesson.time[0], "HH:mm:ss", new Date()), "HH:mm");
    const end = format(parse(lesson.time[1], "HH:mm:ss", new Date()), "HH:mm");
    return `周${weekOfDay} ${begin}-${end}`;
};

export const ReviewStep = ({session, scheduleConfig, setError, setValid}) => {
    const classes = useStyles();

    const {schedule, error} = useSchedule(session, scheduleConfig.year, scheduleConfig.term);

    useEffect(() => {
        setError(error);
    }, [error]);

    useEffect(() => {
        setValid((schedule.length > 0));
    }, [schedule]);

    return (
        <>
            <Typography variant="h6" gutterBottom>
                课表预览
            </Typography>
            <List disablePadding>
                {schedule.slice(0, 4).map((lesson) => (
                    <ListItem className={classes.listItem} key={lesson.name}>
                        <ListItemText primary={lesson.name} secondary={lesson.teacher_name.join()}/>
                        <Typography variant="body2">{parseTime(lesson)}</Typography>
                    </ListItem>
                ))}
                <ListItem className={classes.listItem}>
                    <ListItemText primary="..."/>
                </ListItem>
                <ListItem className={classes.listItem}>
                    <ListItemText primary="共计"/>
                    <Typography variant="subtitle1" className={classes.total}>
                        {schedule.length} 节次
                    </Typography>
                </ListItem>
            </List>
        </>
    )
}