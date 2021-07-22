import Joi from 'joi';
// Para facilitar foi utilizado um mockup de dados em memmoria simulando o acesso a um banco de dados
import dados from '../dados_mock/dados';
import hash from '../utils/hash';
import bcrypt from 'bcrypt';
import { unsafe } from 'ini';

class RegistroController {
    async post_registro(req, res) {
        try {

            const usuario = req.body

            // validando o body 
            const schema = Joi.object({
                usuario: Joi.string().required(),
                email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
                senha: Joi.string().required(),
            });

            const { error, value } = schema.validate(usuario, {
                abortEarly: false,
                allowUnknown: true,
                stripUnknown: true,
            });

            if (error) {
                return res.status(400).json({
                    error: `Erro de validação: ${error.details
                        .map((x) => x.message)
                        .join(', ')}`,
                });
            }

            value.senha = await hash.criptografe(value.senha);

            if (dados.consulta_email(usuario.email)) {
                return res.status(406).json({ error: "Já existe um usuário com esse email nos registros!" });
            }

            dados.registre(value);
            return res.status(200).json({ value });

        } catch (error) {
            return res.status(500).json({ error: `Erro na comunicação com o servidor | ${error}` });
        }
    }

    async get_all(req, res) {
        try {

            var copia = dados.retorno_todos();
            copia.senha = undefined;
            return res.status(200).json(copia);
        } catch (error) {
            return res.status(500).json({ error: `Erro na comunicação com o servidor | ${error}` });
        }
    }

    async post_auth(req, res) {
        try {
            const { email, senha } = req.body
            
            if (!dados.consulta_email(email)) {
                return res.status(403).json({ error: 'Email não encontrado na base de dados!' });
            }
            
            const usuario = dados.retorna_por_email(email)
            if (!await bcrypt.compare(senha, usuario.senha)) {
                return res.status(403).json({ error: 'Senha incorreta!' });
            }

            return res.status(200).json(usuario.usuario);
        } catch (error) {
            return res.status(500).json({ error: `Erro na comunicação com o servidor | ${error}` });
        }
    }
}

export default new RegistroController();