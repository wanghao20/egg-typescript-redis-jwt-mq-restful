import Bull = require("bull");

import { bullConfig, QUEUE_USER_ACTIVE, QUEUE_OBJ_NAME } from "../config/BullConfig";
import { bullMqService } from '../service/BullMqService';

/**
 * Created by wh on 2020/9/21
 * author: wanghao
 * @desc：消息队列工具类
 * 文档:https://github.com/OptimalBits/bull#uis
 */
export class BullMQ {
    /**
     * Queue对象
     */
    public myFirstQueue: Bull.Queue<any>;

    constructor() {
        this.init();
        try {
            this.process();
        } catch (error) {
            console.log("任务处理出错");
        }
    }

    /**
     * 初始化
     */
    public async init() {
        this.myFirstQueue = new Bull(QUEUE_OBJ_NAME, bullConfig);
        this.myFirstQueue = new Bull(QUEUE_USER_ACTIVE, bullConfig);
    }

    /**
     * 拿到队列队形
     */
    public async getQueue() {
        return this.myFirstQueue;
    }

    /**
     * 绑定任务处理函数
     */
    public process() {
        // 2. 绑定任务处理函数
        this.myFirstQueue.process(QUEUE_OBJ_NAME, async (job, data) => {
            console.log("队列:" + QUEUE_OBJ_NAME + ":任务开始处理");
            // 执行保存对象操作
            await bullMqService.objImpl(job);
            data();
        });
        this.myFirstQueue.process(QUEUE_USER_ACTIVE, async (job, data) => {
            console.log("队列:" + QUEUE_USER_ACTIVE + ":任务开始处理");
            // 执行保存对象操作
            await bullMqService.activeImpl(job);
            data();
        });
    }


}
