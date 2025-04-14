# Programação Orientada a Objetos (POO) no Projeto

O projeto **Agenda de Consultas** utiliza conceitos fundamentais da Programação Orientada a Objetos (POO) no desenvolvimento do backend em Node.js com JavaScript moderno. Ainda que JavaScript não seja uma linguagem puramente orientada a objetos como Java, foi possível aplicar diversos princípios da POO na estrutura do projeto.

---

## 🧱 Encapsulamento

Encapsulamento é a prática de esconder detalhes internos de uma classe (ou módulo) e expor apenas o que for necessário. No projeto, isso foi feito organizando a lógica da aplicação em **controllers**, **models** e **middlewares**, cada um com responsabilidades bem definidas.

### Exemplo:
```js
// controllers/usuarioController.js
export async function cadastrarUsuario(req, res) {
  const { nome, email, senha } = req.body;
  const senhaCriptografada = await bcrypt.hash(senha, 10);
  
  const novoUsuario = await db.query(
    'INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING *',
    [nome, email, senhaCriptografada]
  );

  res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso', usuario: novoUsuario.rows[0] });
}
```

Nesse exemplo, a lógica de criação do usuário está **encapsulada** dentro de uma função que pertence exclusivamente ao `usuarioController`. Outros arquivos não precisam conhecer os detalhes de como o usuário é salvo ou como a senha é tratada.

---

## 🧬 Abstração

A abstração permite esconder detalhes complexos e expor apenas o necessário. No projeto, o banco de dados é abstraído pelo uso da conexão `pool`, e os endpoints REST ocultam as complexidades da comunicação com o PostgreSQL.

### Exemplo:
```js
// database/conexao.js
import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default pool;
```

A partir desse ponto, todos os módulos usam apenas `pool.query()` para executar comandos SQL, sem precisar se preocupar com os detalhes da conexão.

---

## 🧪 Exemplo de Estrutura POO Modular

```plaintext
backend/
│
├── controllers/
│   ├── agendamentoController.js
│   ├── servicoController.js
│   └── usuarioController.js
│
├── middlewares/
│   ├── autenticarUsuario.js
│
├── routes/
│   ├── agendamentos.js
│   ├── servicos.js
│   └── usuarios.js
│
├── database/
│   └── conexao.js
```

Cada parte do sistema (usuário, serviço, agendamento) está organizada em camadas bem definidas. Isso melhora a manutenibilidade, separa responsabilidades e segue os princípios da **coesão e baixo acoplamento**, que são essenciais na POO.

---

## ✅ Vantagens obtidas com POO

- Separação clara de responsabilidades
- Reaproveitamento de código (ex: middlewares e conexões)
- Facilidade de manutenção e escalabilidade
- Maior legibilidade e organização do projeto

---
