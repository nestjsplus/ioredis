import { Injectable, Inject } from '@nestjs/common';
import * as Redis from 'ioredis';
import { REDIS_CONFIG_OPTS } from './constants';

@Injectable()
export class RedisService {
  public redisClient;

  constructor(@Inject(REDIS_CONFIG_OPTS) private redisOptions) {
    this.redisClient = new Redis(this.redisOptions);
  }
}
