import { OpenAIService } from '../openai.service';

describe('OpenAIService', () => {
  let service: OpenAIService = new OpenAIService();

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return OpenAI client', () => {
    const openaiClient = service.getOpenAIClient();
    expect(openaiClient).toBe(service.getOpenAIClient());
  });
});
