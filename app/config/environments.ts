import { ConnectionOptions} from "typeorm";
/**
 * Created by wh on 2020/7/15
 * author: wanghao
 * @desc：数据库配置文件(utils>database文件内切换程序数据库)
 */
export const mysqlConfig: ConnectionOptions = {
    "name": "mysql",
    "type": "mysql",
    "host": "148.70.34.67",
    "port": 3307,
    "username": "root",
    "password": "123456",
    "database": "test",
    logging: false,
    // synchronize: true,
    "timezone": "+08:00",
    "dateStrings": true,
    "entities": ["app/entity/mysql/*/*.ts"],
};
export const mongodbConfig: ConnectionOptions = {
    "name": "mongodb",
    "type": "mongodb",
    "host": "148.70.34.67",
    "port": 27017,
    "database": "test",
    "entities": ["app/entity/mongo/*.ts"],

};