import express from 'express';
import jwtAuthenticationMiddleware from './middlewares/jwt-authentication.middleware';
import errorHandler from './middlewares/error-handler.middleware';
import authorizationRoute from './routes/authorization.route';
import statusRoute from './routes/status.route';
import usersRouter from './routes/users.route';

const app = express();

//configuracao da aplicacao
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//configuracao das rotas
app.use(statusRoute);
app.use(authorizationRoute);

app.use(jwtAuthenticationMiddleware);
app.use(usersRouter);


//Configuracao dos HAndles de Erro
app.use(errorHandler);


//inicializacao do servidor
app.listen(3000, () => {
    console.log('Aplicação executando na porta 3000')
})

