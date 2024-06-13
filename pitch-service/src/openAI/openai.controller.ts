import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

import { OpenAIClientService } from './services/openai-client.service';
import { CompletionRequestDto } from './dto/completion-request.dto';
import { CompletionResponseDto } from './dto/completion-response.dto';
import { PitchRequestDto } from './dto/pitch-request.dto';

@ApiTags('Pitch')
@Controller('pitch')
export class OpenAIController {
  constructor(private readonly openAIClientService: OpenAIClientService)  {}

  @Post('completion')
  @ApiResponse({ status: 201, description: 'Resposta gerada com sucesso.'})
  @ApiBody({
     type: CompletionRequestDto,
     description: 'Estrutura Json para uma requisitar uma completion.',
  })
  async createCompletion(@Body() body: CompletionRequestDto): Promise<CompletionResponseDto> {
    try {
      const { question } = body;
      const completion = await this.openAIClientService.getCompletion(question);

      return { completion };
    } catch (error) {
      return { error: "Erro ao se comunicar com a OpenAI. Tente novamente." };
    }
  }

  @Post('create')
  @ApiResponse({ status: 201, description: 'Pitch gerado e salvo com sucesso.'})
  @ApiBody({
     type: PitchRequestDto,
     description: 'Estrutura Json para uma requisitar uma completion.',
  })
  async createPitch(@Body() body: PitchRequestDto): Promise<CompletionResponseDto> {
    try {
      const { projectName, description } = body;
      const prompt = `Como um CEO bem-sucedido da empresa/projeto ${projectName}, desejo criar um pitch convincente de aproximadamente três minutos para destacar os pontos fortes da nossa empresa. A empresa possui a seguinte descrição: ${description}. O pitch deve cativar a audiência desde o início, transmitindo nossa visão de forma clara e envolvente.`;
      const completion = await this.openAIClientService.getCompletion(prompt);
      
      return { completion };
    } catch (error) {
      return { error: "Erro ao se comunicar com a OpenAI. Tente novamente." };
    }
  }
}
