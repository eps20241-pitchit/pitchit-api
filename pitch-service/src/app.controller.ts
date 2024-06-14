import { Controller, Get, Redirect } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AppService } from './app.service';

@ApiTags('Home')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/docs")
  @Redirect('https://pitchit-api.onrender.com/api/docs', 301)
  getHello() {
    return { url: 'https://pitchit-api.onrender.com/api/docs' };
  }
}
