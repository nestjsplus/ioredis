import { Injectable, Inject, OnApplicationShutdown } from '@nestjs/common';
import * as Redis from 'ioredis';
import { REDIS_CONFIG_OPTS } from './constants';

@Injectable()
export class RedisService implements OnApplicationShutdown {
  public _redisClient;

  constructor(@Inject(REDIS_CONFIG_OPTS) private redisOptions) {
    this._redisClient = new Redis(this.redisOptions);
  }

  get client() {
    return this._redisClient;
  }

  onApplicationShutdown(signal: string) {
    this._redisClient.disconnect();
    console.log('Redis Service disconnected');
  }
}
