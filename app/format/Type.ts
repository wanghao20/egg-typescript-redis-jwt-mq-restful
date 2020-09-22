/**
 * Created by wh on 2020/7/15
 * author: wanghao
 * @desc：类型定义
 */
/**
 *操作记录
 */
type TbLog = {
    /**
     * id
     */
    id?: string;
    /**
     * 操作用户id
     */
    userId?: string;
    /**
     * 操作用户
     */
    username?: string;
    /**
     * 操作时间
     */
    createdTime?: Date;
    /**
     * 操作类型:查询、新增、删除、更新
     */
    operationType?: string;
    /**
     * 操作模块
     */
    operationMod?: string;
    /**
     * 操作ip
     */
    ip?: string;
};
/**
 *请求处理返回类型
 */
type ResData = {
    /**
     * 状态码
     */
    code: number;
    /**
     * 对称加密key
     */
    // key: string; 
    /**
     * 消息提示
     */
    msg?: string;
    /**
     * 数据体
     */
    data?: any;
    /**
     * 错误体
     */
    err?: any;
};
/**
 * token配置类型
 */
type TokenConfig = {
    /**
     * 过期时间
     */
    exp: number;
    /**
     * 数据体
     */
    data: {};
};
/**
 *分页数据
 */
type Paging = {
    /**
     * 当前页面
     */
    page: number;
    /**
     * 分页大小
     */
    limit: number;
    /**
     * 过滤条件{}
     */
    condition: any;
};
/**
 *请求处理返回类型
 */
type fileType = {
    /**
     * 路径
     */
    path: string;
    /**
     * 类型
     */
    type?: string;
    /**
     * 大小
     */
    size?: number;
};
export { Paging, fileType, TbLog, ResData, TokenConfig };
