// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportAccountService from '../../../app/service/AccountService';
import ExportBullMqService from '../../../app/service/BullMqService';
import ExportFileService from '../../../app/service/FileService';
import ExportGameService from '../../../app/service/GameService';

declare module 'egg' {
  interface IService {
    accountService: AutoInstanceType<typeof ExportAccountService>;
    bullMqService: AutoInstanceType<typeof ExportBullMqService>;
    fileService: AutoInstanceType<typeof ExportFileService>;
    gameService: AutoInstanceType<typeof ExportGameService>;
  }
}
