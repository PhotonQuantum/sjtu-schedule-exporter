import React from "react";
import {Home as HomeIcon, Help as HelpIcon, Archive as ArchiveIcon} from "@material-ui/icons"

export const routes = [
    {
        path: "/",
        name: "首页",
        icon: <HomeIcon/>
    },
    {
        path: "/help",
        name: "帮助",
        icon: <HelpIcon/>
    },
    {
        path: "/export",
        name: "导出课表",
        featured_name: "导出我的课表",
        icon: <ArchiveIcon/>
    }
]