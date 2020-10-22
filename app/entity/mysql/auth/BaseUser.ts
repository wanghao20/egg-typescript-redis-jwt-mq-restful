import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";


/**
 * Created by wh on 2020/8/31
 * author: wanghao
 * @desc：用户
 */
@Entity()
export default class BaseUser {

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
     * 对应角色
     */
    @Column()
    public roles: string;
    /**
     * 用户名
     */
    @Column()
    public name: string;
    /**
     * 密码
     */
    @Column()
    public password: string;
    /**
     * 邮箱
     */
    @Column()
    public email: string;
    /**
     * 头像
     */
    @Column()
    public avatar: string;
    /**
     * 权限名称
     */
    @Column()
    public rolesName: string;
}
