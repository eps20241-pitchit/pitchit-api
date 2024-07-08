import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class PitchOCTCRequestDto {
  @ApiProperty({
    example: 1,
    required: true
  })
  @IsNotEmpty({message: "userId não pode ser vazio."})
  userId: string;

  @ApiProperty({
    example: 'Innovatech Solutions',
    required: true
  })
  @IsNotEmpty({message: "projectName não pode ser vazio."})
  nomeProjeto: string;

  @ApiProperty({
    example: 'Comece com uma pergunta intrigante ou provocativa, uma estatística impactante, um problema ou desafio comum ou uma oportunidade ou tendência de mercado: Você já imaginou como sua empresa poderia revolucionar suas operações utilizando tecnologias avançadas de inteligência artificial e IoT?',
    required: true
  })
  @IsNotEmpty({message: "intro não pode ser vazio."})
  intro: string;

  // Conceituação
  // O O que é isso? 
  // - O que torna único?
  @ApiProperty({
    example: 'O que diferencia o seu projeto/produto e o torna único? Innovatech Solutions se destaca pela sua abordagem inovadora na integração de tecnologia avançada em soluções empresariais, proporcionando eficiência e resultados excepcionais.',
    required: true
  })
  @IsNotEmpty({message: "Originalidade não pode ser vazio."})
  originalidade: string;

	// - O que você pode fazer que os outros não podem?
  @ApiProperty({
    example: 'Quais são as capacidades exclusivas que o seu projeto possui e que o diferencia dos outros? Desenvolvemos tecnologias patenteadas que combinam inteligência artificial e IoT para criar soluções personalizadas que se adaptam às necessidades específicas de cada cliente.',
    required: true
  })
  @IsNotEmpty({message: "Diferencial não pode ser vazio."})
  diferencial: string;

	// - Qual a maior necessidade que isso atende?
  @ApiProperty({
    example: 'Qual a maior necessidade que isso atende? Atendemos à necessidade crescente das empresas por automação inteligente e análise de dados em tempo real para otimizar processos e tomar decisões estratégicas mais informadas.',
    required: true
  })
  @IsNotEmpty({message: "Necessidade não pode ser vazio."})
  necessidade: string;

	// - Que problema isso resolve?
  @ApiProperty({
    example: 'Que problema essa solução resolve? Solucionamos o desafio das empresas em gerenciar grandes volumes de dados de maneira eficiente, transformando-os em insights acionáveis que impulsionam o crescimento e a competitividade.',
    required: true
  })
  @IsNotEmpty({message: "Problema não pode ser vazio."})
  problema: string;

	// - Quem é mais beneficiado com isso?
  @ApiProperty({
    example: 'Quem são os principais beneficiários dessa solução? Qual é o seu público-alvo? Empresas de médio a grande porte em setores como manufatura, logística e serviços financeiros que buscam melhorar sua eficiência operacional e tomar decisões baseadas em dados precisos.',
    required: true
  })
  @IsNotEmpty({message: "PublicoAlvo não pode ser vazio."})
  publicoAlvo: string;

	// - Que lacuna no mercado isso preenche?
  @ApiProperty({
    example: 'Qual(is) é(são) a(s) lacuna(s) no mercado que sua solução preenche? Preenchemos a lacuna entre a coleta de dados e sua aplicação estratégica, oferecendo soluções que são acessíveis e escaláveis para empresas de diferentes portes.',
    required: true
  })
  @IsNotEmpty({message: "LacunaMercado não pode ser vazio."})
  lacunaMercado: string;

	// - O que torna sua concorrência inferior?
  @ApiProperty({
    example: 'O que torna sua concorrência inferior? Nossa capacidade de personalizar soluções de acordo com as necessidades específicas de cada cliente e nosso compromisso com a inovação contínua nos diferenciam de concorrentes que oferecem soluções genéricas e menos adaptáveis.',
    required: true
  })
  @IsNotEmpty({message: "Competitividade não pode ser vazio."})
  competitividade: string;

  // C Como funciona?
  // - O que lhe permite sua oferta funcionar?
  @ApiProperty({
    example: 'O que permite sua solução funcionar? Como ela funciona? Nossa equipe altamente qualificada de engenheiros e cientistas de dados, combinada com parcerias estratégicas com líderes da indústria de tecnologia, garante a excelência na entrega e suporte contínuo de nossas soluções.',
    required: true
  })
  @IsNotEmpty({message: "ComoFunciona não pode ser vazio."})
  comoFunciona: string;
  
	// - Quantas pessoas tem esse problema?
  @ApiProperty({
    example: 'Quantas pessoas tem esse problema? Existe alguma pesquisa relacionado a isso? Quais são os dados? Estima-se que milhares de empresas em todo o mundo enfrentam desafios semelhantes relacionados à gestão eficiente de dados e tomada de decisões baseada em dados.',
    required: true
  })
  @IsNotEmpty({message: "QtdPessoasProblema não pode ser vazio."})
  qtdPessoasProblema: string;

	// - Quem realmente executa o serviço?
  @ApiProperty({
    example: 'Quem realmente executa o serviço? Nossa equipe interna de especialistas em implementação e suporte técnico trabalha lado a lado com os clientes para garantir uma transição suave e maximizar o retorno sobre o investimento em nossas soluções.',
    required: true
  })
  @IsNotEmpty({message: "QuemFaz não pode ser vazio."})
  quemFaz: string;

	// - Existe um processo que deve ser seguido com precisão?
  @ApiProperty({
    example: 'Existe um processo que deve ser seguido com precisão? Sim, nossa metodologia de implementação segue um processo rigoroso que inclui análise detalhada de requisitos, desenvolvimento iterativo, testes extensivos e treinamento personalizado para garantir o sucesso da implementação.',
    required: true
  })
  @IsNotEmpty({message: "Processo não pode ser vazio."})
  processo: string;

  // - Quanto dinheiro o comprador poderá economizar?
  @ApiProperty({
    example: 'Quanto o público poderá economizar com a sua solução? Os compradores podem economizar significativamente em custos operacionais ao automatizar processos manuais e reduzir erros, além de melhorar a eficiência operacional e aumentar a produtividade.',
    required: true
  })
  @IsNotEmpty({message: "EconomiaPublico não pode ser vazio."})
  economiaPublico: string;
  
  // Contextualização
  // T Tem certeza?
	// - Um terceiro já verificou suas alegações?
  @ApiProperty({
    example: 'Existe alguma pesquisa feita por terceiros que já verificou suas alegações e hipóteses? Sim, nossas soluções são validadas por auditores independentes e têm sido adotadas com sucesso por clientes de renome em diversas indústrias.',
    required: true
  })
  @IsNotEmpty({message: "verificacaoNegocio não pode ser vazio."})
  verificacaoNegocio: string;

	// - Quem você está usando para entregar isso?
  @ApiProperty({
    example: 'Com qual parceiro ou fornecedor você está trabalhando para entregar isso? Contamos com parcerias estratégicas com líderes em tecnologia de hardware e software para integrar as melhores soluções disponíveis no mercado em nossos produtos.',
    required: true
  })
  @IsNotEmpty({message: "fornecedor não pode ser vazio."})
  fornecedor: string;

	// - Você tem apoiadores inesperados?
  @ApiProperty({
    example: 'Existem apoiadores inesperados do seu projeto/solução? Recebemos apoio significativo de especialistas em inovação tecnológica, investidores em capital de risco e organizações de pesquisa acadêmica que reconhecem o potencial disruptivo de nossas soluções.',
    required: true
  })
  @IsNotEmpty({message: "apoiador não pode ser vazio."})
  apoiador: string;

  // Efetivar
  // C Consegue fazer?  
	// - Que bons resultados o levaram a fazer esse trabalho?
  @ApiProperty({
    example: 'Quais foram os resultados positivos que o motivaram a realizar esse projeto? Nossa capacidade comprovada de melhorar a eficiência operacional de nossos clientes em até 30% e aumentar a lucratividade em 20% tem impulsionado nosso compromisso contínuo com a inovação e excelência em serviços tecnológicos avançados.',
    required: true
  })
  @IsNotEmpty({message: "resultado não pode ser vazio."})
  resultado: string;
}