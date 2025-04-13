import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import usuariosRoutes from './routes/usuarios.js';
import consultaRoutes from './routes/consultas.js';
import servicosRoutes from './routes/servicos.js';
import agendamentosRoutes from './routes/agendamentos.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/usuarios', usuariosRoutes);
app.use('/consultas', consultaRoutes);
app.use('/servicos', servicosRoutes);
app.use('/agendamentos', agendamentosRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
