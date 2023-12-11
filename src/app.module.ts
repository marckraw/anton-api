import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UtilPublicModule } from './util-public/util-public.module';
import { LoggerMiddleware } from './utils/logger.middleware';
import { MessagesModule } from './messages/messages.module';
import { UserModule } from './user/user.module';
import { AiModule } from './ai/ai.module';
import { AuthTokenGuard } from './guards/auth-token.guard';
import { LeonardoAiModule } from './leonardo-ai/leonardo-ai.module';
import { DataHarvestModule } from './data-harvest/data-harvest.module';
import { ConversationModule } from './conversation/conversation.module';
import { DatabaseModule } from './database/database.module';
import { WebhooksModule } from './webhooks/webhooks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env${
        process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ''
      }`,
      isGlobal: true,
    }), // helps with getting envs into the project, also have ConfigService Globally available
    UtilPublicModule,
    MessagesModule,
    UserModule,
    AiModule,
    LeonardoAiModule,
    DataHarvestModule,
    ConversationModule,
    DatabaseModule,
    WebhooksModule,
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
