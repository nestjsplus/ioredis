import { Module, DynamicModule, Global, Provider } from '@nestjs/common';
import { RedisService } from './redis.service';
import { REDIS_CONFIG_OPTS } from './constants';
import {
  RedisModuleOptions,
  RedisModuleAsyncOptions,
  RedisOptionsFactory,
} from './interfaces';

@Global()
@Module({
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {
  static register(options: RedisModuleOptions): DynamicModule {
    return {
      module: RedisModule,
      providers: [
        {
          provide: REDIS_CONFIG_OPTS,
          useValue: options,
        },
      ],
    };
  }

  static registerAsync(options: RedisModuleAsyncOptions): DynamicModule {
    return {
      module: RedisModule,
      imports: options.imports || [],
      providers: this.createAsyncProviders(options),
    };
  }

  private static createAsyncProviders(
    options: RedisModuleAsyncOptions,
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(
    options: RedisModuleAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: REDIS_CONFIG_OPTS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    return {
      name: REDIS_CONFIG_OPTS,
      provide: REDIS_CONFIG_OPTS,
      useFactory: async (optionsFactory: RedisOptionsFactory) => {
        return optionsFactory.createRedisOptions();
      },
      inject: [options.useExisting || options.useClass],
    };
  }
}
