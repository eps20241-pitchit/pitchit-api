import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';


export class CompletionRequestDto {
  @ApiProperty({
    example: 'Como fazer um pitch?',
    required: true
  })
  @IsNotEmpty()
  question: string;
}
