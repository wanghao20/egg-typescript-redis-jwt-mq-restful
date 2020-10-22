import { v4 as uuidv4 } from "uuid";

import jwt = require("jsonwebtoken");

import crypto = require("crypto");

import nodemailer = require("nodemailer");

import svgCaptcha = require("svg-captcha");

import { Context, Service } from 'egg';

import { BaseConfig } from "../config/Base";
import { JWT_SECRET, JWT_EXP, svgCaptchaCfg, emailCfg, sendMailCfg, SECRET_KEY } from "../config/Constants";
import { KeyName } from "../config/RedisKeys";
import { StaticStr } from "../config/StaticStr";
import { TokenConfig, Paging } from "../format/Type";
import { DateFormat } from "../utils/DateFormat";
import { VerifyException } from "../utils/Exceptions";
import { MysqlDatabase } from '../utils/dataBase/MysqlDatabase';
import  BaseRole  from "../entity/mysql/auth/BaseRole";
import  BaseUser  from "../entity/mysql/auth/BaseUser";
import BaseMod from '../entity/mysql/auth/BaseMod';
/**
 * Created by wh on 2020/7/15
 * author: wanghao
 * @desc：authService
 */
export default class AccountService extends Service {

    /**
     * 获取token
     */
    private getToken(user: BaseUser) {
        const tconfig: TokenConfig = {
            "exp": Math.floor(Date.now() / 1000) + JWT_EXP,
            "data": { "id": user.id, "roles": user.roles, "name": user.name },
        };

        return jwt.sign(tconfig, JWT_SECRET);
    }
    /**
     * 加密密码
     */
    private genPassword(password: string) {
        const md5 = crypto.createHash("md5");
        const str = `password=${password}&key=${SECRET_KEY}`; // 拼接方式是自定的，只要包含密匙即可

        return md5.update(str).digest("hex"); // 把输出编程16进制的格式
    }
    /**
     * 登录验证接口Service
     * @param userName 用户名
     * @param passWord 密码
     */
    public async verifyPassword(userName: string, passWord: string, captchaCode: string, time: string) {
        // 验证码
        const redis = this.app.redis.get("db1");
        const val = await redis.get(KeyName.STR_SVGCAPTCHA_TIME + time);
        // 设置为过期
        redis.expire(KeyName.STR_SVGCAPTCHA_TIME + time, 1);
        if (captchaCode !== val) {
            throw new VerifyException(StaticStr.ERR_CAPTCHA_CODE, StaticStr.ERR_CODE_DEFAULT);
        }
        const user = await this.ctx.repo.mysql.auth.BaseUser.findOne({ "name": userName, "isDelete": 0 });
        if (user === undefined) {
            throw new VerifyException(StaticStr.USERNAME_ERR_MSG, StaticStr.ERR_CODE_DEFAULT);
        }
        if (user.name !== userName) {
            throw new VerifyException(StaticStr.USERNAME_ERR_MSG, StaticStr.ERR_CODE_DEFAULT);
        }
        if (user.password !== this.genPassword(passWord)) {
            throw new VerifyException(StaticStr.USERNAME_ERR_MSG, StaticStr.ERR_CODE_DEFAULT);
        }

        const token = this.getToken(user);

        return { "accessToken": token, "id": user.id };
    }
    /**
     * 获取用户信息
     * @param name 用户名称
     */
    public async info(id: string) {
        const user: BaseUser = await this.ctx.repo.mysql.auth.BaseUser.findOne({ "id": id, "isDelete": 0 });
        const role: BaseRole = await this.ctx.repo.mysql.auth.BaseRole.findOne({ "id": user.roles, "isDelete": 0 }, { "relations": ["mods"] });
        // 拿到对应权限mods信息

        return { "user": user, "mods": role.mods };
    }
    /**
     * 获取权限和后台管理用户列表
     */
    public async users(paging: Paging) {
        const data = await MysqlDatabase.executeProc(
            `call proc_users(${paging.page},${paging.limit},"${paging.condition.name}","${paging.condition.roles}")`);

        // 解析存储过程数据
        return { "items": data[0], "total": Number(data[1][0].total) };
    }
    /**
     * 获取系统操作日志
     */
    public async systemLog(paging: Paging) {
        const data = await MysqlDatabase.executeProc(
            `call proc_system_log(${paging.page},${paging.limit},
                "${paging.condition.name}",
                "${paging.condition.type}",
                "${paging.condition.Mod}")`);

        // 解析存储过程数据
        return { "items": data[0], "total": Number(data[1][0].total) };
    }
    /**
     * 获取角色列表
     */
    public async roles() {
        const data: any = await this.ctx.repo.mysql.auth.BaseRole.find({ "isDelete": 0 });

        return data;
    }
    /**
     * create角色列表
     */
    public async createRole(role: BaseRole) {
        role.id = uuidv4();
        // 设置默认根模块权限
        const mods: any = await this.ctx.repo.mysql.auth.BaseMod.find({ "isDelete": 0 });
        const mod = this.findRootId(mods);
        role.mods.push(mod);
        const data: any = await this.ctx.repo.mysql.auth.BaseRole.save(role);

        return data;
    }
    /**
 * 找到根节点id
 * @param event
 */
    private findRootId(mods: Array<BaseMod>): BaseMod {
        for (let i = 0; i < mods.length; i++) {
            if (
                mods[i].pId === "undefined" ||
                mods[i].pId === undefined ||
                mods[i].pId === null ||
                mods[i].pId === ""
            ) {
                return mods[i];
            }
        }
        return new BaseMod;
    }
    /**
     * create角色列表
     */
    public async updateRole(role: BaseRole) {
        const data: any = await this.ctx.repo.mysql.auth.BaseRole.save(role);

        return data;
    }
    /**
     * 删除角色列表
     */
    public async delectRole(role: BaseRole) {
        role.isDelete = 1;
        const data: any = await this.ctx.repo.mysql.auth.BaseRole.save(role);

        return data;
    }
    /**
     * 获取角色详情
     */
    public async roleMods(role: BaseRole) {
        const data: any = await this.ctx.repo.mysql.auth.BaseRole.findOne({ "id": role.id, "isDelete": 0 }, { "relations": ["mods"] });

        return data;
    }
    /**
     * 获取角色分页
     */
    public async rolesPage(paging: Paging) {
        const data = await MysqlDatabase.executeProc(
            `call proc_roles(${paging.page},${paging.limit},"${paging.condition.name}")`);

        // 解析存储过程数据
        return { "items": data[0], "total": Number(data[1][0].total) };
    }
    /**
     * 修改用户
     * @param user User
     */
    public async update(user: BaseUser) {
        // 验证用户名
        const userVname = await this.ctx.repo.mysql.auth.BaseUser.findOne({ "name": user.name, "isDelete": 0 });
        if (userVname.name !== user.name) {
            throw new VerifyException(StaticStr.INSERT_ERR_MSG, StaticStr.ERR_CODE_DEFAULT);
        }
        user.updatedTime = DateFormat.dateFormat(Date.now());
        user.password = this.genPassword(user.password);
        const data: any = await this.ctx.repo.mysql.auth.BaseUser.save(user);

        return data;
    }
    /**
     * 创建用户
     * @param user User
     */
    public async create(ctx: Context, user: BaseUser) {
        // 验证用户名
        const userVname = await this.ctx.repo.mysql.auth.BaseUser.findOne({ "name": user.name, "isDelete": 0 });
        if (userVname) {
            throw new VerifyException(StaticStr.INSERT_ERR_MSG, StaticStr.ERR_CODE_DEFAULT);
        }
        const uid = uuidv4();
        const role: BaseRole = await ctx.repo.mysql.auth.BaseRole.findOne({ "id": user.roles });
        user.createdTime = DateFormat.dateFormat(Date.now());
        user.rolesName = role.roleName;
        user.id = uid;
        user.password = this.genPassword(user.password);
        const data: any = await this.ctx.repo.mysql.auth.BaseUser.save(user);

        return data;
    }
    /**
     * 删除用户
     * @param user User
     */
    public async delect(user: BaseUser) {
        user.createdTime = DateFormat.dateFormat(Date.now());
        user.isDelete = 1;
        const data: any = await this.ctx.repo.mysql.auth.BaseUser.save(user);

        return data;
    }
    /**
     * 获取验证码图片
     */
    public async captchaCode(time: string) {
        const redis = this.app.redis.get("db1");
        const cap = svgCaptcha.create(svgCaptchaCfg);
        const img = cap.data; // 验证码
        const text = cap.text.toLowerCase(); // 验证码字符，忽略大小写
        await redis.set(KeyName.STR_SVGCAPTCHA_TIME + time, text);
        // 一分钟过期
        await redis.expire(KeyName.STR_SVGCAPTCHA_TIME + time, 6000);

        return img;
    }
    /**
     * 验证Email验证码
     * @param email email地址
     * @param code 发出的code
     * @param password 新密码
     */
    public async validEmailCode(ctx: Context) {
        const redis = this.app.redis.get("db1");
        // 验证邮箱是否存在
        const user: BaseUser = await ctx.repo.mysql.auth.BaseUser.findOne({ "email": ctx.params.email, "isDelete": 0 });
        if (user === undefined) {
            throw new VerifyException(StaticStr.ERR_EMAILCO_CODE, StaticStr.ERR_CODE_DEFAULT);
        }
        // 验证code是否正确
        const codeVali = await redis.get(KeyName.STR_EMAIL_CODE + user.id,);
        await ctx.expire(KeyName.STR_EMAIL_CODE + user.id, 1);

        if (codeVali !== ctx.params.code) {
            throw new VerifyException(StaticStr.ERR_CAPTCHA_CODE, StaticStr.ERR_CODE_DEFAULT);
        }
        user.password = this.genPassword(ctx.params.password);
        user.createdTime = DateFormat.dateFormat(Date.now());
        // 保存到数据库
        await ctx.repo.mysql.auth.BaseUser.save(user);
        const token = this.getToken(user);

        return { "accessToken": token, "id": user.id };
    }
    /**
     * 获取Email验证码
     * @param email email地址
     */
    public async getEmailCode(ctx: Context) {
        const redis = this.app.redis.get("db1");
        // 验证邮箱是否存在
        const user: BaseUser = await ctx.repo.mysql.auth.BaseUser.findOne({ "email": ctx.params.email, "isDelete": 0 });
        if (user === undefined) {
            throw new VerifyException(StaticStr.ERR_EMAILCO2_CODE, StaticStr.ERR_CODE_DEFAULT);
        }
        const code = Math.random().toString().slice(-6);
        // 发送到邮箱
        // create reusable transporter object using the default SMTP transport
        const transporter = nodemailer.createTransport(emailCfg);
        await transporter.sendMail(sendMailCfg(ctx.params.email, code));
        // 保存到redis
        await redis.set(KeyName.STR_EMAIL_CODE + user.id, code);
        // 一分钟过期
        await redis.expire(KeyName.STR_EMAIL_CODE + user.id, 6000);
    }

    /**
     * 注册用户接口Service
     * @param userName 用户名
     * @param passWord 密码
     */
    public async insert(ctx: Context, user: BaseUser) {
        // 验证用户名
        const userVname = await ctx.repo.mysql.auth.BaseUser.findOne({ "name": user.name, "isDelete": 0 });
        if (userVname) {
            throw new VerifyException(StaticStr.INSERT_ERR_MSG, StaticStr.ERR_CODE_DEFAULT);
        }
        // 验证邮箱是否使用
        const user1: BaseUser = await ctx.repo.mysql.auth.BaseUser.findOne({ "email": user.email, "isDelete": 0 });
        if (user1) {
            throw new VerifyException(StaticStr.ERR_EMAILCO_CODE, StaticStr.ERR_CODE_DEFAULT);
        }
        const uid = uuidv4();
        user.roles = BaseConfig.GHOST_DEFAULT_ROLE_ID;
        user.rolesName = BaseConfig.GHOST_DEFAULT_ROLE_NAME;
        user.id = uid;
        user.createdTime = DateFormat.dateFormat(Date.now());
        user.password = this.genPassword(user.password);
        // 保存到数据库
        await ctx.repo.mysql.auth.BaseUser.save(user);
        const token = this.getToken(user);

        return { "accessToken": token, "id": uid };
    }

    /**
     * 创建模块
     * @param mod Mod
     */
    public async createMod(mod: BaseMod) {
        const uid = uuidv4();
        mod.id = uid;
        mod.createdTime = Date.now().toString();
        const data: any = await this.ctx.repo.mysql.auth.BaseMod.save(mod);

        return data;
    }
    /**
     * 修改模块
     * @param mod Mod
     */
    public async updateMod(mod: BaseMod) {
        mod.updatedTime = Date.now().toString();
        const data: any = await this.ctx.repo.mysql.auth.BaseMod.save(mod);

        return data;
    }
    /**
     * 查询模块
     */
    public async getMod() {
        const data: any = await this.ctx.repo.mysql.auth.BaseMod.find({ "isDelete": 0 });

        return data;
    }
    /**
     * 删除模块
     */
    public async deleteMod(mod: BaseMod) {
        const data: any = await this.ctx.repo.mysql.auth.BaseMod.delete(mod);

        return data;
    }
}
