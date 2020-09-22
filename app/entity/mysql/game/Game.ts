import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

/**
 * Created by wh on 2020/9/4
 * author: wanghao
 * @desc：游戏实体
 */
@Entity()
export class BaseGame {

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
     * lcon
     */
    @Column()
    public icon: string;
    /**
     * 产品名称
     */
    @Column()
    public gameName: string;
    /**
     * 描述
     */
    @Column()
    public doc: string;
    /**
     * appid
     */
    @Column()
    public appid: string;
    /**
     * Ftp路径(游戏路径)
     */
    @Column()
    public gamePath: string;
    /**
     * 游戏配置
     */
    @Column()
    public config: string;
    /**
     * 游戏版本
     */
    @Column()
    public version: string;
    /**
     * 当前状态
     */
    @Column()
    public status: number;
    /**
     * 公司团队
     */
    @Column()
    public team: string;
    /**
     * 人员安排
     */
    @Column()
    public staffGear: string;

}
