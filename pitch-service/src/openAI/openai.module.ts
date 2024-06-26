import { Module } from '@nestjs/common';

import { OpenAIService } from './services/openai.service';
import { OpenAIClientService } from './services/openai-client.service';
import { OpenAIController } from './openai.controller';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  providers: [OpenAIService, OpenAIClientService, PrismaService],
  controllers: [OpenAIController],
})
export class OpenAIModule {}
