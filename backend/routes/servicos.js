import express from 'express';
import { listarServicos, criarServico } from '../controllers/servicoController.js';

const router = express.Router();

router.get('/', listarServicos);
router.post('/', criarServico);

export default router;
