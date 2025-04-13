import db from '../database/conexao.js';

export const criarConsulta = async (req, res) => {
  const { nome_paciente, data_consulta, horario, descricao } = req.body;
  const usuario_id = req.usuario.id; 

  try {
    // Verificar se já existe uma consulta no mesmo horário
    const { rows } = await db.query(
      'SELECT * FROM consultas WHERE usuario_id = $1 AND data_consulta = $2 AND horario = $3',
      [usuario_id, data_consulta, horario]
    );

    if (rows.length > 0) {
      return res.status(400).json({ mensagem: 'Horário já está ocupado para essa data' });
    }

    // Criar a consulta caso o horário não esteja ocupado
    await db.query(
      'INSERT INTO consultas (nome_paciente, data_consulta, horario, descricao, usuario_id) VALUES ($1, $2, $3, $4, $5)',
      [nome_paciente, data_consulta, horario, descricao, usuario_id]
    );
    res.status(201).json({ mensagem: 'Consulta criada com sucesso' });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao criar consulta', erro: error.message });
  }
};

export async function listarConsultas() {
  const { rows } = await db.query('SELECT * FROM consultas ORDER BY data_consulta, horario;');
  return rows;
}

export async function buscarConsultaPorId(id) {
  const { rows } = await db.query('SELECT * FROM consultas WHERE id = $1;', [id]);
  return rows[0];
}

export async function atualizarConsulta(id, { nome_paciente, data_consulta, horario, descricao }) {
  const query = `
    UPDATE consultas
    SET nome_paciente = $1, data_consulta = $2, horario = $3, descricao = $4
    WHERE id = $5
    RETURNING *;
  `;
  const values = [nome_paciente, data_consulta, horario, descricao, id];
  const { rows } = await db.query(query, values);
  return rows[0];
}

export async function deletarConsulta(id) {
  await db.query('DELETE FROM consultas WHERE id = $1;', [id]);
}
