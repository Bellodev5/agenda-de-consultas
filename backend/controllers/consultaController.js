import { DateTime } from 'luxon'; 
import db from '../models/conexao.js';

export const listarConsultas = async (req, res) => {
  const usuarioId = req.usuario.id;

  //Data no padrão YYYY-MM-DD
  const formatarData = (dataISO) => {
    const data = new Date(dataISO);
    return data.toISOString().split('T')[0];
  };

  try {
    const { rows } = await db.query('SELECT * FROM consultas WHERE usuario_id = $1', [usuarioId]);

    const consultasFormatadas = rows.map((c) => ({
      ...c,
      data_consulta: formatarData(c.data_consulta),
    }));

    res.status(200).json(consultasFormatadas);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar consultas' });
  }
};

export const buscarConsultaPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await db.query('SELECT * FROM consultas WHERE id = $1', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ mensagem: 'Consulta não encontrada' });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar consulta' });
  }
};

export const criarConsulta = async (req, res) => {
  const { nome_paciente, data_consulta, horario, descricao } = req.body;
  const usuario_id = req.usuario.id;

  // Converter a data para o fuso horário correto (ex: São Paulo)
  const dataLocal = DateTime.fromISO(data_consulta).setZone('America/Sao_Paulo');
  const dataConsultaFormatada = dataLocal.toISO(); // Formato: "2025-04-20T14:00:00-03:00"

  try {
    await db.query(
      'INSERT INTO consultas (nome_paciente, data_consulta, horario, descricao, usuario_id) VALUES ($1, $2, $3, $4, $5)',
      [nome_paciente, dataConsultaFormatada, horario, descricao, usuario_id]
    );
    res.status(201).json({ mensagem: 'Consulta criada com sucesso' });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao criar consulta', erro: error.message });
  }
};

export const atualizarConsulta = async (req, res) => {
  const { id } = req.params;
  const { nome_paciente, data_consulta, horario, descricao, usuario_id } = req.body;
  try {
    await db.query(
      'UPDATE consultas SET nome_paciente = $1, data_consulta = $2, horario = $3, descricao = $4, usuario_id = $5 WHERE id = $6',
      [nome_paciente, data_consulta, horario, descricao, usuario_id, id]
    );
    res.status(200).json({ mensagem: 'Consulta atualizada com sucesso' });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao atualizar consulta' });
  }
};

export const deletarConsulta = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM consultas WHERE id = $1', [id]);
    res.status(200).json({ mensagem: 'Consulta deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao deletar consulta' });
  }
};
