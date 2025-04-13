import db from '../models/conexao.js'; 

export async function listarAgendamentos(req, res) {
  try {
    const result = await db.query('SELECT * FROM agendamentos ORDER BY data_agendada;');
    
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao listar agendamentos', detalhe: error.message });
  }
}

export async function criarAgendamento(req, res) {
  try {
    const { usuario_id, servico_id, data_agendada, status } = req.body;

    const result = await db.query(
      'INSERT INTO agendamentos (usuario_id, servico_id, data_agendada, status) VALUES ($1, $2, $3, $4) RETURNING *;',
      [usuario_id, servico_id, data_agendada, status]
    );
    
    res.status(201).json({
      mensagem: 'Agendamento criado com sucesso',
      agendamento: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao criar agendamento', detalhe: error.message });
  }
}
