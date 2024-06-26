import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';


export class CompletionRequestDto {
  @ApiProperty({
    example: 1,
    required: true
  })
  @IsNotEmpty({message: "userId não pode ser vazio."})
  userId: number;
  
  @ApiProperty({
    example: 'Como fazer um pitch?',
    required: true
  })
  @IsNotEmpty()
  question: string;
}
