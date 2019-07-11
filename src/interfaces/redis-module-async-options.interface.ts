/** Dependencies **/
import { ModuleMetadata, Type } from '@nestjs/common/interfaces';

/** Interfaces **/
import { RedisModuleOptions } from './redis-module-options.interface';
import { RedisOptionsFactory } from './redis-options-factory.interface';

export interface RedisModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useClass?: Type<RedisOptionsFactory>;
  useExisting?: Type<RedisOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<RedisModuleOptions> | RedisModuleOptions;
}
