import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
/**
 * Created by wh on 2020/9/14
 * author: wanghao
 * @desc：封号数据实体
 */
@Entity()
export default class BaseSeal {


    /**
     * id
     */
    @PrimaryGeneratedColumn()
    public id: string;

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
     * gameId
     */
    @Column()
    public gameId: string;
    /**
     * openid
     */
    @Column()
    public openId: string;
    /**
     * userId
     */
    @Column()
    public userId: string;
    /**
     * 玩家名称
     */
    @Column()
    public userName: string;
    /**
     * 封号原因
     */
    @Column()
    public reason: string;
    /**
     * 是否封号
     */
    @Column()
    public isSeal: string;

}
