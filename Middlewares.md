# Middlewares no Projeto

Os **middlewares** desempenham um papel crucial na implementação de funcionalidades intermediárias entre a requisição do cliente e a resposta do servidor. No projeto **Agenda de Consultas**, os middlewares são usados para realizar verificações de autenticação, manipulação de erros e validação de dados antes de a requisição chegar ao controlador final.

---

## 🔐 Middleware de Autenticação

O middleware de autenticação é responsável por verificar se o usuário está autenticado antes de permitir o acesso a rotas protegidas. Ele utiliza o token JWT, que é passado nas requisições HTTP, para validar se o usuário tem permissão para acessar a funcionalidade solicitada.

### Exemplo de Middleware de Autenticação:
```js
// middlewares/autenticarUsuario.js
import jwt from 'jsonwebtoken';

export default function autenticarUsuario(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ mensagem: 'Token não fornecido' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuarioId = decoded.id;
    next();
  } catch (erro) {
    return res.status(401).json({ mensagem: 'Token inválido ou expirado' });
  }
}
```

- **Descrição**: O middleware verifica se o token foi enviado na requisição. Se não houver token ou se ele for inválido, a requisição é bloqueada com um erro 401 (O erro 401 é um código de status HTTP que indica que uma solicitação de acesso a um recurso foi negada).
- **Como Funciona**: O token JWT é enviado pelo cliente no cabeçalho da requisição. Se o token for válido, o middleware extrai o ID do usuário e o adiciona à requisição (`req.usuarioId`), permitindo que o controlador utilize essa informação.

---

## 📑 Middleware de Validação de Dados

Outro middleware importante no sistema é o de **validação de dados**. Ele garante que as informações enviadas nas requisições sejam adequadas, como verificar se o campo `data_agendada` está no formato correto antes de salvar no banco de dados.

### Exemplo de Middleware de Validação:
```js
// middlewares/validarDados.js
import { validationResult } from 'express-validator';

export default function validarDados(req, res, next) {
  const erros = validationResult(req);

  if (!erros.isEmpty()) {
    return res.status(400).json({ erros: erros.array() });
  }

  next();
}
```

- **Descrição**: O middleware `validarDados` utiliza a biblioteca `express-validator` para verificar se os dados enviados são válidos. Caso haja algum erro na validação, uma resposta com status 400 e os erros é enviada ao cliente.
- **Como Funciona**: Os dados da requisição são validados com regras definidas, como verificar se o `data_agendada` é uma data válida ou se o campo `servico_id` existe no banco de dados.

---

## 🔄 Middleware de Tratamento de Erros

Em qualquer aplicação, é importante ter um middleware para capturar e tratar erros. Esse middleware é chamado de **erroHandler** e garante que todos os erros não tratados sejam respondidos de maneira consistente.

### Exemplo de Middleware de Tratamento de Erros:
```js
// middlewares/erroHandler.js
export default function erroHandler(err, req, res, next) {
  console.error(err.stack);

  res.status(500).json({
    mensagem: 'Algo deu errado no servidor. Tente novamente mais tarde.',
  });
}
```

- **Descrição**: Este middleware captura qualquer erro que ocorra durante o processamento da requisição, imprime o erro no console para facilitar o diagnóstico e envia uma resposta genérica ao cliente, sem expor detalhes internos do sistema.
- **Como Funciona**: Quando um erro ocorre, o Express automaticamente direciona para o próximo middleware com um erro como primeiro parâmetro, o que faz com que o `erroHandler` seja chamado.

---

## 🚀 Como Usar os Middlewares

Os middlewares são usados no arquivo de rotas para garantir que as validações ou autenticações aconteçam antes de a requisição ser processada pelos controladores.

### Exemplo de Implementação de Middleware nas Rotas:
```js
// routes/agendamentos.js
import express from 'express';
import autenticarUsuario from '../middlewares/autenticarUsuario.js';
import validarDados from '../middlewares/validarDados.js';
import { listarAgendamentos, criarAgendamento } from '../controllers/agendamentoController.js';

const router = express.Router();

router.get('/', autenticarUsuario, listarAgendamentos);
router.post('/', autenticarUsuario, validarDados, criarAgendamento);

export default router;
```

- **Explicação**: No exemplo acima, o middleware `autenticarUsuario` é usado em ambas as rotas para garantir que apenas usuários autenticados possam acessar os agendamentos. Além disso, a rota `POST /agendamentos` também utiliza o middleware `validarDados` para garantir que os dados enviados pelo usuário estão no formato correto antes de serem processados.

---

## 🌐 Benefícios dos Middlewares no Projeto

1. **Modularidade**: Cada funcionalidade (autenticação, validação, tratamento de erros) é encapsulada em uma função separada, tornando o código mais organizado e fácil de manter.
2. **Segurança**: O middleware de autenticação garante que somente usuários autenticados possam acessar rotas sensíveis.
3. **Manutenção**: Com o uso de middlewares, o código fica mais fácil de estender, como adicionar novos tipos de validações ou tratamentos de erros no futuro.

---


