import express from 'express';
import {
  listarConsultas,
  buscarConsultaPorId,
  criarConsulta,
  atualizarConsulta,
  deletarConsulta
} from '../controllers/consultaController.js';
import { autenticarToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', autenticarToken, listarConsultas); 
router.get('/:id', buscarConsultaPorId);
router.post('/', autenticarToken, criarConsulta);
router.put('/:id', atualizarConsulta);
router.delete('/:id', deletarConsulta);

export default router;
