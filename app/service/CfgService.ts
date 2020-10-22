const fs = require("fs");

import { v4 as uuidv4 } from "uuid";

import { Service } from 'egg';

import path = require("path");

import { StaticStr } from '../config/StaticStr';
import { DateFormat } from "../utils/DateFormat";
import { VerifyException } from '../utils/Exceptions';
import Cfg from '../entity/mongo/Cfg';
/**
 * Created by wh on 2020/7/15
 * author: wanghao
 * @desc：cfgService
 */
export default class CfgService extends Service {
    /**
       * 获取配置列表不分页
       */
    public async getCfgs() {
        const data: Array<Cfg> = await this.ctx.repo.mongodb.Cfg.find({ state: 1, isDelete: 0 });
        return data;
    }
    /**
     * 获取配置列表
    */
    public async cfgByCfgId(cfg: Cfg) {
        const data: Array<Cfg> = await this.ctx.repo.mongodb.Cfg.find({ cfgId: cfg.cfgId, isDelete: 0 });
        return data;
    }
    /**
     * 新增
     */
    public async createCfg(cfg: Cfg) {

        // 验证是否存在相同名称相同gameid
        const isData: Cfg = await this.ctx.repo.mongodb.Cfg.findOne({ gameId: cfg.gameId, type: cfg.type, cfgName: cfg.cfgName, isDelete: 0 });
        if (isData) {
            if (isData.cfgName === cfg.cfgName) {
                throw new VerifyException(StaticStr.INSERT_ERR_MSG, StaticStr.ERR_CODE_DEFAULT);
            }
        }
        cfg.id = uuidv4();
        cfg.createdTime = DateFormat.dateFormat(Date.now());
        cfg.cfgId = String(cfg.id);
        cfg.state = 1;
        const data: any = await this.ctx.repo.mongodb.Cfg.save(cfg);
        await this.saveFile(cfg)
        return data;
    }
    /**
     * 删除
     */
    public async delectCfg(cfg: Cfg) {
        cfg.updatedTime = DateFormat.dateFormat(Date.now());
        cfg.isDelete = 1;
        const data: any = await this.ctx.repo.mongodb.Cfg.update(String(cfg.id), cfg);

        return data;
    }
    /**
     * 修改
     */
    public async updateCfg(cfg: Cfg) {
        cfg.updatedTime = DateFormat.dateFormat(Date.now());
        // 拿到相同配置
        const cfgs: any = await this.ctx.repo.mongodb.Cfg.find({ cfgId: cfg.cfgId, isDelete: 0 });
        cfgs.forEach(async (element: Cfg) => {
            element.state = 0;
            await this.ctx.repo.mongodb.Cfg.update(String(element.id), element);
        });
        cfg.state = 1;
        cfg.createdTime = DateFormat.dateFormat(Date.now());
        const data: any = await this.ctx.repo.mongodb.Cfg.save(cfg);
        await this.saveFile(cfg)
        return data;
    }

    /**
     * 保存最新版配置文件到服务器
     * @param cfg 
     */
    public async saveFile(cfg: Cfg) {

        // 写入对应游戏的配置文件内

        let filePath = null
        let content = null
        // 判断配置文件类型
        if (cfg.type === 0) {
            // 服务器配置
            //把data对象转换为json格式字符串
            content = cfg.body;
            //指定创建目录及文件名称，__dirname为执行当前文件的目录
            filePath = path.resolve(__dirname, `../../public/servecfgFile/${cfg.gameId}/${cfg.cfgName}.json`);
        } else {
            // 客户端配置
            filePath = path.resolve(__dirname, `../../public/servecfgFile/${cfg.gameId}/${cfg.cfgName}.json`);

            // 判断是否压缩合并
            if (cfg.merge === 1) {
                // 是:拿到对应的gameid所有配置
                const data: Array<Cfg> = await this.ctx.repo.mongodb.Cfg.find({ state: 1, isDelete: 0, gameId: cfg.gameId });
                content = {}
                data.forEach(async (element: Cfg) => {
                    content[element.cfgName] = JSON.parse(element.body);
                });
                // 文件内容:{配置名称1:配置值1,配置名称2:配置值2}
                content = JSON.stringify(content)
                filePath = path.resolve(__dirname, `../../public/servecfgFile/${cfg.gameId}/all_cfgs.txt`);

            }
            // 判断是否加密
            if (cfg.encryption === 1) {
                // todo 和App端配合设置加密保存
            }
        }
        try {
            //写入文件
            fs.writeFile(filePath, content, function (err) {
                if (err) {
                    return console.log(err);
                }
                console.log(cfg.gameName + ':配置文件创建成功，地址：' + filePath);
            });

        } catch (error) {
            console.log('配置文件创建失败!' + error);

        }

    }
}
