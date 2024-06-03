import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenAIModule } from './openAI/openai.module';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true,
  }),
  OpenAIModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
