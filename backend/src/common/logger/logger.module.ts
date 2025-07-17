import { DynamicModule, FactoryProvider, Global, Module } from '@nestjs/common';
import { LoggerOptions } from 'winston';
import { NESTJS_WINSTON_CONFIG_OPTIONS } from './logger.constant';
import { getLoggerContexts, getLoggerToken } from './logger.decorator';
import { LoggerService } from './logger.service';

@Global()
@Module({})
export class LoggerModule {
  static forRoot(options: LoggerOptions): DynamicModule {
    const contexts = getLoggerContexts();

    const loggerProviders: FactoryProvider<LoggerService>[] = contexts.map(
      (context) => {
        return {
          provide: getLoggerToken(context),
          useFactory: (): LoggerService => {
            const logger = new LoggerService(options);
            logger.setContext(context);
            return logger;
          },
        };
      },
    );

    return {
      module: LoggerModule,
      providers: [
        {
          provide: NESTJS_WINSTON_CONFIG_OPTIONS,
          useValue: options,
        },
        LoggerService,
        ...loggerProviders,
      ],
      exports: [
        LoggerService,
        ...contexts.map((context) => getLoggerToken(context)),
      ],
    };
  }
}
