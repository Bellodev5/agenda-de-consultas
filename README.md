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
- *Moment.js e Luxon* – Utilizadas para manipulação de datas e horários nos agendamentos -  Manipulação de datas e horas 
- *Insomnia* – Ferramenta utilizada para testar todas as rotas da API durante o desenvolvimento  

---
Claro! Aqui está a parte do caminho para o seu README:

---

## Conceitos Importantes

Neste projeto, adotamos os princípios da **[Programação Orientada a Objetos (POO)](./POO-no-Projeto.md)** para organizar e estruturar o código. Essa abordagem garante uma maior modularidade, reutilização e escalabilidade. Confira a documentação para entender como conceitos como encapsulamento, herança e abstração são aplicados no **Agenda de Consultas**.

Além disso, utilizamos **[Autenticação e Segurança](./Autenticacao-e-Seguranca.md)** para garantir que as rotas sensíveis estejam protegidas e que apenas usuários autenticados possam acessar dados privados. 

Por fim, a aplicação de **[Middlewares](./Middlewares.md)** garante que todas as funcionalidades intermediárias, como validação de dados e tratamento de erros, sejam feitas de forma consistente e segura.

--- 

Agora, basta adicionar essa parte ao seu README para criar links para os arquivos de documentação dos tópicos!
---
**Feito por: Guilherme Bello**  
/ Jovem Aprendiz – Portobello Group  
/ Técnico em Desenvolvimento de Sistemas (em formação)  
/ Telefone: (47) 99146-1399  
/ Email: guiilhermebello2@gmail.com  

---
