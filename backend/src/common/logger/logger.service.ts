/* eslint-disable @typescript-eslint/no-explicit-any */
import { ConsoleLogger, Inject, Injectable, Scope } from '@nestjs/common';
import { createLogger, LoggerOptions, Logger as WinstonLogger } from 'winston';
import { LogLevel } from './logLevel';
import { NESTJS_WINSTON_CONFIG_OPTIONS } from './logger.constant';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService extends ConsoleLogger {
  private logger: WinstonLogger;

  constructor(@Inject(NESTJS_WINSTON_CONFIG_OPTIONS) config: LoggerOptions) {
    super();
    this.logger = createLogger(config);
  }

  setContext(callerName: string): void {
    this.logger.defaultMeta = {
      ...this.logger.defaultMeta,
      callerName,
    };
  }

  appendDefaultMeta(key: string, value: string): void {
    this.logger.defaultMeta = {
      ...this.logger.defaultMeta,
      [key]: value,
    };
  }

  log(message: string, params?: any): void {
    if (typeof params === 'string') {
      this.setContext(params);
    }
    this.logger.info(message, params);
  }

  error(message: string, trace: string, params?: any): void {
    if (typeof params === 'string') {
      this.setContext(params);
    }
    this.logger.error(message, { trace, params });
  }

  warn(message: string, params?: any): void {
    if (typeof params === 'string') {
      this.setContext(params);
    }
    this.logger.warn(message, params);
  }

  debug(message: string, params?: any): void {
    if (typeof params === 'string') {
      this.setContext(params);
    }
    this.logger.http(message, params);
  }

  http(message: string, params?: any): void {
    if (typeof params === 'string') {
      this.setContext(params);
    }
    this.logger.http(message, params);
  }

  silly(message: string, params?: any): void {
    if (typeof params === 'string') {
      this.setContext(params);
    }
    this.logger.silly(message, params);
  }

  verbose(message: string, params?: any): void {
    if (typeof params === 'string') {
      this.setContext(params);
    }
    this.logger.verbose(message, params);
  }

  logAny(level: LogLevel, message: string, ...args: any): void {
    switch (level) {
      case LogLevel.Error:
        this.logger.error(message, args);
        break;
      case LogLevel.Warning:
        this.logger.warn(message, args);
        break;
      case LogLevel.Information:
        this.logger.info(message, args);
        break;
      case LogLevel.Http:
        this.logger.http(message, args);
        break;
      case LogLevel.Verbose:
        this.logger.verbose(message, args);
        break;
      case LogLevel.Debug:
        this.logger.debug(message, args);
        break;
      case LogLevel.Silly:
        this.logger.silly(message, args);
        break;
      default:
        throw new Error('Method not implemented.');
    }
  }
}
