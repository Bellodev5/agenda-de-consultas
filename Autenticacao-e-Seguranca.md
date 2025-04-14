# Autenticação e Segurança no Projeto

O projeto **Agenda de Consultas** implementa autenticação segura e proteção de rotas utilizando JSON Web Tokens (JWT), criptografia de senhas com `bcrypt` e boas práticas de segurança na manipulação de dados sensíveis. Esses recursos garantem que apenas usuários autenticados possam acessar determinadas funcionalidades do sistema, como visualizar agendamentos ou cadastrar novos serviços.

---

## 🔐 Criptografia de Senhas

Antes de armazenar a senha no banco de dados, ela é criptografada com `bcrypt`, uma biblioteca amplamente usada por sua robustez e confiabilidade.

### Exemplo:
```js
// controllers/usuarioController.js
const senhaCriptografada = await bcrypt.hash(senha, 10);

await pool.query(
  'INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3)',
  [nome, email, senhaCriptografada]
);
```

- O número `10` representa o salt rounds, aumentando a segurança da senha mesmo que o banco seja comprometido.

---

## 🔑 Autenticação com JWT

Na hora do login, o sistema verifica se as credenciais do usuário estão corretas. Em caso positivo, um **token JWT** é gerado e enviado como resposta. Esse token é posteriormente utilizado para autorizar o acesso às rotas protegidas.

### Exemplo:
```js
// controllers/usuarioController.js
const token = jwt.sign({ id: usuario.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });

res.json({ mensagem: 'Login realizado com sucesso', token });
```

Esse token contém um payload seguro com o `id` do usuário e um tempo de expiração. Ele é assinado usando a chave secreta `JWT_SECRET`, definida no `.env`.

---

## 🔐 Proteção de Rotas com Middleware

As rotas que exigem autenticação utilizam o middleware `autenticarUsuario`, que verifica se o token JWT está presente e válido.

### Exemplo:
```js
// middlewares/autenticarUsuario.js
export default function autenticarUsuario(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ mensagem: 'Token não fornecido' });

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

- Se o token estiver ausente ou inválido, o acesso é negado.
- Se estiver válido, o `usuarioId` é atribuído à requisição e o processo continua normalmente.

---

## 📦 Armazenamento Seguro com Variáveis de Ambiente

Informações sensíveis como a URL do banco de dados e a chave secreta do JWT não são armazenadas no código, mas sim em um arquivo `.env`, que é ignorado pelo Git para evitar exposições acidentais.

```env
DATABASE_URL=postgres://usuario:senha@localhost:5432/agenda
JWT_SECRET=sua_chave_super_secreta
```

---

## 🚫 Boas Práticas Adicionais

- Validação dos dados de entrada (evita SQL Injection)
- Retorno de mensagens genéricas de erro para não expor a lógica interna
- Tempo de expiração do token limitado (1h)
- Criptografia forte para senhas (`bcrypt`)

---

## 🔒 Segurança na prática

Com a autenticação implementada, rotas como a listagem de agendamentos agora são protegidas:

```js
// routes/agendamentos.js
import autenticarUsuario from '../middlewares/autenticarUsuario.js';

router.get('/', autenticarUsuario, listarAgendamentos);
```

Somente usuários com um token válido conseguem acessar essa rota, garantindo a privacidade dos dados.

---
