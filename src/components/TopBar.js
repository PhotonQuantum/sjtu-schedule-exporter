import React from 'react';

import {
    AppBar,
    Button,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    useMediaQuery
} from "@material-ui/core"

import {makeStyles, useTheme} from "@material-ui/core/styles";
import {Menu as MenuIcon} from "@material-ui/icons";

import {Link as RouterLink} from "react-router-dom"
import {useBoolean} from "@umijs/hooks";

const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1
    },
    topButton: {
        margin: theme.spacing(0, 0, 0, 1)
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    drawerList: {
        paddingTop: theme.spacing(2),
        width: 250
    }
}))

export const TopBar = (prop) => {
    const {state: drawer, setTrue: drawerOpen, setFalse: drawerClose} = useBoolean(false);
    const classes = useStyles();
    const theme = useTheme();
    const smallScreen = useMediaQuery(theme.breakpoints.down(600));
    const topButtons = prop.routes.map((item) => (
        <Button color="inherit" size="large" component={RouterLink} to={item.path}
                variant={item.featured_name !== undefined ? "outlined" : undefined}
                className={classes.topButton}>
            {item.featured_name !== undefined ? item.featured_name : item.name}
        </Button>
    ));
    const drawerItems = (
        <div className={classes.drawerList}>
            <List>
                {prop.routes.map((item) => (
                    <>
                        <ListItem button component={RouterLink} key={item.name} to={item.path}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.name}/>
                        </ListItem>
                    </>
                ))}
            </List>
        </div>
    )

    return (
        <>
            <Drawer open={drawer} onClose={drawerClose} onClick={drawerClose}>
                {drawerItems}
            </Drawer>
            <AppBar position="static">
                <Toolbar>
                    {smallScreen &&
                    <IconButton onClick={drawerOpen} edge="start" className={classes.menuButton}
                                color="inherit">
                        <MenuIcon/>
                    </IconButton>
                    }
                    <Typography variant="h6" noWrap className={classes.title}>SJTU Schedule Exporter</Typography>
                    {!smallScreen &&
                    <>
                        {topButtons}
                    </>
                    }
                </Toolbar>
            </AppBar>
        </>
    );
}
