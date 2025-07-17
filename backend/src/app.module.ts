import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaClient } from 'generated/prisma';
import { PrismaModule } from './prisma/prisma.module';
import { registerConfig } from './config';
import { LoggerModule } from './common/logger/logger.module';
import GetWinstonConfig from './common/logger/winstonConfig';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [registerConfig],
    }),
    LoggerModule.forRoot(GetWinstonConfig()),
    PrismaModule,
    AuthModule,
    UserModule,
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
