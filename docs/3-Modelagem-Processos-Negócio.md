## 3. Modelagem dos Processos de Negócio


> **Links Úteis**:
> - [Modelagem de Processos AS-IS x TO-BE](https://dheka.com.br/modelagem-as-is-to-be/)
> - [20 Dicas Práticas de Modelagem de Processos](https://dheka.com.br/20-dicas-praticas-de-modelagem-de-processos/)

### 3.1. Modelagem da situação atual (Modelagem AS IS)

_O processo AS IS representa o fluxo atual de atividades para alocar moradores de rua em moradias dentro de um projeto social. Ele é composto por duas raias principais:_
1.	Equipe do Projeto:
a.	Inicia o processo identificando moradores de rua.
b.	Em seguida, os dados dos moradores são cadastrados e a equipe verifica se eles estão aptos a participar do projeto da ONG.
c.	Caso não estejam aptos, o morador é desclassificado e o processo se encerra para ele.
d.	Se o morador estiver apto, a equipe segue para a atividade de alocação de moradia, que depende da verificação dos recursos disponíveis.
2.	Contabilidade:
a.	A equipe de contabilidade verifica se há recursos suficientes para alocar a moradia.
b.	Caso não existam recursos, a contabilidade busca novos recursos na piscina "Doações", que é um subprocesso em formato de caixa preta, sem detalhamento do fluxo.
c.	Assim que a contabilidade recebe os recursos necessários, a equipe do projeto pode proceder com o aluguel da casa para o morador.

_Após a confirmação de que há recursos disponíveis, a equipe realiza uma série de atividades para garantir a adequação da moradia:_
•	Aluguel e Preparação da Casa: A casa é alugada, mobiliada e os serviços básicos (água, energia etc.) são contratados. Esse é um fluxo paralelo, onde ambas as atividades ocorrem simultaneamente.
•	Responsabilização Gradual dos Assistidos:
  o	Após 3 meses, a responsabilidade pelos débitos de serviços básicos é repassada aos assistidos.
  o	Após 9 meses (6 meses após a primeira responsabilização), os débitos de aluguel também passam a ser responsabilidade dos assistidos.
  o	O processo é acompanhado pela equipe social, garantindo que os assistidos consigam manter suas responsabilidades.

### 3.2. Descrição geral da proposta (Modelagem TO BE)
_No processo TO BE, as atividades foram reorganizadas e novas piscinas foram criadas para melhorar a gestão e automação do fluxo. O objetivo principal é separar as responsabilidades entre diferentes áreas, automatizar partes do processo e garantir maior transparência e controle sobre as etapas. As piscinas adicionadas são:_
1.	Piscina Aluguel de Residência:
a.	Esta piscina é responsável pela gestão das moradias que serão alocadas aos moradores de rua.
b.	Começa com a identificação e cadastramento das residências no sistema.
c.	Quando há uma necessidade de alugar uma casa (evento condicional), é iniciada a pesquisa de uma residência disponível no banco de dados.
d.	Após selecionar a residência, a informação é enviada para a piscina "Casa Cidadã" para que o aluguel possa ser efetivado.
2.	Piscina Contabilidade:
a.	Centraliza a gestão financeira, separando-a das outras atividades.
b.	Registra a entrada de recursos recebidos pela piscina "Doações" e mantém um controle dos valores disponíveis.
c.	Quando solicitado, registra a saída de recursos para que a piscina "Casa Cidadã" possa proceder com a alocação.

### 3.3 Modificações Chaves do AS IS para o TO BE
•	Algumas atividades manuais do AS IS foram convertidas para atividades de usuário no TO BE:
o	Identificar Morador de Rua, Cadastrar Dados, Verificar Aptidão, Continuar Alocação de Moradia, Repassar Responsabilidades de Débitos de Serviços Básicos e Aluguel passaram a ser atividades automatizadas ou semi-automatizadas, com maior controle digital.
•	A inclusão de novas piscinas torna o processo mais modular e escalável:
o	A piscina Aluguel de Residência foca no gerenciamento das casas disponíveis e no controle de ocupação.
o	A piscina Contabilidade agora é um ponto central de controle financeiro, facilitando o monitoramento de entradas e saídas de recursos.


### 3.4. Modelagem dos processos

[PROCESSO 1 - Nome do Processo](./processos/processo-1-nome-do-processo.md "Detalhamento do Processo 1.")

[PROCESSO 2 - Nome do Processo](./processos/processo-2-nome-do-processo.md "Detalhamento do Processo 2.")
