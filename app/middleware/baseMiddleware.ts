import { Context } from 'egg';

import { verify } from "jsonwebtoken";

import { BaseConfig } from '../config/Base';
import { JWT_SECRET } from '../config/Constants';
import { StaticStr } from '../config/StaticStr';
import { TbLog } from '../format/Type';
import { bullMqService } from '../service/BullMqService';
import { ReturnResult } from '../utils/ReturnResult';
// 这里是你自定义的中间件
export default function baseMiddleware(): any {
    return async (ctx: Context, next: () => Promise<any>) => {
        // 参数设置
        ctx.params = {
            ...ctx.request.body,
            ...ctx.query
        };
        try {
            // 解决参数影响url地址获取问题
            let url = ctx.originalUrl.substring(0, ctx.originalUrl.indexOf("?"));
            if (url === "") {
                url = ctx.originalUrl;
            }
            if (url.indexOf(BaseConfig.OPEN_FILE_URL) !== -1) {
                // 文件查看
                await next();
            } else if (BaseConfig.OPEN_URL.indexOf(url) !== -1) {
                // 白名单接口直接通过
                await next();
            } else {
                const decodedToken: any = verify(ctx.headers.authentication, JWT_SECRET);
                // 解析token保存到值
                ctx.user = decodedToken.data; // 这里的key = 'user'
                await next();
                // 保存用户操作日志
                operateLog(ctx);
            }
        } catch (error) {
            catchError(ctx, error);
        }

        // 判断404
        if (ctx.status === 404 || ctx.status === 405) {
            // 设置浏览器状态码
            ctx.status = 200;
            return (ctx.body = ReturnResult.errorMsg("未找到当前路径", 404));
        }
        // 记录请求
        logHttp(ctx)

    };

}
/**
 * 捕捉错误处理后记录日志
 * @param ctx koa
 * @param error 错误信息
 */
async function catchError(ctx: Context, error: any) {
    // 判断是否是参数错误
    if (error.msg) {
        // 设置浏览器状态码
        ctx.status = 200;

        return (ctx.body = ReturnResult.errorMsg(error.msg, StaticStr.ERR_CODE_DEFAULT));
    } else if (error.message === "invalid token" || error.message === "jwt must be provided" || error.message === "jwt expired") {
        // 设置浏览器状态码
        ctx.status = 200;
        // token验证错误

        return (ctx.body = ReturnResult.errorMsg("当前token失效", 401));
    } else {
        // 系统错误
        ctx.logger.error(error.message, ctx.ip);
        // 设置浏览器状态码
        ctx.status = 200;

        return (ctx.body = ReturnResult.errorMsg("服务器错误", 500));
    }
}
/**
 * 用户操作记录
 * @param ctx koa
 */
function operateLog(ctx: Context) {
    // 记录日志
    // 过滤日志白名单
    if (BaseConfig.LOG_URL[ctx.routerPath] !== undefined) {
        // 添加到队列中处理
        const remoteAddress = ctx.headers["x-forwarded-for"] || ctx.ip || ctx.ips || (ctx.socket && ctx.socket.remoteAddress);
        const tbLog: TbLog = {};
        tbLog.userId = ctx.user.id;
        tbLog.username = ctx.user.name;
        tbLog.operationMod = ctx.operationUrl || ctx.originalUrl;
        tbLog.operationType = ctx.request.method;
        tbLog.ip = remoteAddress;
        // 截取url
        if (tbLog.operationMod.indexOf("?") !== -1) {
            tbLog.operationMod = tbLog.operationMod.split("?")[0];
        }
        tbLog.operationMod = BaseConfig.LOG_URL[tbLog.operationMod];
        bullMqService.saveObjMq(tbLog, "tbLog");
    }

}

/**
 * http请求记录
 * @param startTime 
 */
function logHttp(ctx: Context) {

    // 不同类型记录
    if (ctx.body.code === 200) {
        ctx.logger.info(`状态码:${200} - msg:${ctx.body.msg}`);
    } else if (ctx.body.code === 500) {
        ctx.logger.info(`状态码:${ctx.body.code} - msg:${ctx.body.msg}`);
        // 返回HTML的请求
    } else if (ctx.url.indexOf(BaseConfig.OPEN_LOG_URL) !== -1) {
        ctx.logger.info(`状态码:${200} - `);
    } else if (ctx.url.indexOf(BaseConfig.OPEN_LOG_URL1) !== -1) {
        ctx.logger.info(`状态码:${200} - `);
    } else {
        ctx.logger.info(`状态码:${ctx.body.code} - msg:${ctx.body.msg}`);
    }
}