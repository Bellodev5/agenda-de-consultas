**Agenda de Consultas – Node.js + PostgreSQL**  
Este projeto é uma API de agendamento de consultas desenvolvida em Node.js, que permite aos usuários se cadastrarem, realizarem login, agendarem serviços e consultarem suas informações. Todas as informações são armazenadas em um banco de dados PostgreSQL e protegidas com autenticação JWT.

---

**Funcionalidades**
- Cadastro de usuário com nome, e-mail e senha criptografada  
- Login com autenticação via token JWT  
- Cadastro de serviços com:
  - Nome do serviço  
  - Descrição  
  - Duração em minutos  
- Agendamento de consultas com:
  - Data e hora  
  - Status da consulta  
  - Associação ao serviço e ao usuário logado  
- Listagem de agendamentos do usuário autenticado  

---

**Tecnologias Utilizadas**
- *Visual Studio Code* – Ambiente de desenvolvimento utilizado no projeto  
- *Node.js* – Plataforma de desenvolvimento backend da aplicação  
- *Express.js* – Framework web para gerenciamento das rotas e middlewares  
- *PostgreSQL* – Banco de dados relacional utilizado para armazenar os dados  
- *JWT (JSON Web Token)* – Sistema de autenticação para proteger rotas e garantir acesso apenas ao usuário logado  
- *Bcrypt* – Biblioteca usada para criptografar as senhas dos usuários antes de salvar no banco  
- *Dotenv* – Responsável por gerenciar variáveis de ambiente da aplicação (.env)  
- *Moment.js* – Utilizada para manipulação de datas e horários nos agendamentos  
- *Insomnia* – Ferramenta utilizada para testar todas as rotas da API durante o desenvolvimento  

---

**Feito por: Guilherme Bello**  
/ Jovem Aprendiz – Portobello Group  
/ Técnico em Desenvolvimento de Sistemas (em formação)  
/ Telefone: (47) 99146-1399  
/ Email: guiilhermebello2@gmail.com  

---
