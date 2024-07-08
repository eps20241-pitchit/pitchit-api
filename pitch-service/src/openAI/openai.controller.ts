import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { OpenAIClientService } from './services/openai-client.service';
import { CompletionRequestDto } from './dto/completion-request.dto';
import { CompletionResponseDto } from './dto/completion-response.dto';
import { PitchRequestDto } from './dto/pitch-request.dto';
import { PitchOCTCRequestDto } from './dto/pitchoctc-request.dto';

@ApiTags('Pitch')
@Controller('pitch')
export class OpenAIController {
  constructor(private readonly openAIClientService: OpenAIClientService)  {}

  @Post('completion')
  @ApiOperation({ summary: 'Fazer uma pergunta.' })
  @ApiResponse({ status: 201, description: 'Resposta gerada com sucesso.'})
  @ApiBody({
     type: CompletionRequestDto,
     description: 'Estrutura Json para uma requisitar uma completion.',
  })
  async createCompletion(@Body() body: CompletionRequestDto): Promise<CompletionResponseDto> {
    try {
      const { question, userId } = body;

      return await this.openAIClientService.getCompletion(question, userId);
    } catch (error) {
      return { error: "Erro ao se comunicar com a OpenAI. Tente novamente." };
    }
  }

  @Post('create')
  @ApiOperation({ summary: 'Criar pitch corporativo simples' })
  @ApiResponse({ status: 201, description: 'Pitch gerado e salvo com sucesso.'})
  @ApiBody({
     type: PitchRequestDto,
     description: 'Estrutura Json para uma requisitar um pitch corporativo simples.',
  })
  async createPitch(@Body() body: PitchRequestDto): Promise<CompletionResponseDto> {
    try {
      const { projectName, description, userId } = body;

      const prompt = `Como um CEO bem-sucedido da empresa/projeto ${projectName}, desejo criar um pitch impactante em português, com cerca de 5 minutos, para destacar os pontos fortes da nossa organização. A empresa possui é descrita da seguinte forma: ${description}.  O objetivo é cativar a audiência com uma introdução que se encaixe melhor com nossa descrição, seja através de uma história impactante, pergunta provocativa, dados surpreendentes, citação relevante ou demonstração do problema. O pitch seguirá uma estrutura clara: vamos conceituar o que é nossa organização/produto e como funciona, contextualizar com detalhes que engajem a audiência e finalizar com uma chamada à ação efetiva, incentivando ação como compra, investimento ou parceria.`;

      return await this.openAIClientService.getCompletion(prompt,  userId);
    } catch (error) {
      return { error: "Erro ao se comunicar com a OpenAI. Tente novamente." };
    }
  }

  @Post('octc')
  @ApiOperation({ summary: 'Criar um pitch padrão OCTC' })
  @ApiResponse({ status: 201, description: 'Pitch gerado e salvo com sucesso.'})
  @ApiBody({
     type: PitchOCTCRequestDto,
     description: 'Estrutura Json para uma requisitar um pitch OCTC.',
  })
  async createPitchOCTC(@Body() body: PitchOCTCRequestDto): Promise<CompletionResponseDto> {
    try {
      const {
        userId,
        projectName,
        intro,
        uniqueness,
        differentiability,
        needness,
        problem,
        targetMarket,
        gapMarket,
        competitiveness,
        howWork,
        howManyPeople,
        whoDoes,
        process,
        savings,
        businessVerification,
        whatIsUsed,
        supporters,
        results } = body;

      const prompt = `Como um CEO bem-sucedido da empresa/projeto ${projectName}, desejo criar um pitch convincente de aproximadamente três minutos para destacar os pontos fortes da nossa empresa. 
      O pitch deve primeiro fazer uma introdução com a introdução escolhida: ${intro}. 
      Após a introdução gerar um gancho para a parte de Conceituar a solução do projeto, com as perguntas sobre o que é e como funciona abaixo, finalizando com um gancho para a contextualização(Essa parte deve ter aproximadamente 1 minuto e meio):
        - O que torna único? ${uniqueness}
        - O que você pode fazer que os outros não podem? ${differentiability}
        - Qual a maior necessidade que isso atende? ${needness}
        - Que problema isso resolve? ${problem}
        - Quem é mais beneficiado com isso? ${targetMarket}
        - Que lacuna no mercado isso preenche? ${gapMarket}
        - O que torna sua concorrência inferior? ${competitiveness}
        - O que lhe permite sua oferta funcionar? ${howWork}
        - Quantas pessoas tem esse problema? ${howManyPeople}
        - Quem realmente executa o serviço? ${whoDoes}
        - Existe um processo que deve ser seguido com precisão? ${process}
        - Quanto dinheiro o comprador poderá economizar? ${savings}
      
      Depois o pitch deve Contextualizar o projeto com as seguintes perguntas, finalizando com um ganho para efetivação(Essa parte deve ter aproximadamente 1 minuto):
        - Um terceiro já verificou suas alegações? ${businessVerification}
        - Quem você está usando para entregar isso? ${whatIsUsed}
        - Você tem apoiadores inesperados? ${supporters}

      Por fim, deve Efetivar a proposta com as perguntas, finalizando de forma a engajar o ouvinte(Essa parte deve ter aproximadamente 30 segundos):
        - Que bons resultados o levaram a fazer esse trabalho? ${results}.
      As perguntas devem ser colocadas no pitch de maneira fluida, sem parecer que está respondendo as perguntas sequencialmente, apenas respeitando as três etapas: Conceituas, Contextualizar e Efetivar.`;

      return await this.openAIClientService.getCompletion(prompt, userId);
    } catch (error) {
      return { error: "Erro ao se comunicar com a OpenAI. Tente novamente." };
    }
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Buscar todos os pitches para um usuário' })
  @ApiParam({
    name: 'userId',
    type: String,
    description: 'ID do usuário para buscar os pitches',
    required: true,
    example: '123',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de pitches retornada com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado.',
  })
  findUserPitches(@Param('userId') userId: string) {
    return this.openAIClientService.findUserPitches(userId);
  }

  @Get()
  @ApiOperation({ summary: 'Buscar todos os pitches' })
  @ApiResponse({
    status: 200,
    description: 'Lista de pitches retornada com sucesso.',
  })
  @ApiResponse({
    status: 204,
    description: 'Nenhum pitch encontrado.',
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno no servidor.',
  })
  findAll() {
    return this.openAIClientService.findAll();
  }
}
