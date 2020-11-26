import 'reflect-metadata';
import express from 'express';

export const router = express.Router();

export function controller(routePrefix: string) {
  return function(target: Function) {
    // iterate through all the methods in the class to determine if they contain middleware
    // if so, extract the path (route) property and associate it with a router
    for (let key in target.prototype) {
      const routeHandler = target.prototype[key];
      const path = Reflect.getMetadata('path', target.prototype, key);

      if (path) {
        router.get(`${routePrefix}${path}`, routeHandler)
      }
    }
  }
}