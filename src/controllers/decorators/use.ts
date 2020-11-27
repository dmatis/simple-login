import 'reflect-metadata';
import { RequestHandler } from 'express';
import { MetadataKeys } from './MetadataKeys';

export function use(middleware: RequestHandler) {
  return function(target: any, key: string, desc: PropertyDescriptor) {
    // Get existing list of assigned middlewares for this method (or [] if none yet assigned)
    const middlewares = Reflect.getMetadata(MetadataKeys.middleware, target, key) || [];

    Reflect.defineMetadata(MetadataKeys.middleware, [...middlewares, middleware], target, key);
  }
}