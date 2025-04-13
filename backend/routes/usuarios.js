import express from 'express';
import { cadastrarUsuario, login } from '../controllers/usuarioController.js';

const router = express.Router();

router.post('/cadastro', cadastrarUsuario);
router.post('/login', login);
export default router;
