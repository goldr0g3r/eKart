import { registerAs } from '@nestjs/config';
import { IsInt, IsNotEmpty, Max, Min, validateSync } from 'class-validator';
import { ConfigToken } from './constant/environment';
import { Expose, plainToClass } from 'class-transformer';

export class Environment {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(65535)
  @Expose({
    name: 'PORT',
  })
  PORT: number;

  @IsNotEmpty()
  @Expose({
    name: 'DATABASE_URL',
  })
  @IsNotEmpty()
  database_url: string;
}

export const registerConfig = registerAs(ConfigToken, (): Environment => {
  const envClass = plainToClass(Environment, process.env, {
    enableImplicitConversion: true,
    excludeExtraneousValues: true,
    exposeDefaultValues: true,
    exposeUnsetFields: true,
  });
  const errors = validateSync(envClass, {
    skipMissingProperties: false,
    whitelist: true,
  });

  console.log('Environment Variables:', process.env.PORT);
  if (errors.length > 0) {
    throw new Error(`Configuration validation failed: ${errors}`);
  }

  return envClass;
});
