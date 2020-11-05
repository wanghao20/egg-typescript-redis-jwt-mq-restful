

import { Delete, Get, Post, Prefix, Put } from 'egg-router-util';

import { Context, Controller } from 'egg';

import { Validate } from "../utils/ReqValidate";
import { ReturnResult } from "../utils/ReturnResult";
import Cfg from '../entity/mongo/Cfg';

/**
 * Created by wh on 2020/7/15
 * author: wanghao
 * @desc：配置Controllers
 */
@Prefix('/cfg')
export default class GameController extends Controller {

    /**
     * 获取列表
     * @param ctx koa中间件
     */
    @Get("/cfg")
    public async getCfgs(ctx: Context) {
        await Validate.verifyAuth(ctx, "cfg");
        const gameId: string = ctx.params.gameId;
        Validate.isFlexValid(gameId);
        const data = await this.service.cfgService.getCfgs(gameId);

        return ctx.body = ReturnResult.successData(data);
    }
    /**
     * 获取列表
     * @param ctx koa中间件
     */
    @Get("/cfgByCfgId")
    public async cfgByCfgId(ctx: Context) {
        await Validate.verifyAuth(ctx, "cfg");
        const cfg: Cfg = ctx.params;
        const data = await this.service.cfgService.cfgByCfgId(cfg);

        return ctx.body = ReturnResult.successData(data);
    }
    /**
     * 新增
     * @param ctx koa中间件
     */
    @Post("/cfg")
    public async createCfg(ctx: Context) {
        await Validate.verifyAuth(ctx, "cfg");
        const cfg: Cfg = ctx.params;
        Validate.isFlexValid(cfg.gameId);
        cfg.createdBy = ctx.user.id;
        const data = await this.service.cfgService.createCfg(cfg);

        return ctx.body = ReturnResult.successData(data);
    }
    /**
     * 删除
     * @param ctx koa中间件
     */
    @Delete("/cfg")
    public async delectCfg(ctx: Context) {
        await Validate.verifyAuth(ctx, "cfg");
        const cfg: Cfg = ctx.params;
        cfg.updatedBy = ctx.user.id;
        const data = await this.service.cfgService.delectCfg(cfg);

        return ctx.body = ReturnResult.successData(data);
    }
    /**
     * 修改
     * @param ctx koa中间件
     */
    @Put("/cfg")
    public async updateCfg(ctx: Context) {
        await Validate.verifyAuth(ctx, "cfg");
        const cfg: Cfg = ctx.params;
        // 创建/新增版本
        cfg.updatedBy = ctx.user.id;
        cfg.createdBy = ctx.user.id;
        const data = await this.service.cfgService.updateCfg(cfg);

        return ctx.body = ReturnResult.successData(data);
    }
}
