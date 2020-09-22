import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
/**
 * Created by wh on 2020/7/15
 * author: wanghao
 * @desc：操作记录
 */
@Entity()
export class BaseTpLog {
    /**
     * id
     */
    @PrimaryGeneratedColumn()
    public id?: string;
    /**
     * 操作用户id
     */
    @Column()
    public userId: string;
    /**
     * 操作用户name
     */
    @Column()
    public username: string;
    /**
     * 操作时间
     */
    @Column()
    public createdTime: string;
    /**
     * 查询、新增、删除、更新
     */
    @Column()
    public operationType: string;
    /**
     * 操作ip地址
     */
    @Column()
    public ip: string;
    /**
     * 操作模块
     */
    @Column()
    public operationMod: string;
}
