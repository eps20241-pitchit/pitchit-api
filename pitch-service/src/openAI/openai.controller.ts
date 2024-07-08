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
        nomeProjeto,
        intro,
        originalidade,
        diferencial,
        necessidade,
        problema,
        publicoAlvo,
        lacunaMercado,
        competitividade,
        comoFunciona,
        qtdPessoasProblema,
        quemFaz,
        processo,
        economiaPublico,
        verificacaoNegocio,
        fornecedor,
        apoiador,
        resultado } = body;

      const prompt = `Como um CEO bem-sucedido da empresa/projeto ${nomeProjeto}, desejo criar um pitch convincente de aproximadamente três minutos para destacar os pontos fortes da nossa empresa. 
      O pitch deve primeiro fazer uma introdução com a introdução escolhida: ${intro}. 
      Após a introdução gerar um gancho para a parte de Conceituar a solução do projeto, com as perguntas sobre o que é e como funciona abaixo, finalizando com um gancho para a contextualização(Essa parte deve ter aproximadamente 1 minuto e meio):
        - O que diferencia o nosso projeto/produto e o torna único? ${originalidade}.
        - Quais são as capacidades exclusivas que o nosso projeto possui e que o diferencia dos outros? ${diferencial}.
        - Qual a maior necessidade que a nossa organização/produto atende? ${necessidade}.
        - Que problema a nossa solução resolve? ${problema}.
        - Quem são os principais beneficiários dessa solução? Qual é o seu público-alvo? ${publicoAlvo}.
        - Qual(is) é(são) a(s) lacuna(s) no mercado que a nossa solução preenche? ${lacunaMercado}.
        - O que torna a nossa concorrência inferior? ${competitividade}.
        - O que permite a nossa solução funcionar? Como ela funciona? ${comoFunciona}.
        - Quantas pessoas tem esse problema? Existe alguma pesquisa relacionado a isso? Quais são os dados? ${qtdPessoasProblema}.
        - Quem realmente executa o serviço? ${quemFaz}.
        - Existe um processo que deve ser seguido com precisão? ${processo}.
        - Quanto o nosso público poderá economizar com a nossa solução?${economiaPublico}.
      
      Depois o pitch deve Contextualizar o projeto com as seguintes perguntas, finalizando com um ganho para efetivação(Essa parte deve ter aproximadamente 1 minuto):
        - Existe alguma pesquisa feita por terceiros que já verificou as nossas alegações e hipóteses? ${verificacaoNegocio}.
        - Com qual parceiro ou fornecedor estamos trabalhando para entregar isso? ${fornecedor}.
        - Existem apoiadores inesperados do nosso projeto/solução? ${apoiador}.

      Por fim, deve Efetivar a proposta com as perguntas, finalizando de forma a engajar o ouvinte(Essa parte deve ter aproximadamente 30 segundos):
        - Quais foram os resultados positivos que o motivaram a realizar esse projeto? ${resultado}.
      As perguntas devem ser colocadas no pitch de maneira fluida, sem parecer que está respondendo as perguntas sequencialmente, apenas respeitando as três etapas: Conceituar, Contextualizar e Efetivar.`;

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
