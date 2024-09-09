# Especificações do Projeto

## Personas

Persona 1: Gestor de ONG Idade: 45-65 anos Conhecimento em Tecnologia: Básico Necessidades: Controle das operações, gerar relatórios, comunicação clara com doadores e voluntários, divulgação de atividades do projeto.

![image](https://github.com/user-attachments/assets/c962edfe-a3b7-45c0-9245-0053d3c73d7b)


Persona 2: Voluntário Idade: 18-30 anos Conhecimento em Tecnologia: Intermediário Necessidades: Interface fácil de usar, acesso rápido a informações sobre atividades e beneficiários.

![image](https://github.com/user-attachments/assets/4064e404-bd4b-4944-b9fe-810c142f2d40)


Persona 3: Doador Idade: 25-60 anos Conhecimento em Tecnologia: Básico a intermediário Necessidades: Atualizações sobre o impacto das doações, facilidade para realizar contribuições.

![image](https://github.com/user-attachments/assets/d1c14dee-afae-49de-8110-688ea7fbed27)


## Histórias de Usuários

Com base na análise das personas forma identificadas as seguintes histórias de usuários:

|EU COMO... `PERSONA`| QUERO/PRECISO ... `FUNCIONALIDADE` |PARA ... `MOTIVO/VALOR`                 |
|--------------------|------------------------------------|----------------------------------------|
|Usuário do sistema  | Registrar minhas tarefas           | Não esquecer de fazê-las               |
|Administrador       | Alterar permissões                 | Permitir que possam administrar contas |


## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto.

### Requisitos Funcionais

|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
|RF-001| Permitir que o usuário cadastre e altere beneficiários | ALTA |
|RF-002| Permitir que o usuário cadastre e altere voluntários   | ALTA |
|RF-003| Permitir que o usuário cadastre e altere patrocinadores  | ALTA |
|RF-004| Permitir que o usuário cadastre e altere projetos sociais semelhantes   | ALTA |
|RF-005| Permitir que o usuário cadastre e altere as informações sobre as doações   | ALTA |
|RF-006| Emitir um relatório de prestação de contas   | ALTA |
|RF-007| Emitir um relatório de impacto das doações   | ALTA |
|RF-008| Exibir o Feed do Instagram do projeto   | ALTA |
|RF-009| Exibir um histórico das doações recebidas pelo projeto   | ALTA |
|RF-010| Exibir uma descrição breve sobre alguns dos beneficiários do projeto   | ALTA |
|RF-011| Permitir que um usuário externo entre em contato com a equipe do projeto   | MÉDIA |
|RF-012| Permitir que o usuário cadastre e altere eventos relacionados ao projeto   | ALTA |


### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| O sistema deve ser responsivo para rodar em um dispositivos móvel | MÉDIA | 
|RNF-002| Deve processar requisições do usuário em no máximo 3s |  BAIXA | 


## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O projeto deverá ser entregue até o final do semestre |
|02| Não pode ser desenvolvido um módulo de backend        |

