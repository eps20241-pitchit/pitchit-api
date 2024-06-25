import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

var options = {
  customSiteTitle: "Pitch Service",
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  
  const config = new DocumentBuilder()
  .setTitle('Pitch Service')
  .setDescription('É uma API que usa Chat GPT para gerar pitches de apresentação.')
  .setVersion('1.0')
  .addServer('http://localhost:3000/', 'Local environment')
  .addServer('https://pitchit-api.onrender.com/', 'Production environment')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, options);

  await app.listen(3000);
}
bootstrap();
