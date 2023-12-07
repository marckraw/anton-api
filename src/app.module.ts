import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UtilPublicModule } from './util-public/util-public.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerMiddleware } from './utils/logger.middleware';
import { PictureModule } from './picture/picture.module';
import { MessagesModule } from './messages/messages.module';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { readFileSync } from 'fs';
import { AiModule } from './ai/ai.module';
import { AuthTokenGuard } from './guards/auth-token.guard';
import { LeonardoAiModule } from './leonardo-ai/leonardo-ai.module';
import { DataHarvestModule } from './data-harvest/data-harvest.module';
import { ConversationModule } from './conversation/conversation.module';
import { Conversation } from './conversation/conversation.entity';
import { Message } from './conversation/message.entity';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env${
        process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ''
      }`,
      isGlobal: true,
    }), // helps with getting envs into the project, also have ConfigService Globally available
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get<string>('POSTGRES_HOST'),
          port: Number(configService.get<string>('POSTGRES_PORT')),
          username: configService.get<string>('POSTGRES_USER'),
          password: configService.get<string>('POSTGRES_PASSWORD'),
          database: configService.get<string>('POSTGRES_DB'),
          // ssl: {
          //   rejectUnauthorized: true,
          //   ca: readFileSync(
          //     __dirname + '/../../' + 'ca-certificate.crt',
          //   ).toString(),
          // },
          synchronize: true,
          autoLoadEntities: true,
          entities: [User, Conversation, Message],
        };
      },
    }),
    UtilPublicModule,
    PictureModule,
    MessagesModule,
    UserModule,
    AiModule,
    LeonardoAiModule,
    DataHarvestModule,
    ConversationModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthTokenGuard],
  exports: [AuthTokenGuard],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
