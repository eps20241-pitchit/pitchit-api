import { Body, Controller, Post } from '@nestjs/common';
import { log } from 'console';

import { OpenAIService } from './openai.service';

@Controller('openai')
export class OpenAIController {
  constructor(private readonly OpenAIService: OpenAIService) {}

  @Post('completion')
  async getCompletion(@Body() body: any) {
    try {
      const openai = this.OpenAIService.getOpenAIClient();
      const { question } = body;

      const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: question }],
        model: "gpt-3.5-turbo",
      });

      return { completion: completion.choices[0].message.content.trim() };
    } catch (error) {
      log('Erro ao enviar request para a OpenAI:', error);

      return { error: "Erro ao se comunicar a Open AI. Tente novamente." };
    }
  }
}
