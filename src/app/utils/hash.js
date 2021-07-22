import bcrypt from 'bcrypt';

export default {
    criptografe: async (string) => {
        return await bcrypt.hash(string, 10);
    },
};