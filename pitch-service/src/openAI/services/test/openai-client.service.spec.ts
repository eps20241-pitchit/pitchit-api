import { OpenAIClientService } from '../openai-client.service';
import { OpenAIService } from '../openai.service';
import { PrismaService } from '../../../database/prisma.service'

jest.mock('../openai.service'); 

describe('OpenAIClientService', () => {
  let openAiservice = new OpenAIService;
  let prismaService = new PrismaService;
  let serviceClient: OpenAIClientService = new OpenAIClientService(openAiservice, prismaService);
  
  it('should be defined', () => {
    expect(serviceClient).toBeDefined();
  });
});
