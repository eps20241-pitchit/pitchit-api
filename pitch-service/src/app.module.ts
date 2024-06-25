import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenAIModule } from './openAI/openai.module';
import { RedirectMiddleware } from './middlewares/redirect.middleware';

@Module({
  imports: [ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    OpenAIModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RedirectMiddleware)
      .forRoutes('*');
  }
}