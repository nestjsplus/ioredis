import { Module, DynamicModule, Global, Provider } from '@nestjs/common';
import { RedisService } from './redis.service';
import { REDIS_CONFIG_OPTS } from './constants';
import { RedisAsyncOptions, RedisOptionsFactory } from './interfaces';

@Global()
@Module({})
export class RedisModule {
  public static forRoot(options): DynamicModule {
    return {
      module: RedisModule,
      providers: [
        {
          name: REDIS_CONFIG_OPTS,
          provide: REDIS_CONFIG_OPTS,
          useValue: options,
        },
        RedisService,
      ],
      exports: [REDIS_CONFIG_OPTS, RedisService],
    };
  }

  public static forRootAsync(options: RedisAsyncOptions): DynamicModule {
    // const providers: Provider[] = this.createAsyncProviders(options);

    return {
      module: RedisModule,
      providers: [
        {
          name: REDIS_CONFIG_OPTS,
          provide: REDIS_CONFIG_OPTS,
          useFactory: async (optionsFactory: RedisOptionsFactory) => {
            return optionsFactory.createRedisOptions();
          },
          inject: [options.useExisting || options.useClass],
        },
        RedisService,
      ],
      imports: options.imports,
      exports: [REDIS_CONFIG_OPTS, RedisService],
    };
  }

  private static createAsyncProviders(options: RedisAsyncOptions): Provider[] {
    const providers: Provider[] = [this.createAsyncOptionsProvider(options)];

    if (options.useClass) {
      providers.push({
        provide: options.useClass,
        useClass: options.useClass,
      });
    }

    return providers;
  }

  private static createAsyncOptionsProvider(
    options: RedisAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        name: REDIS_CONFIG_OPTS,
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
