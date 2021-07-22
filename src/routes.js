import { Router } from 'express';
import registroController from './app/controllers/registroController';

const routes = new Router();

// Registrando um usuário
routes.post('/api/v1/usuario/registro', registroController.post_registro);
routes.get('/api/v1/usuario/todos', registroController.get_all);
routes.post('/api/v1/usuario/login', registroController.post_auth);

routes.get('/status', (req, res) => {
    res.status(200).json({
        domain: 'teste_fcj-backend',
        version: 0.1,
        status: 'OK'
    });
});

export default routes;