// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBaseMiddleware from '../../../app/middleware/baseMiddleware';

declare module 'egg' {
  interface IMiddleware {
    baseMiddleware: typeof ExportBaseMiddleware;
  }
}
