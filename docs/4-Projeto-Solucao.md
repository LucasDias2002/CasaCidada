## 4. Projeto da Solução

<span style="color:red">Pré-requisitos: <a href="03-Modelagem do Processo de Negocio.md"> Modelagem do Processo de Negocio</a></span>

## 4.1. Arquitetura da solução

<p>Casa Cidadã <br>
├── Camada de Apresentação (Front-end) <br>
│   ├── Interface Web <br>
│   │   ├── Páginas: <br>
│   │   │   ├── Quem Somos <br>
│   │   │   ├── Transparência <br>
│   │   │   ├── Assistidos <br>
│   │   │   ├── Doação <br>
│   │   │   ├── Contato <br>
│   │   └── Componentes: <br>
│   │       ├── HTML / CSS / JavaScript <br>
│   │       └── Conexão com o Back-end via API REST <br>
│ <br>
├── Camada de Aplicação (Back-end) <br>
│   ├── Servidor de Aplicação <br>
│   ├── Controladores de Rotas <br>
│   ├── Lógica de Negócio <br>
│   │   ├── Gerenciamento de Assistidos <br>
│   │   ├── Gestão de Doações <br>
│   │   ├── Prestação de Contas <br>
│   │   ├── Autenticação de Usuários <br>
│   └── Conexão com: <br>
│       ├── Banco de Dados <br>
│       └── APIs Externas <br>
│ <br>
├── Camada de Persistência de Dados (Banco de Dados) <br>
│   ├── Banco de Dados Relacional (MySQL) <br>
│   ├── Tabelas: <br>
│   │   ├── Usuários (Gestores, Voluntários, Doadores) <br>
│   │   ├── Assistidos <br>
│   │   ├── Doações e Transações <br>
│   │   ├── Contratos de Aluguel <br>
│   │   └── Histórico de Prestação de Contas <br>
│   └── Realiza operações CRUD com o Back-end <br>
│ <br>
├── Camada de Integração (APIs Externas) <br>
│   ├── API de Redes Sociais (Instagram, para transparência) <br>
│ <br>
├── Camada de Segurança <br>
│   ├── Autenticação e Autorização <br>
│   ├── Protocolo HTTPS <br>
│   ├── Controle de Acesso (permissões para diferentes usuários) <br>
│   └── Aplicação de Segurança em todas as camadas <br>
│ <br>
└── Camada de Hospedagem e Implantação <br>
    ├── Servidor de Aplicação e Banco de Dados <br>
    ├── CDN para conteúdo estático <br>
    └── Suporte a escalabilidade e alta disponibilidade <br>
</p>

### 4.2. Protótipos de telas

Esta seção apresenta uma visão geral das interações do usuário através das telas do sistema, para demonstrar as funcionalidades planejadas (wireframes). As principais interfaces da plataforma são exibidas com foco em como elas foram desenhadas para atender aos requisitos funcionais e não funcionais descritos em Especificação do Projeto.

Com base nas atividades de usuário identificadas anteriormente, foi elaborado um protótipo de tela para essas interações, garantindo que cada interface facilite uma navegação intuitiva e responda às necessidades mapeadas para os diferentes perfis de usuário.

<p><img src="\images\Index.png" width="800px"></img></p>
<p><img src="\images\Login.png" width="800px"></img></p>
<p><img src="\images\Cadastro.png" width="800px"></img></p>
<p><img src="\images\Quem somos.png" width="800px"></img></p>
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

## Modelo ER

### 4.3. Modelo de dados

#### 4.3.1 Modelo ER

<p><img src="\images\modeloer.jpg" width="800px"></img></p>

#### 4.3.2 Esquema Relacional

<p><img src="\images\tabela1.jpg" width="800px"></img></p>
<p><img src="\images\tabela2.jpg" width="800px"></img></p>
<p><img src="\images\tabela3.jpg" width="800px"></img></p>
<p><img src="\images\tabela4.jpg" width="800px"></img></p>
<p><img src="\images\tabela5.jpg" width="800px"></img></p>
<p><img src="\images\tabela6.jpg" width="800px"></img></p>
<p><img src="\images\tabela7.jpg" width="800px"></img></p>
<p><img src="\images\tabela8.jpg" width="800px"></img></p>
<p><img src="\images\tabela9.jpg" width="800px"></img></p>
<p><img src="\images\tabela10.jpg" width="800px"></img></p>


#### 4.3.3 Modelo Físico

<code>

CREATE TABLE USUARIO (
	ID INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	CPF VARCHAR(11) UNIQUE,
	NOME VARCHAR(50) NOT NULL,
	EMAIL VARCHAR(60) NOT NULL UNIQUE,
    SENHA VARCHAR(100) NOT NULL,
	TELEFONE VARCHAR(11),
	DATA_NASC DATE,
	DATA_CRIACAO DATE
);

CREATE TABLE IMOVEL(
	ID INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	CEP VARCHAR(20) NOT NULL,
    ENDERECO VARCHAR(100) NOT NULL,
    COMPLEMENTO VARCHAR(50),
	NUM_RESIDENCIA INT NOT NULL,
	NOME_PROPRIETARIO VARCHAR(50) NOT NULL,
	TELEFONE VARCHAR(11) NOT NULL
);

CREATE TABLE VOLUNTARIO (
	ID INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	AREA_ATUACAO VARCHAR (15),
	DATA_ENTRADA DATE NOT NULL,
	CONSTRAINT FK_ID_USUARIO_VOLUNTARIO FOREIGN KEY (ID) REFERENCES USUARIO (ID)
);

CREATE TABLE GESTOR (
	ID INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	AREA_ATUACAO VARCHAR (15),
	DATA_ENTRADA DATE NOT NULL,
	CONSTRAINT FK_ID_USUARIO_GESTOR FOREIGN KEY (ID) REFERENCES USUARIO (ID)
);

CREATE TABLE DOADOR (
	ID INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	TIPO VARCHAR(15),
	DATA_ENTRADA DATE NOT NULL,
	CONSTRAINT FK_ID_USUARIO_DOADOR FOREIGN KEY (ID) REFERENCES USUARIO (ID)
);

CREATE TABLE RECEBIMENTOS(
	ID INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	ID_DOADOR INT NOT NULL,
    ID_GESTOR INT NOT NULL,
	DATA_RECEBIMENTO DATE NOT NULL,
	VALOR DOUBLE NOT NULL,
	CONSTRAINT FK_DOADOR FOREIGN KEY (ID_DOADOR) REFERENCES DOADOR (ID),
    CONSTRAINT FK_GESTOR FOREIGN KEY (ID_GESTOR) REFERENCES GESTOR (ID)
);

CREATE TABLE MORADOR(
	ID INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	NOME VARCHAR (50) NOT NULL,
	CPF VARCHAR(11) UNIQUE NOT NULL,
	TELEFONE VARCHAR(20),
	DATA_CADASTRO DATE NOT NULL,
	DATA_NASC DATE NOT NULL,
	STATUS VARCHAR(15),
	ID_IMOVEL INT,
	CONSTRAINT FK_IMOVEL_MORADOR FOREIGN KEY (ID_IMOVEL) REFERENCES IMOVEL (ID)
);

CREATE TABLE CONTRATO_ALUGUEL (
	ID_MORADOR INT NOT NULL,
	ID_IMOVEL INT NOT NULL,
	VALOR_ALUGUEL DOUBLE NOT NULL,
	DATA_INICIO DATE NOT NULL,
	DATA_TERMINO DATE NOT NULL,
	CONSTRAINT FK_MORADOR_CONTRATO FOREIGN KEY (ID_MORADOR) REFERENCES MORADOR (ID),
	CONSTRAINT FK_IMOVEL_CONTRATO FOREIGN KEY (ID_IMOVEL) REFERENCES IMOVEL (ID)
);

CREATE TABLE PARCEIRO (
	ID INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	NOME VARCHAR(100) NOT NULL,
	EMAIL VARCHAR (100) NOT NULL,
	TIPO VARCHAR (15),
	CNPJ VARCHAR (14) NOT NULL,
	AREA_ATUACAO VARCHAR (15),
	TELEFONE VARCHAR (11),
	CEP VARCHAR (11),
	NUMERO INT
);

CREATE TABLE GASTOS(
	ID INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	ID_MORADOR INT NOT NULL,
	DATA_GASTO DATE NOT NULL,
	VALOR DOUBLE NOT NULL,
	CONSTRAINT FK_MORADOR_GASTO FOREIGN KEY (ID_MORADOR) REFERENCES MORADOR (ID)
);

</code>


### 4.4. Tecnologias

| **Dimensão**                           | **Tecnologia**  |
| ---                                    | ---             |
| Diagramas                              | Draw.io         |
| Wireframes                             | Figma           |
| SGBD                                   | MySQL           |
| Hospedagem do Banco de Dados           | Azure           |
| Front end                              | HTML+CSS+JS     |
| Back end                               | JS+Express+Node |
| Deploy                                 | Github Pages    |

