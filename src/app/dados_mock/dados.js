const DADOS = {
    users: []
};

export default {
    consulta_email: (email) => {
        var possuiUsuario = false
        DADOS.users.map(val => {
            if (val.email.indexOf(email) != -1) {
                possuiUsuario = true
            }
        });

        return possuiUsuario;
    },
    retorno_todos: () => DADOS,
    registre: (value) => DADOS.users.push(value), 
    retorna_por_email: (email) => {
        var usuario = undefined
        DADOS.users.map(val => {
            if (val.email.indexOf(email) != -1) {
               usuario = val;
            }
        });

        return usuario;
    }
};

