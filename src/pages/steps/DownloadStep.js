import React from "react";
import {Typography, Link} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

export const DownloadStep = (prop) => {
    return (
        <>
            <Typography variant="h5" gutterBottom>您的课表已准备好</Typography>
            <Typography variant="subtitle1" gutterBottom>
                您现在可以直接下载生成的日历文件，或将日历发送至您的邮箱，便可将课表导入您的手机/电脑，或您所喜爱的日历服务中。
            </Typography>
            <Typography variant="subtitle1">
                如您需要帮助，您可查看本站的 <Link href="/help" target="_blank" rel="noopener">帮助页面</Link>。
            </Typography>
        </>
    )
}