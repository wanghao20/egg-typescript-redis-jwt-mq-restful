// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import { Repository, Connection, TreeRepository } from 'typeorm';
import AppEntityMysqlauthBaseMod from '../app/entity/mysql/auth/BaseMod';
import AppEntityMysqlauthBaseRole from '../app/entity/mysql/auth/BaseRole';
import AppEntityMysqlauthBaseUser from '../app/entity/mysql/auth/BaseUser';
import AppEntityMysqlgameBaseGame from '../app/entity/mysql/game/BaseGame';
import AppEntityMysqllogBaseTpLog from '../app/entity/mysql/log/BaseTpLog';
import AppEntityMysqllogCleLog from '../app/entity/mysql/log/CleLog';
import AppEntityMysqlsystemSeal from '../app/entity/mysql/system/Seal';
import AppEntityMongoCfg from '../app/entity/mongo/Cfg';
declare module 'egg' {
  interface Context {
    entity: {
      mysql: {
        auth: {
          BaseMod: typeof AppEntityMysqlauthBaseMod
          BaseRole: typeof AppEntityMysqlauthBaseRole
          BaseUser: typeof AppEntityMysqlauthBaseUser
        }
        game: {
          BaseGame: typeof AppEntityMysqlgameBaseGame
        }
        log: {
          BaseTpLog: typeof AppEntityMysqllogBaseTpLog
          CleLog: typeof AppEntityMysqllogCleLog
        }
        system: {
          Seal: typeof AppEntityMysqlsystemSeal
        }
      }
      mongodb: {
        Cfg: typeof AppEntityMongoCfg
      }
    }
    repo: {
      mysql: {
        auth: {
          BaseMod: Repository<AppEntityMysqlauthBaseMod>
          BaseRole: Repository<AppEntityMysqlauthBaseRole>
          BaseUser: Repository<AppEntityMysqlauthBaseUser>
        }
        game: {
          BaseGame: Repository<AppEntityMysqlgameBaseGame>
        }
        log: {
          BaseTpLog: Repository<AppEntityMysqllogBaseTpLog>
          CleLog: Repository<AppEntityMysqllogCleLog>
        }
        system: {
          Seal: Repository<AppEntityMysqlsystemSeal>
        }
      }
      mongodb: {
        Cfg: Repository<AppEntityMongoCfg>
      }
    }
  }
}