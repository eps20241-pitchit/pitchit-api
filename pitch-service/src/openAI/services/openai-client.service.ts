import { Injectable } from '@nestjs/common';
import { OpenAIService } from './openai.service';
import { PrismaService } from '../../database/prisma.service';
import { CompletionResponseDto } from '../dto/completion-response.dto';

@Injectable()
export class OpenAIClientService {
  constructor(private readonly openAIService: OpenAIService, private readonly prismaService: PrismaService) {}

  async getCompletion(prompt: string, userId: string): Promise<CompletionResponseDto> {
    const openai = this.openAIService.getOpenAIClient();
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: prompt }],
      model: "gpt-3.5-turbo",
    });

    const completionText = await this.prismaService.pitch.create({
      data: {
        userId: userId,
        pitchText: completion.choices[0].message.content.trim()
      }
    })

    return completionText;
  }

  async findAll() {
    return await this.prismaService.pitch.findMany();
  }

  async findUserPitches(userId: string) {
    return await this.prismaService.pitch.findMany({
      where: { userId }
    });
  }
}