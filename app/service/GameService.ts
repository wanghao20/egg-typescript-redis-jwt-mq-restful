import { v4 as uuidv4 } from "uuid";

import { Service } from 'egg';

import { Paging } from "../format/Type";
import { DateFormat } from "../utils/DateFormat";
import { MysqlDatabase } from '../utils/dataBase/MysqlDatabase';
import BaseGame from "../entity/mysql/game/BaseGame";
/**
 * Created by wh on 2020/7/15
 * author: wanghao
 * @desc：gameService
 */
export default class GameService extends Service {

    /**
     * 获取游戏列表
     */
    public async game(paging: Paging) {
        const data = await MysqlDatabase.executeProc(
            `call proc_games(${paging.page},${paging.limit},"${paging.condition.name}","${paging.condition.status}")`);

        // 解析存储过程数据
        return { "items": data[0], "total": Number(data[1][0].total) };
    }
    /**
     * 获取游戏列表不分页
     */
    public async getGames() {
        const data: any = await this.ctx.repo.mysql.game.BaseGame.find();
        return data;
    }
    /**
     * 新增
     */
    public async createBaseGame(game: BaseGame) {
        game.id = uuidv4();
        game.createdTime = DateFormat.dateFormat(Date.now());
        const data: any = await this.ctx.repo.mysql.game.BaseGame.save(game);

        return data;
    }
    /**
     * 删除
     */
    public async delectBaseGame(game: BaseGame) {
        game.updatedTime = DateFormat.dateFormat(Date.now());
        game.isDelete = 1;
        const data: any = await this.ctx.repo.mysql.game.BaseGame.save(game);

        return data;
    }
    /**
     * 修改
     */
    public async updateBaseGame(game: BaseGame) {
        game.updatedTime = DateFormat.dateFormat(Date.now());
        const data: any = await this.ctx.repo.mysql.game.BaseGame.save(game);

        return data;
    }
}
