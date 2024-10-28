## 4. Projeto da Solução

<span style="color:red">Pré-requisitos: <a href="03-Modelagem do Processo de Negocio.md"> Modelagem do Processo de Negocio</a></span>

## 4.1. Arquitetura da solução

Casa Cidadã
    Camada de Apresentação (Front-end)
        Interface Web
            Páginas:
                Quem Somos
│   │   │   ├── Transparência
│   │   │   ├── Assistidos
│   │   │   ├── Doação
│   │   │   ├── Contato
│   │   └── Componentes:
│   │       ├── HTML / CSS / JavaScript
│   │       └── Framework (ex.: React)
│   └── Conexão com o Back-end via API REST
│
├── Camada de Aplicação (Back-end)
│   ├── Servidor de Aplicação (Node.js / Express)
│   ├── Controladores de Rotas
│   ├── Lógica de Negócio
│   │   ├── Gerenciamento de Assistidos
│   │   ├── Gestão de Doações
│   │   ├── Prestação de Contas
│   │   ├── Autenticação de Usuários (JWT)
│   └── Conexão com:
│       ├── Banco de Dados
│       └── APIs Externas
│
├── Camada de Persistência de Dados (Banco de Dados)
│   ├── Banco de Dados Relacional (ex.: MySQL / PostgreSQL)
│   ├── Tabelas:
│   │   ├── Usuários (Gestores, Voluntários, Doadores)
│   │   ├── Assistidos
│   │   ├── Doações e Transações
│   │   ├── Contratos de Aluguel
│   │   └── Histórico de Prestação de Contas
│   └── Realiza operações CRUD com o Back-end
│
├── Camada de Integração (APIs Externas)
│   ├── APIs de Pagamento (ex.: PayPal, Stripe)
│   ├── API de Redes Sociais (Instagram, para transparência)
│   └── API de Mensagens (Email / SMS)
│
├── Camada de Segurança
│   ├── Autenticação e Autorização (JWT)
│   ├── Protocolo HTTPS
│   ├── Controle de Acesso (permissões para diferentes usuários)
│   └── Aplicação de Segurança em todas as camadas
│
└── Camada de Hospedagem e Implantação
    ├── Servidor de Aplicação e Banco de Dados (AWS, Azure, Heroku)
    ├── CDN para conteúdo estático
    └── Suporte a escalabilidade e alta disponibilidade


### 4.2. Protótipos de telas

Esta seção apresenta uma visão geral das interações do usuário através das telas do sistema, para demonstrar as funcionalidades planejadas (wireframes). As principais interfaces da plataforma são exibidas com foco em como elas foram desenhadas para atender aos requisitos funcionais e não funcionais descritos em Especificação do Projeto.

Com base nas atividades de usuário identificadas anteriormente, foi elaborado um protótipo de tela para essas interações, garantindo que cada interface facilite uma navegação intuitiva e responda às necessidades mapeadas para os diferentes perfis de usuário.

<p><img src="\images\Index.png" width="800px"></img></p>
<p><img src="\images\Login.png" width="800px"></img></p>
<p><img src="\images\Cadastro.png" width="800px"></img></p>
<p><img src="\images\Quem Somos.png" width="800px"></img></p>
<p><img src="\images\Parceiros.png" width="800px"></img></p>
<p><img src="\images\Transparência.png" width="800px"></img></p>
<p><img src="\images\Assistidos.png" width="800px"></img></p>
<p><img src="\images\Fotos.png" width="800px"></img></p>
<p><img src="\images\PopRuaBH.png" width="800px"></img></p>
<p><img src="\images\HousingFirst.png" width="800px"></img></p>
<p><img src="\images\Doe Agora.png" width="800px"></img></p>
<p><img src="\images\Contato.png" width="800px"></img></p>
<p><img src="\images\ADMINISTRADOR.png" width="800px"></img></p>



### 4.2.1 Fluxo de telas
<p><img src="\images\Fluxo.png" width="800px"></img></p>


## Diagrama de Classes

O diagrama de classes ilustra graficamente como será a estrutura do software, e como cada uma das classes da sua estrutura estarão interligadas. Essas classes servem de modelo para materializar os objetos que executarão na memória.

As referências abaixo irão auxiliá-lo na geração do artefato “Diagrama de Classes”.

> - [Diagramas de Classes - Documentação da IBM](https://www.ibm.com/docs/pt-br/rational-soft-arch/9.6.1?topic=diagrams-class)
> - [O que é um diagrama de classe UML? | Lucidchart](https://www.lucidchart.com/pages/pt/o-que-e-diagrama-de-classe-uml)

## Modelo ER

O Modelo ER representa através de um diagrama como as entidades (coisas, objetos) se relacionam entre si na aplicação interativa.]

As referências abaixo irão auxiliá-lo na geração do artefato “Modelo ER”.

> - [Como fazer um diagrama entidade relacionamento | Lucidchart](https://www.lucidchart.com/pages/pt/como-fazer-um-diagrama-entidade-relacionamento)


### 4.3. Modelo de dados

O desenvolvimento da solução proposta requer a existência de bases de dados que permitam efetuar os cadastros de dados e controles associados aos processos identificados, assim como recuperações.
Utilizando a notação do DER (Diagrama Entidade e Relacionamento), elaborem um modelo, na ferramenta visual indicada na disciplina, que contemple todas as entidades e atributos associados às atividades dos processos identificados. Deve ser gerado um único DER que suporte todos os processos escolhidos, visando, assim, uma base de dados integrada. O modelo deve contemplar, também, o controle de acesso de usuários (partes interessadas dos processos) de acordo com os papéis definidos nos modelos do processo de negócio.
_Apresente o modelo de dados por meio de um modelo relacional que contemple todos os conceitos e atributos apresentados na modelagem dos processos._

#### 4.3.1 Modelo ER

O Modelo ER representa através de um diagrama como as entidades (coisas, objetos) se relacionam entre si na aplicação interativa.]

As referências abaixo irão auxiliá-lo na geração do artefato “Modelo ER”.

> - [Como fazer um diagrama entidade relacionamento | Lucidchart](https://www.lucidchart.com/pages/pt/como-fazer-um-diagrama-entidade-relacionamento)

#### 4.3.2 Esquema Relacional

O Esquema Relacional corresponde à representação dos dados em tabelas juntamente com as restrições de integridade e chave primária.
 
As referências abaixo irão auxiliá-lo na geração do artefato “Esquema Relacional”.

> - [Criando um modelo relacional - Documentação da IBM](https://www.ibm.com/docs/pt-br/cognos-analytics/10.2.2?topic=designer-creating-relational-model)

![Exemplo de um modelo relacional](images/modeloRelacional.png "Exemplo de Modelo Relacional.")
---


#### 4.3.3 Modelo Físico

Insira aqui o script de criação das tabelas do banco de dados.

Veja um exemplo:

<code>

 -- Criação da tabela Médico
CREATE TABLE Medico (
    MedCodigo INTEGER PRIMARY KEY,
    MedNome VARCHAR(100)
);


-- Criação da tabela Paciente
CREATE TABLE Paciente (
    PacCodigo INTEGER PRIMARY KEY,
    PacNome VARCHAR(100)
);

-- Criação da tabela Consulta
CREATE TABLE Consulta (
    ConCodigo INTEGER PRIMARY KEY,
    MedCodigo INTEGER,
    PacCodigo INTEGER,
    Data DATE,
    FOREIGN KEY (MedCodigo) REFERENCES Medico(MedCodigo),
    FOREIGN KEY (PacCodigo) REFERENCES Paciente(PacCodigo)
);

-- Criação da tabela Medicamento
CREATE TABLE Medicamento (
    MdcCodigo INTEGER PRIMARY KEY,
    MdcNome VARCHAR(100)
);

-- Criação da tabela Prescricao
CREATE TABLE Prescricao (
    ConCodigo INTEGER,
    MdcCodigo INTEGER,
    Posologia VARCHAR(200),
    PRIMARY KEY (ConCodigo, MdcCodigo),ASP.NET Core
    FOREIGN KEY (ConCodigo) REFERENCES Consulta(ConCodigo),
    FOREIGN KEY (MdcCodigo) REFERENCES Medicamento(MdcCodigo)
);

</code>

Este script deverá ser incluído em um arquivo .sql na pasta src\bd.




### 4.4. Tecnologias

| **Dimensão**   | **Tecnologia**  |
| ---            | ---             |
| Diagramas      | Draw.io         |
| Wireframes     | Figma           |
| SGBD           | MySQL           |
| Front end      | HTML+CSS+JS     |
| Back end       | ASP.NET Core    |
| Deploy         | Github Pages    |

