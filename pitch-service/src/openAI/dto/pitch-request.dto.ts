import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class PitchRequestDto {
  @ApiProperty({
    example: 'Sebrae',
    required: true
  })
  @IsNotEmpty()
  projectName: string;

  @ApiProperty({
    example: 'O Serviço Brasileiro de Apoio às Micro e Pequenas Empresas (Sebrae) é uma entidade privada que promove a competitividade e o desenvolvimento sustentável dos empreendimentos de micro pequenas empresas - aqueles com faturamento bruto anual de até R$ 4,8 milhões.',
    required: true
  })
  @IsNotEmpty()
  description: string;
}