/* eslint-disable @typescript-eslint/no-explicit-any */
import { createServer, Model, Response } from 'miragejs';

export function startFakeAPI() {
  createServer({
    models: {
      user: Model,
    },

    routes() {
      this.post('/api/login', (schema: any, request) => {
        console.log(schema);
        const { email, password } = JSON.parse(request.requestBody);
        if (schema.users.findBy({ email, password })) {
          return new Response(200, {}, { user: { email, password } });
        }

        return new Response(400, {}, { error: 'E-mail ou senha incorretos' });
      });

      this.post('/api/register', (schema: any, request) => {
        const { email, password } = JSON.parse(request.requestBody);
        if (schema.users.findBy({ email })) {
          return {
            status: 400,
            error: 'Já existe um usuário com esse e-mail',
          };
        }

        schema.users.create({ email, password });

        return {
          status: 200,
          user: {
            email,
            password
          }
        };
      });
    },
  });
}