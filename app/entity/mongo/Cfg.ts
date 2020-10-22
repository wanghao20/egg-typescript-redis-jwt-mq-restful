import { Entity, Column, ObjectID, ObjectIdColumn } from "typeorm";

/**
 * Created by wh on 2020/94
 * author: wanghao
 * @desc：游戏配置
 */
@Entity()
export default class Cfg {

    /**
     * id
     */
    @ObjectIdColumn()
    public id: ObjectID;

    /**
     * createdTime
     */
    @Column()
    public createdTime: string;

    /**
     *创建人
     */
    @Column()
    public createdBy: string;

    /**
     *修改时间
     */
    @Column()
    public updatedTime: string;

    /**
     *修改id
     */
    @Column()
    public updatedBy: string;
    /**
     * 是否删除,0:否1:是
     */
    @Column()
    public isDelete: number;
    /**
     * 游戏gameId
     */
    public gameId: string;;

    /**
     * 配置名称
     */
    @Column()
    public cfgName: string;;
    /**
     * 描述
     */
    @Column()
    public doc: string;;
    /**
     * 版本号
     */
    @Column()
    public version: string;;
    /**
     * 配置类型:0服务器配置,1客户端配置
     */
    @Column()
    public type: number;
    /**
     * 配置唯一id,新增时创建,更新版本时复用,用于区分配置
     */
    @Column()
    public cfgId: string;;
    /**
     * 配置状态,0未启用,1启用,cfgId相同的配置中只能存在一个state=1
     */
    @Column()
    public state: number;
    /**
     * 配置内容(json格式)
     */
    @Column()
    public body: string;
    /**
     * 游戏name
     */
    @Column()
    public gameName: string;
    /**
   * 是否加密,0未加密,1加密
   */
    @Column()
    public encryption: number = 0;
    /**
   * 是否合并相同游戏配置,0否,1是,合并压缩
   */
    @Column()
    public merge: number = 0;
}
