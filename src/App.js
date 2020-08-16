import React from 'react';

import {CssBaseline} from "@material-ui/core";

import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import {blue, deepPurple} from "@material-ui/core/colors";

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import {TopBar} from "./components/TopBar";
import {ExportPage} from "./pages/ExportPage";
import {routes} from "./routes";

const theme = createMuiTheme({
    palette: {
        primary: blue,
        secondary: deepPurple
    },
})

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <CssBaseline/>
                <TopBar routes={routes}/>
                <Switch>
                    <Route path="/export">
                        <ExportPage/>
                    </Route>
                    <Route path="/help">
                        Help
                    </Route>
                    <Route path="/">
                        Home
                    </Route>
                </Switch>
            </Router>
        </ThemeProvider>
    );
}

export default App;
