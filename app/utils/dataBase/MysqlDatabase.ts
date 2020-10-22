import { getConnection } from "typeorm";


/**
 * Created by wh on 2020/7/15
 * author: wanghao
 * @desc： 连接数据库函数
 */
export class MysqlDatabase {
	/**
	 * 获取数据库连接
	 */
    public static connection() {
        return getConnection("mysql");
        // return getConnection();
    }
    // todo 自定义的方法使用redis分布式锁或者在数据库中开启事务
    // todo typeorm中增删改都自动添加了事务机制

	/**
	 *执行SQL命令(需要自己添加事务)
	 */
    public static executeSql(sqlCommand: string, parameters?: any) {
        return this.connection().query(sqlCommand, parameters);
    }
	/**
	 *执行存储过程(需要自己添加事务)
	 */
    public static async executeProc(sqlCommand: string, parameters?: any) {
        const data = await this.connection().query(sqlCommand, parameters);

        return data;
    }
}