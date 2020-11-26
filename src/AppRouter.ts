import express from 'express';

export class AppRouter {
  private static instance: express.Router;

  /**
 * @description Provides a Singleton instance of express.Router
 */
  static getInstance(): express.Router {
    if (!AppRouter.instance) {
      AppRouter.instance = express.Router();
    }

    return AppRouter.instance
  }
}