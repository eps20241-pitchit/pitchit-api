import { Module } from '@nestjs/common';

import { OpenAIService } from './services/openai.service';
import { OpenAIClientService } from './services/openai-client.service';
import { OpenAIController } from './openai.controller';

@Module({
  providers: [OpenAIService, OpenAIClientService],
  controllers: [OpenAIController],
})
export class OpenAIModule {}
