import { Test, TestingModule } from '@nestjs/testing';
import { OpenAIController } from './openai.controller';
import { OpenAIClientService } from './services/openai-client.service';
import { CompletionRequestDto } from './dto/completion-request.dto';
import { PitchRequestDto } from './dto/pitch-request.dto';
import { PitchOCTCRequestDto } from './dto/pitchoctc-request.dto';

describe('OpenAIController', () => {
  let controller: OpenAIController;
  let openAIClientService: OpenAIClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OpenAIController],
      providers: [
        {
          provide: OpenAIClientService,
          useValue: {
            getCompletion: jest.fn(),
            findUserPitches: jest.fn(),
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<OpenAIController>(OpenAIController);
    openAIClientService = module.get<OpenAIClientService>(OpenAIClientService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('O controller deve ser criado', () => {
    expect(controller).toBeDefined();
  });

  describe('createCompletion', () => {
    it('should return a completion response', async () => {
      const completionDto: CompletionRequestDto = {
        question: 'Questão exemplo',
        userId: '123',
      };
      const completionResponse = { text: 'Exemplo de texto' };

      (openAIClientService.getCompletion as jest.Mock).mockResolvedValue(completionResponse);

      const result = await controller.createCompletion(completionDto);

      expect(result).toEqual(completionResponse);
    });

    it('Deve tratar os erros', async () => {
      const completionDto: CompletionRequestDto = {
        question: 'Questão exemplo',
        userId: '123',
      };
      const errorMessage = 'Erro ao se comunicar com a OpenAI. Tente novamente.';

      (openAIClientService.getCompletion as jest.Mock).mockRejectedValue(new Error(errorMessage));

      const result = await controller.createCompletion(completionDto);

      expect(result).toEqual({ error: errorMessage });
    });
  });

  describe('createPitch', () => {
    it('Deve retornar um CompletionRespondeDto', async () => {
      const pitchDto: PitchRequestDto = {
        projectName: 'Projeto Exemplo',
        description: 'Descrição do projeto',
        userId: '123',
      };
      const completionResponse = { text: 'Exemplo de texto' };

      (openAIClientService.getCompletion as jest.Mock).mockResolvedValue(completionResponse);

      const result = await controller.createPitch(pitchDto);

      expect(result).toEqual(completionResponse);
    });

    it('should handle errors', async () => {
      const pitchDto: PitchRequestDto = {
        projectName: 'Projeto Exemplo',
        description: 'Descrição do projeto',
        userId: '123',
      };
      const errorMessage = 'Erro ao se comunicar com a OpenAI. Tente novamente.';

      (openAIClientService.getCompletion as jest.Mock).mockRejectedValue(new Error(errorMessage));

      const result = await controller.createPitch(pitchDto);
    });
  });

  it('Tratar erros da OpenAI service', async () => {
    const requestDto: PitchOCTCRequestDto = {
      userId: 'user123',
      nomeProjeto: 'Projeto Teste',
      intro: 'Introdução interessante',
      originalidade: 'Inovação única',
      diferencial: 'Vantagem competitiva',
      necessidade: 'Necessidade do mercado',
      problema: 'Problema a ser resolvido',
      publicoAlvo: 'Público-alvo específico',
      lacunaMercado: 'Lacuna identificada no mercado',
      competitividade: 'Comparação com concorrentes',
      comoFunciona: 'Funcionamento da solução',
      qtdPessoasProblema: 'Número de pessoas afetadas pelo problema',
      quemFaz: 'Equipe responsável pela solução',
      processo: 'Processo detalhado de implementação',
      economiaPublico: 'Economia gerada para o público-alvo',
      verificacaoNegocio: 'Validação externa das hipóteses',
      fornecedor: 'Parceiro ou fornecedor estratégico',
      apoiador: 'Apoiadores do projeto/solução',
      resultado: 'Resultados positivos esperados',
    };

    jest.spyOn(openAIClientService, 'getCompletion').mockRejectedValue(new Error('Erro na OpenAI'));

    const result = await controller.createPitchOCTC(requestDto);

    expect(result).toEqual({ error: 'Erro ao se comunicar com a OpenAI. Tente novamente.' });
  });

  describe('findUserPitches', () => {
    it('deve retornar lista de pitches de um usuário', async () => {
      const userId = '123';
      const userPitches = [{ id: '1', userId: '123', pitchText: 'Pitch 1' }, { id: '2', userId: '123', pitchText: 'Pitch 2' }];

      jest.spyOn(openAIClientService, 'findUserPitches').mockResolvedValue(userPitches);

      const result = await controller.findUserPitches(userId);

      expect(result).toEqual(userPitches);
    });

    it('deve retornar mensagem de usuário não encontrado', async () => {
      const userId = '123';

      jest.spyOn(openAIClientService, 'findUserPitches').mockResolvedValue([]);

      const result = await controller.findUserPitches(userId);

      expect(result).toEqual([]);
    });
  });

  describe('findAll', () => {
    it('deve retornar os pitches quando eles são encontrados', async () => {
      const pitches = [{ id: '1', userId: '123', pitchText: 'Pitch 1' }, { id: '2', userId: '123', pitchText: 'Pitch 2' }];

      jest.spyOn(openAIClientService, 'findAll').mockResolvedValue(pitches);

      const result = await controller.findAll();

      expect(result).toEqual(pitches);
    });

    it('deve retornar um array vazio quando nenhum pitch é encontrado', async () => {
      jest.spyOn(openAIClientService, 'findAll').mockResolvedValue([]);

      const result = await controller.findAll();

      expect(result).toEqual([]);
    });

    it('deve retornar o código de status 204 quando nenhum pitch é encontrado', async () => {
      jest.spyOn(openAIClientService, 'findAll').mockResolvedValue(null);

      const result = await controller.findAll();

      expect(result).toEqual(null);
    });
  });
});

