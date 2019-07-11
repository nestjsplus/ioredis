import { RedisOptions } from './redis-options.interface';

export interface RedisOptionsFactory {
  createRedisOptions(): Promise<RedisOptions> | RedisOptions;
}
