

import { Delete, Get, Post, Prefix, Put } from 'egg-router-util';

import { Controller } from 'egg';

import { Paging } from "../format/Type";
import { Validate } from "../utils/ReqValidate";
import { ReturnResult } from "../utils/ReturnResult";
import { BaseMod } from "../entity/mysql/auth/BaseMod";
import { BaseRole } from "../entity/mysql/auth/BaseRole";
import { BaseUser } from "../entity/mysql/auth/BaseUser";

/**
 * Created by wh on 2020/7/15
 * author: wanghao
 * @desc：登陆注册Controllers
 */
@Prefix('/auth')
export default class AuthController extends Controller {


    /**
     * 登录接口Controller
     * @param ctx koa中间件
     */
    @Post("/login")
    public async login() {
        const { ctx } = this;
        // 验证
        Validate.user(ctx.params.username, ctx.params.password);
        Validate.isFlexValid(ctx.params.captchaCode);
        Validate.isFlexValid(ctx.params.time);
        const obj = await this.service.accountService.verifyPassword(ctx.params.username, ctx.params.password, ctx.params.captchaCode, ctx.params.time);

        return ctx.body = ReturnResult.successData(obj);
    }
    /**
     * 获取用户详情信息
     * @param ctx koa中间件
     */
    @Post("/info")
    public async info() {
        const { ctx } = this;
        // 验证
        const user = await this.service.accountService.info(ctx.user.id);

        return ctx.body = ReturnResult.successData(user);
    }

    /**
     * 退出登录
     * @param ctx koa中间件
     */
    @Post("/logout")
    public async register() {
        const { ctx } = this;
        return ctx.body = ReturnResult.successData();
    }
    /**
     * 获取用户列表
     * @param ctx koa中间件
     */
    @Get("/user")
    public async users() {
        const { ctx } = this;
        await Validate.verifyAuth(ctx, "user");
        const paging: Paging = ctx.params;
        paging.condition = JSON.parse(paging.condition);
        const users = await this.service.accountService.users(paging);

        return ctx.body = ReturnResult.successData(users);
    }
    /**
     * 修改用户信息
     * @param ctx koa中间件
     */
    @Put("/user")
    public async update() {
        const { ctx } = this;
        await Validate.verifyAuth(ctx, "user");
        const user: BaseUser = ctx.params;
        user.updatedBy = ctx.user.id;
        Validate.user(user.name, user.password);
        const users = await this.service.accountService.update(user);

        return ctx.body = ReturnResult.successData(users);
    }
    /**
     * 创建用户信息
     * @param ctx koa中间件
     */
    @Post("/user")
    public async create() {
        const { ctx } = this;
        await Validate.verifyAuth(ctx, "user");
        const user: BaseUser = ctx.params;
        user.createdBy = ctx.user.id;
        Validate.user(user.name, user.password);
        Validate.isFlexValid(user.roles);
        Validate.isEmail(user.email);
        const users = await this.service.accountService.create(ctx, user);

        return ctx.body = ReturnResult.successData(users);
    }
    /**
     * 注册
     * @param ctx koa中间件
     */
    @Post("/insert")
    public async insert() {
        const { ctx } = this;
        const user: BaseUser = ctx.params;
        Validate.user(user.name, user.password);
        Validate.isEmail(user.email);
        const users = await this.service.accountService.insert(ctx, user);

        return ctx.body = ReturnResult.successData(users);
    }
    /**
     * 删除用户信息
     * @param ctx koa中间件
     */
    @Delete("/user")
    public async delect() {
        const { ctx } = this;
        await Validate.verifyAuth(ctx, "user");
        const user: BaseUser = ctx.params;
        Validate.isId(user.id);
        const data = await this.service.accountService.delect(user);

        return ctx.body = ReturnResult.successData(data);
    }
    /**
     * 获取验证码图片
     * @param ctx koa中间件
     */
    @Get("/captchaCode")
    public async captchaCode() {
        const { ctx } = this;
        Validate.isFlexValid(ctx.params.time);
        const data = await this.service.accountService.captchaCode(ctx.params.time);
        ctx.type = "html";
        // 设置响应头
        ctx.response.type = "image/svg+xml";

        return ctx.body = data;

    }
    /**
     * 验证Email验证码
     * @param ctx koa中间件
     */
    @Post("/validEmailCode")
    public async validEmailCode() {
        const { ctx } = this;
        Validate.isEmail(ctx.params.email);
        Validate.isFlexValid(ctx.params.code);
        Validate.isFlexValid(ctx.params.password);
        const data = await this.service.accountService.validEmailCode(ctx);

        return ctx.body = ReturnResult.successData(data);

    }
    /**
     * 获取Email验证码
     * @param ctx koa中间件
     */
    @Get("/GetEmailCode")
    public async GetEmailCode() {
        const { ctx } = this;
        Validate.isEmail(ctx.params.email);
        await this.service.accountService.getEmailCode(ctx);

        return ctx.body = ReturnResult.successData();

    }
    /**
     * 创建模块
     * @param ctx koa中间件
     */
    @Post("/Mod")
    public async createMod() {
        const { ctx } = this;
        await Validate.verifyAuth(ctx, "Mod");
        const mod: BaseMod = ctx.params;
        mod.createdBy = ctx.user.id;
        Validate.isId(mod.pId);
        Validate.isFlexValid(mod.pName);
        Validate.isFlexValid(mod.component);
        Validate.isFlexValid(mod.label);
        Validate.isFlexValid(mod.modPath);
        Validate.isFlexValid(mod.modtTitle);
        const data = await this.service.accountService.createMod(mod);

        return ctx.body = ReturnResult.successData(data);

    }
    /**
    * 修改模块信息
    * @param ctx koa中间件
    */
    @Put("/Mod")
    public async updateMod() {
        const { ctx } = this;
        await Validate.verifyAuth(ctx, "Mod");
        const mod: BaseMod = ctx.params;
        mod.updatedBy = ctx.user.id;
        const users = await this.service.accountService.updateMod(mod);

        return ctx.body = ReturnResult.successData(users);
    }
    /**
     * 查询模块
     * @param ctx koa中间件
     */
    @Get("/Mod")
    public async GetMod() {
        const { ctx } = this;
        await Validate.verifyAuth(ctx, "Mod");
        const data = await this.service.accountService.getMod();

        return ctx.body = ReturnResult.successData(data);

    }
    /**
     * 查询模块
     * @param ctx koa中间件
     */
    @Delete("/Mod")
    public async deleteMod() {
        const { ctx } = this;
        await Validate.verifyAuth(ctx, "Mod");
        const mod: BaseMod = ctx.params;
        Validate.isId(mod.id);
        const data = await this.service.accountService.deleteMod(mod);

        return ctx.body = ReturnResult.successData(data);

    }
    /**
     * 获取角色列表
     * @param ctx koa中间件
     */
    @Get("/role")
    public async roles() {
        const { ctx } = this;
        await Validate.verifyAuth(ctx, "role");
        const users = await this.service.accountService.roles();

        return ctx.body = ReturnResult.successData(users);
    }
    /**
     * 获取角色页面
     * @param ctx koa中间件
     */
    @Get("/rolePage")
    public async rolesPage() {
        const { ctx } = this;
        await Validate.verifyAuth(ctx, "role");
        const paging: Paging = ctx.params;
        paging.condition = JSON.parse(paging.condition);
        const users = await this.service.accountService.rolesPage(paging);

        return ctx.body = ReturnResult.successData(users);
    }
    /**
     * 创建角色列表
     * @param ctx koa中间件
     */
    @Post("/role")
    public async createRole() {
        const { ctx } = this;
        await Validate.verifyAuth(ctx, "role");
        const role: BaseRole = ctx.params;
        role.createdBy = ctx.user.id;
        const users = await this.service.accountService.createRole(role);

        return ctx.body = ReturnResult.successData(users);
    }
    /**
     * 删除角色列表
     * @param ctx koa中间件
     */
    @Delete("/role")
    public async delectRole() {
        const { ctx } = this;
        await Validate.verifyAuth(ctx, "role");
        const role: BaseRole = ctx.params;
        const users = await this.service.accountService.delectRole(role);

        return ctx.body = ReturnResult.successData(users);
    }
    /**
     * 修改角色列表
     * @param ctx koa中间件
     */
    @Put("/role")
    public async updateRole() {
        const { ctx } = this;
        await Validate.verifyAuth(ctx, "role");
        const role: BaseRole = ctx.params;
        role.updatedBy = ctx.user.id;
        const users = await this.service.accountService.updateRole(role);

        return ctx.body = ReturnResult.successData(users);
    }
    /**
     * 获取角色详情模块列表
     * @param ctx koa中间件
     */
    @Get("/roleMods")
    public async roleMods() {
        const { ctx } = this;
        await Validate.verifyAuth(ctx, "role");
        const role: BaseRole = ctx.params;
        Validate.isId(role.id);
        const users = await this.service.accountService.roleMods(role);

        return ctx.body = ReturnResult.successData(users);
    }
    /**
     * 获取系统操作日志
     * @param ctx koa中间件
     */
    @Get("/systemLog")
    public async systemLog() {
        const { ctx } = this;
        const paging: Paging = ctx.params;
        Validate.isNumber(paging.page);
        paging.condition = JSON.parse(paging.condition);
        const users = await this.service.accountService.systemLog(paging);

        return ctx.body = ReturnResult.successData(users);
    }
}
