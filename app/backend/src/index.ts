import express from 'express';
import routes from './routes/routes';

const app = express();
app.use(express.json());
app.use(routes);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
