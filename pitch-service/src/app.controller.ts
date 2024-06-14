import { Controller, Get, Redirect } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AppService } from './app.service';

@ApiTags('Home')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/docs")
  @Redirect('http://localhost:3000/api/docs', 301)
  getHello() {
    return { url: 'http://localhost:3000/api/docs' };
  }
}
