import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class OpenAIService {
  private openaiClient: OpenAI;

  constructor() {
    const baseURL = process.env.OPENAI_BASE_URL ?? 'https://api.openai.com/v1';
    const apiKey = process.env.OPENAI_API_KEY ?? 'key';
    const organization = null;
    const project = null;

    this.openaiClient = new OpenAI({baseURL, apiKey, organization, project});
  }

  getOpenAIClient(): OpenAI {
    return this.openaiClient;
  }
}