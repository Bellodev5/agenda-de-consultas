import db from '../models/conexao.js';
export const listarServicos = async (req, res) => {
    try {
      const { rows } = await db.query('SELECT * FROM servicos');
      res.status(200).json(rows);
    } catch (error) {
      res.status(500).json({ mensagem: 'Erro ao buscar serviços' });
    }
  };
  
  export const criarServico = async (req, res) => {
    const { nome, descricao, duracao_minutos } = req.body;
    
    try {
      const { rows } = await db.query(
        'INSERT INTO servicos (nome, descricao, duracao_minutos) VALUES ($1, $2, $3) RETURNING *',
        [nome, descricao, duracao_minutos]
      );
      res.status(201).json({ mensagem: 'Serviço criado com sucesso', servico: rows[0] });
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: 'Erro ao criar serviço', detalhe: error.message });
    }
  };
  