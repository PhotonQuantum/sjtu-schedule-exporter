import React, {useEffect} from "react";

import {Grid, TextField, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    title: {
        marginBottom: theme.spacing(2)
    }
}))

export const LoginStep = ({user, setUser, setValid}) => {
    const classes = useStyles();
    useEffect(() => setValid(user.username && user.password), [user.username, user.password]);
    return (
        <>
            <Typography variant="h6" gutterBottom>登录 jAccount 账户</Typography>
            <Typography variant="body2" className={classes.title}>您需要授权本工具访问您的 jAccount 账户，本工具才可访问教务系统，并拉取到您的课表。
                在您授权本工具访问您账户 20 分钟后，您账户的登录凭据将被自动销毁。</Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        required
                        label="jAccount 用户名"
                        value={user.username}
                        onChange={(e) => setUser({"username": e.target.value})}
                        variant="outlined"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        type="password"
                        label="jAccount 密码"
                        value={user.password}
                        onChange={(e) => setUser({"password": e.target.value})}
                        variant="outlined"
                        fullWidth
                    />
                </Grid>
            </Grid>
        </>
    )
}