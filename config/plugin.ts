import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
    // static: true,
    jwt: {
        enable: true,
        package: "egg-jwt"
    },
    cors: {
        enable: true,
        package: 'egg-cors',
    },
    redis: {
        enable: true,
        package: 'egg-redis',
    },
    typeorm: {
        enable: true,
        package: 'egg-ts-typeorm',
    }
};

export default plugin;
