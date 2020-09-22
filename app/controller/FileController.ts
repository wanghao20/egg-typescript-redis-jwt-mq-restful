
import { Context, Controller } from 'egg';

import { Get, Post, Prefix } from 'egg-router-util';

import { ReturnResult } from "../utils/ReturnResult";

/**
 * Created by wh on 2020/9/7
 * author: wanghao
 * @desc：文件处理Controllers
 */
@Prefix('/common')
export default class FileController extends Controller {


    /**
     * 上传文件
     * @param ctx koa中间件
     */
    @Post("/upload")
    public async createFile(ctx: Context) {
        const data = await this.service.fileService.createFile(ctx);

        return ctx.body = ReturnResult.successData(data);
    }
    /**
     * 下载文件
     * @param ctx koa中间件
     */
    @Get("/download/:name")
    public async downloadFile(ctx: Context) {

        const data = await this.service.fileService.downloadFile(ctx);
        ctx.set('content-type', 'image/jpeg')
        // 设置响应头s

        return ctx.body = data;
    }
}
