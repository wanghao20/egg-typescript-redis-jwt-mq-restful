// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAuthController from '../../../app/controller/AuthController';
import ExportFileController from '../../../app/controller/FileController';
import ExportGameController from '../../../app/controller/GameController';

declare module 'egg' {
  interface IController {
    authController: ExportAuthController;
    fileController: ExportFileController;
    gameController: ExportGameController;
  }
}
