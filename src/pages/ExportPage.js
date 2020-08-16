import React, {useEffect, useState} from "react";

import {
    Button,
    CircularProgress,
    IconButton,
    makeStyles,
    Paper,
    Snackbar,
    Step,
    StepLabel,
    Stepper,
    Typography,
    useMediaQuery
} from "@material-ui/core";

import {useTheme} from "@material-ui/core/styles";
import {green} from "@material-ui/core/colors";
import {Close as CloseIcon} from "@material-ui/icons";

import {Alert} from "../components/Alert";
import {useLogin} from "../hooks/useLogin";
import {useMessage} from "../hooks/useMessage";
import {useSetState} from "../hooks/useSetState";
import {LoginStep} from "./steps/LoginStep";
import {ReviewStep} from "./steps/ReviewStep";
import {DetailStep} from "./steps/DetailStep";
import {DownloadStep} from "./steps/DownloadStep";
import {useCurrentTerm} from "../hooks/useCurrentTerm";
import {useDownload} from "../hooks/useDownload";
import {useEmail} from "../hooks/useEmail";

const useStyles = makeStyles((theme) => ({
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    stepper: {
        padding: theme.spacing(3, 0, 5)
    },
    stepButtons: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    stepFinal: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    stepGap: {
        flex: 1
    },
    stepButton: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1)
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginLeft: -theme.spacing(1)
    },
    buttonWrapper: {
        position: "relative"
    }
}))

export const ExportPage = () => {
    const classes = useStyles();
    const theme = useTheme();
    const smallScreen = useMediaQuery(theme.breakpoints.down(600));

    const [user, setUser] = useSetState({username: "", password: ""});
    const [defaultYear, defaultTerm] = useCurrentTerm();
    const [scheduleConfig, setScheduleConfig] = useSetState({
        year: defaultYear,
        term: defaultTerm,
        termStart: undefined
    });

    const {session, loading, error: loginError, login, logout} = useLogin();
    const {loading: icsLoading, error: downloadError, download} = useDownload(session);
    const {loading: mailLoading, error: mailError, send: sendMail} = useEmail(session, () => addMessage({
        level: "success",
        text: "您的邮件已经发送。"
    }));

    const [error, setError] = useState(undefined);
    useEffect(() => setError(loginError || downloadError || mailError), [loginError, downloadError, mailError])
    useEffect(() => {
        if (error !== undefined) {
            if (error.data !== undefined) {
                const detail = error.data.detail;
                if (!detail) {
                    addMessage({level: "error", text: `${error.data}`.slice(0, 80)})
                } else {
                    if (detail.includes("Session expired.") ||
                        detail === "Invalid session.") {
                        addMessage({level: "warning", text: "Your session has expired."});
                        logout();
                    } else {
                        addMessage({level: "error", text: detail})
                    }
                }
            } else {
                addMessage({level: "error", text: `${error.message}`.slice(0, 80)})
            }
        }
    }, [error])

    const [valid, setValid] = useState(true);
    const {message, isOpen: messageOpen, setClose: closeMessage, addMessage, clearMessage} = useMessage();

    const steps = [
        {
            name: "账户登录",
            shortName: "登录",
            component: <LoginStep user={user} setUser={setUser} setValid={setValid}/>
        },
        {
            name: "课表设置",
            shortName: "设置",
            component: <DetailStep session={session} scheduleConfig={scheduleConfig}
                                   setScheduleConfig={setScheduleConfig}
                                   setError={setError}
                                   setValid={setValid}/>
        },
        {
            name: "确认课表",
            shortName: "确认",
            component: <ReviewStep session={session} scheduleConfig={scheduleConfig} setError={setError}
                                   setValid={setValid}/>
        }
    ]
    const [activeStep, setStep] = useState(0);
    useEffect(() => {
        if (activeStep === 0 && session !== undefined) {
            setStep(1);
        } else if (activeStep > 0 && session === undefined) {
            setStep(0);
        }
    }, [activeStep, session]);
    const nextStep = () => {
        if (activeStep === 0) {
            login(user.username, user.password);
        } else {
            setStep(activeStep + 1);
        }
    }
    const prevStap = () => {
        if (activeStep === 1) {
            logout();
        } else {
            setStep(activeStep - 1);
        }
    }
    const resetStep = () => setStep(1);

    return (
        <main className={classes.layout}>
            <Snackbar open={messageOpen} autoHideDuration={6000} onClose={closeMessage} onExited={clearMessage}
                      action={
                          <IconButton aria-label="close" color="inherit" onClick={closeMessage}>
                              <CloseIcon/>
                          </IconButton>
                      }>
                {message && <Alert onClose={closeMessage} severity={message.level}>{message.text}</Alert>}
            </Snackbar>
            <Paper className={classes.paper}>
                <Typography variant="h5" align="center">导出课表</Typography>
                <Stepper activeStep={activeStep} className={classes.stepper}>
                    {steps.map((elem, idx) => (
                        <Step key={idx}><StepLabel>{smallScreen ? elem.shortName : elem.name}</StepLabel></Step>
                    ))}
                </Stepper>
                {activeStep !== steps.length ?
                    <>
                        {steps[activeStep].component}
                        <div className={classes.stepButtons}>
                            {activeStep !== 0 && (
                                <Button onClick={prevStap} className={classes.stepButton}>
                                    返回
                                </Button>
                            )}
                            <div className={classes.buttonWrapper}>
                                <Button variant="contained" color="primary" onClick={nextStep}
                                        disabled={loading || !valid}
                                        className={classes.stepButton}>
                                    {activeStep === steps.length - 1 ? "确认导出" : "下一步"}
                                </Button>
                                {loading && <CircularProgress size={24} className={classes.buttonProgress}/>}
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <DownloadStep/>
                        <div className={classes.stepFinal}>
                            <Button onClick={resetStep} className={classes.stepButton}>
                                返回
                            </Button>
                            <div className={classes.stepGap}/>
                            <div className={classes.buttonWrapper}>
                                <Button onClick={() => download(scheduleConfig)} className={classes.stepButton}
                                        disabled={icsLoading}>
                                    下载日历
                                </Button>
                                {icsLoading && <CircularProgress size={24} className={classes.buttonProgress}/>}
                            </div>
                            <div className={classes.buttonWrapper}>
                                <Button variant="contained" color="primary" onClick={() => sendMail(scheduleConfig)}
                                        disabled={mailLoading}
                                        className={classes.stepButton}>
                                    发送到邮箱
                                </Button>
                                {mailLoading && <CircularProgress size={24} className={classes.buttonProgress}/>}
                            </div>
                        </div>
                    </>
                }
            </Paper>
        </main>
    )
}
