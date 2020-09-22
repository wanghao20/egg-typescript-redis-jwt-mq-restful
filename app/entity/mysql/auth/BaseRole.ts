import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
import { BaseMod } from './BaseMod';

/**
 * Created by wh on 2020/7/15
 * author: wanghao
 * @desc：角色
 */
@Entity()
export class BaseRole   {

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
     * 角色名称
     */
    @Column()
    public roleName: string;
    /**
     * 权限对应的模块
     */
    @ManyToMany(() => BaseMod, (mod) => mod.roles)
    @JoinTable({
        "name": "mod_role",
        "joinColumn": { "name": "role_id" },
        "inverseJoinColumn": { "name": "mod_id" },
      })
    public mods: BaseMod[];

}
