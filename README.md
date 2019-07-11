<h1 align="center">NestJs Configuration Manager</h1>

<h3 align="center">Flexible, Docker-friendly, Dotenv-based Configuration Module for NestJs</h3>

<div align="center">
  <a href="https://github.com/johnbiundo/nestjs-config-manager/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-brightgreen.svg" alt="License" />
  </a>
  <a href="https://badge.fury.io/js/nestjs-config-manager">
    <img src="https://badge.fury.io/js/nestjs-config-manager.svg" alt="npm version" height="18">
  </a>
</div>


## Documentation

```typescript
DEFAULT_REDIS_OPTIONS = {
    // Connection
    port: 6379,
    host: 'localhost',
    family: 4,
    connectTimeout: 10000,
    retryStrategy: function (times) {
        return Math.min(times * 50, 2000);
    },
    keepAlive: 0,
    noDelay: true,
    connectionName: null,
    // Sentinel
    sentinels: null,
    name: null,
    role: 'master',
    sentinelRetryStrategy: function (times) {
        return Math.min(times * 10, 1000);
    },
    natMap: null,
    enableTLSForSentinelMode: false,
    updateSentinels: true,
    // Status
    password: null,
    db: 0,
    // Others
    dropBufferSupport: false,
    enableOfflineQueue: true,
    enableReadyCheck: true,
    autoResubscribe: true,
    autoResendUnfulfilledCommands: true,
    lazyConnect: false,
    keyPrefix: '',
    reconnectOnError: null,
    readOnly: false,
    stringNumbers: false,
    maxRetriesPerRequest: 20,
    maxLoadingRetryTime: 10000
};
```

## Change Log

See [Changelog](CHANGELOG.md) for more information.

## Contributing

Contributions welcome! See [Contributing](CONTRIBUTING.md).

## Author

* **John Biundo (Y Prospect on [Discord](https://discord.gg/G7Qnnhy))**

## License

Licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
