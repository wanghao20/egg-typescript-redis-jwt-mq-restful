import { Entity, ManyToMany, Column, PrimaryGeneratedColumn } from "typeorm";

import { BaseRole } from "./BaseRole";

/**
 * Created by wh on 2020/3/3
 * @desc：模块实体
 */
@Entity()
export class BaseMod {

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
     * 父节点id
     */
    @Column()
    public pId: string;
    /**
     * 父节点名称
     */
    @Column()
    public pName: string;
    /**
     * 模块名称
     */
    @Column()
    public label: string;
    /**
     * 模块路由地址
     */
    @Column()
    public modPath: string;
    /**
     * 模块标题
     */
    @Column()
    public modtTitle: string;
    /**
     * vueComponent对应地址
     */
    @Column()
    public component: string;
    /**
     * icon
     */
    @Column()
    public icon: string;

    /**
     * 是否禁止操作,0否1:是
     */
    @Column()
    public disabled: number;

    /**
     * 多对多
     */
    @ManyToMany(() => BaseRole, (role) => role.mods)
    public roles: BaseRole[];

}
