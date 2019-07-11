import { RedisModuleOptions } from './redis-module-options.interface';

export interface RedisOptionsFactory {
  createRedisOptions(): Promise<RedisModuleOptions> | RedisModuleOptions;
}
