import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

import { BaseConfig } from '../app/config/Base';
import { JWT_SECRET } from '../app/config/Constants';
import { mysqlConfig } from '../app/config/environments';
export default (appInfo: EggAppInfo) => {
    const config = {} as PowerPartial<EggAppConfig>;
    //从框架/插件覆盖配置
    //用于cookie签名密钥，应更改为您自己的并保持安全性
    config.keys = appInfo.name + '_1600410990715_3869';

    // 中间件middleware下对应文件名
    config.middleware = ['baseMiddleware'];
    // 设置jwt密钥
    config.jwt = {
        secret: JWT_SECRET,
    };
    config.security = {
        csrf: {
            enable: false,
            ignoreJSON: true
        },
        domainWhiteList: BaseConfig.OPEN_URL,//允许访问接口的白名单
    };
    // 跨域
    config.cors = {
        origin: '*',
        allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
    };
    // 端口
    config.cluster = {
        listen: {
            path: '',
            port: BaseConfig.PORT,
            hostname: BaseConfig.REDIS_HOST,
        }
    };
    // redis
    config.redis = {
        clients: {
            db1: {
                port: BaseConfig.REDIS_PORT,          // Redis port
                host: BaseConfig.REDIS_HOST,   // Redis host
                password: BaseConfig.REDIS_PASSWORD,
                db: BaseConfig.SYSTEM_DB, // 数据库
            },
            db2: {
                port: BaseConfig.REDIS_PORT,          // Redis port
                host: BaseConfig.REDIS_HOST,   // Redis host
                password: BaseConfig.REDIS_PASSWORD,
                db: BaseConfig.BULLMQ_DB, // 数据库
            },
        }

    };
    config.typeorm = mysqlConfig;
    // 返回配置将合并到EggAppConfig
    return {
        ...config,
    };
};
