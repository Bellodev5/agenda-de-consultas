Agenda de Consultas – Node.js + PostgreSQL
Este projeto é uma API backend desenvolvida em Node.js, que permite o cadastro de usuários, criação de serviços e agendamento de consultas. Os usuários podem se autenticar, visualizar seus próprios agendamentos e realizar operações seguras graças à integração com JWT. Todas as informações são armazenadas em um banco de dados PostgreSQL.

Funcionalidades

Cadastro de usuário com senha criptografada

Login com autenticação via JWT

Registro de serviços com:

Nome

Descrição

Duração (em minutos)

Agendamento de consultas com:

Data e hora

Status a ser consultado

Associação ao usuário e serviço

Listagem de consultas por usuário logado

Validação e proteção de rotas com token JWT

Tecnologias Utilizadas

Node.js – Plataforma de desenvolvimento utilizada no backend da aplicação

Express.js – Framework web para gerenciamento de rotas, middlewares e requisições HTTP

PostgreSQL – Banco de dados relacional utilizado para armazenar usuários, serviços e agendamentos

JWT (JSON Web Token) – Controle de autenticação e acesso seguro às rotas protegidas

Bcrypt – Criptografia de senhas para garantir a segurança dos dados dos usuários

Dotenv – Gerenciamento de variáveis de ambiente sensíveis (como URL do banco de dados)

Moment.js – Manipulação e formatação de datas e horários nos agendamentos

Insomnia – Ferramenta utilizada durante o desenvolvimento para testes das rotas da API

Documentação

Para instruções de instalação, execução da aplicação e configuração do banco de dados, consulte o arquivo .env.example incluído neste repositório.

Feito por: Guilherme Bello
/ Jovem Aprendiz – Portobello Group
/ Técnico em Desenvolvimento de Sistemas (em formação)
/ Telefone: (47) 99146-1399
/ Email: guiilhermebello2@gmail.com

