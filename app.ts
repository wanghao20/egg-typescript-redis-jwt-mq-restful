/**
 * egg 生命周期方法
 * 可管理数据库连接
 */
import { Application, Context, IBoot } from 'egg';

import { getLimiterConfig } from './app/config/LimiterConfig';
const ratelimit = require("koa-ratelimit");
const koaBody = require("koa-body");

export default class FooBoot implements IBoot {
    /**
     * Egg 对象定义
     */
    private readonly app: Application;

    constructor(app: Application) {
        this.app = app;
    }

    /**
     * 准备调用configDidLoad，
     * 配置，引用插件文件，
     */
    async configWillLoad() {
        // 可修改配置。

    }

    /**
     * 配置，插件文件加载成功时调用。
     */
    configDidLoad() {
        // 接收文件上传
        this.app.use(koaBody({
            "multipart": true,
            "formidable": {
                "maxFileSize": 200 * 1024 * 1024	// 设置上传文件大小最大限制，默认2M
            }
        }));
        // http请求次数限制(当前使用ip可切换为用户id)
        this.app.use(ratelimit((getLimiterConfig((ctx: Context) => ctx.ip, this.app.redis.get('db1')))));

    }

    /**
     * 所有文件都已加载成功时调用
     */
    async didLoad() {
    }

    /**
     * 所有的插件都可以在应用程序启动之前做一些准备工作
     * await this.customLoadModel();
     */
    async willReady() {
    }

    /**
     * 工作已经加载完成时调用
     * 不需要阻止应用启动。
     */
    async didReady() {
    }

    /**
     * 服务器正在监听时调用。
     */
    async serverDidReady() {
        console.log("服务器启动成功!")
    }

    /**
     * 在应用关闭之前调用。
     */
    async beforeClose() {
    }
}