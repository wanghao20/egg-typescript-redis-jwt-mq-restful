

import { Delete, Get, Post, Prefix, Put } from 'egg-router-util';

import { Context, Controller } from 'egg';

import { Paging } from "../format/Type";
import { Validate } from "../utils/ReqValidate";
import { ReturnResult } from "../utils/ReturnResult";
import BaseGame from "../entity/mysql/game/BaseGame";

/**
 * Created by wh on 2020/7/15
 * author: wanghao
 * @desc：游戏Controllers
 */
@Prefix('/game')
export default class GameController extends Controller {


    /**
     * 获取游戏列表
     * @param ctx koa中间件
     */
    @Get("/games")
    public async getGames(ctx: Context) {
        const data = await this.service.gameService.getGames();

        return ctx.body = ReturnResult.successData(data);
    }
    /**
     * 获取游戏列表
     * @param ctx koa中间件
     */
    @Get("/game")
    public async games(ctx: Context) {
        await Validate.verifyAuth(ctx, "game");
        const paging: Paging = ctx.params;
        paging.condition = JSON.parse(paging.condition);
        const data = await this.service.gameService.game(paging);

        return ctx.body = ReturnResult.successData(data);
    }
    /**
     * 新增
     * @param ctx koa中间件
     */
    @Post("/game")
    public async createBaseGame(ctx: Context) {
        await Validate.verifyAuth(ctx, "game");
        const game: BaseGame = ctx.params;
        game.createdBy = ctx.user.id;
        const data = await this.service.gameService.createBaseGame(game);

        return ctx.body = ReturnResult.successData(data);
    }
    /**
     * 删除
     * @param ctx koa中间件
     */
    @Delete("/game")
    public async delectBaseGame(ctx: Context) {
        await Validate.verifyAuth(ctx, "game");
        const game: BaseGame = ctx.params;
        game.updatedBy = ctx.user.id;
        const data = await this.service.gameService.delectBaseGame(game);

        return ctx.body = ReturnResult.successData(data);
    }
    /**
     * 修改
     * @param ctx koa中间件
     */
    @Put("/game")
    public async updateBaseGame(ctx: Context) {
        await Validate.verifyAuth(ctx, "game");
        const game: BaseGame = ctx.params;
        game.updatedBy = ctx.user.id;
        const data = await this.service.gameService.updateBaseGame(game);

        return ctx.body = ReturnResult.successData(data);
    }
}
