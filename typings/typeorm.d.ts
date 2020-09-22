import 'egg'
import { Repository, Connection } from 'typeorm'
import BaseMod from '../app/entity/mysql/auth/BaseMod'
import BaseRole from '../app/entity/mysql/auth/BaseRole'
import BaseUser from '../app/entity/mysql/auth/BaseUser'
import Game from '../app/entity/mysql/game/Game'
import BaseTpLog from '../app/entity/mysql/log/BaseTpLog'
import CleLog from '../app/entity/mysql/log/CleLog'
import Seal from '../app/entity/mysql/system/Seal'

declare module 'egg' {
  interface Context {
    connection: Connection
    entity: {
      BaseMod: any
      BaseRole: any
      BaseUser: any
      Game: any
      BaseTpLog: any
      CleLog: any
      Seal: any
    }
    repo: {
      BaseMod: Repository<BaseMod>
      BaseRole: Repository<BaseRole>
      BaseUser: Repository<BaseUser>
      Game: Repository<Game>
      BaseTpLog: Repository<BaseTpLog>
      CleLog: Repository<CleLog>
      Seal: Repository<Seal>
    }
  }
}
