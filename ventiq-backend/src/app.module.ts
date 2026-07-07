import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from './config/config.module';
import { ConfigService } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { IdeasModule } from './modules/ideas/ideas.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { BullModule } from '@nestjs/bullmq';
import { EvaluationModule } from './modules/evaluation/evaluation.module';
import { InterestModule } from './modules/interest/interest.module';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('database.url'),
      }),
      inject: [ConfigService],
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        connection: {
          host: configService.get<string>('redis.host'),
          port: configService.get<number>('redis.port'),
        },
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    IdeasModule,
    EvaluationModule,
    InterestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
