# dfs-ums-server


## 前序准备

你需要在本地安装 [node](http://nodejs.org/) 和 [egg-reids](https://github.com/eggjs/egg-redis)在Base.ts内配置redis连接。本项目技术栈基于 [typescript](https://www.typescriptlang.org/)、[限流](https://github.com/koajs/ratelimit)、[BullMQ](https://github.com/OptimalBits/bull#uis)、[HyperLogLog](https://juejin.im/post/6844904097666039816) 、[redis分布式锁](https://redis.io/) 、[Joi](https://hapi.dev/module/joi/)(egg-Joi配置相对繁琐,项目是自己封装的) 和 [egg-typeorm](https://github.com/eggjs/egg-redis),[自动路由扫描:egg-router-util]

## 目录结构

本项目已经为你生成了一个完整的开发框架，提供了后台开发的各类功能和坑位，下面是整个项目的目录结构。

```bash
├── logs                       # 日志
├── app                        # 源代码
│   ├── config                 # 项目配置类
│   ├── controller             # 请求控制类
│   ├── entity                 # 实体类定义
│   ├── format                 # 格式化项目的一些定义文件
│   ├── middleware             # 中间件配置
│   ├── service                # 全局布局
│   ├── utils                  # 工具类
│   ├── routes.ts              # 路由文件
├── config                    # 项目配置文件夹
├── .babelrc                  # 运行时编译
├── .ormconfig                #  orm 配置
├── app.ts                    # 项目生命周期文件
├── typings                   # 项目自动类型匹配
├── public                    # 静态文件
├── tsconfig                  # 配置文件
├── package.json              # package.json 依赖
```

## 如何设置以及启动项目

### 安装依赖

```bash
$ npm i
$ yarn
```

### 启动本地开发环境

```bash
$ npm run dev
$ yarn dev
$ open http://127.0.0.1:9090/
```
  
### Deploy

```bash
$ npm run tsc
$ npm start
```

egg-ts-typeorm 连接mongo在connect.js内修改源码
for(let e of n){
    if(e.options.type=="mysql"){
        const o=await e.manager.query("select 1 + 1 as result");
        o&&o.length&&2==+o[0].result&&t.logger.info(`[egg-typeorm] connection ${e.name} is ready`)
    }
    if(e.options.type=="mongodb"){
        t.logger.info(`[egg-typeorm] connection ${e.name} is ready`)
    }

}};