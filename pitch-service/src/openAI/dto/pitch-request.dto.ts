import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class PitchRequestDto {
  @ApiProperty({
    example: 1,
    required: true
  })
  @IsNotEmpty({message: "userId não pode ser vazio."})
  userId: string;
  
  @ApiProperty({
    example: 'Sebrae',
    required: true
  })
  @IsNotEmpty({message: "projectName não pode ser vazio."})
  projectName: string;

  @ApiProperty({
    example: 'O Serviço Brasileiro de Apoio às Micro e Pequenas Empresas (Sebrae) é uma entidade privada que promove a competitividade e o desenvolvimento sustentável dos empreendimentos de micro pequenas empresas - aqueles com faturamento bruto anual de até R$ 4,8 milhões.',
    required: true
  })
  @IsNotEmpty({message: "description não pode ser vazio."})
  description: string;
}