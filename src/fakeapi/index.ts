/* eslint-disable @typescript-eslint/no-explicit-any */
import { createServer, Model, Response } from 'miragejs';

export function startFakeAPI() {
  createServer({
    models: {
      user: Model,
      item: Model,
    },

    seeds(server) {
      server.create('user', { email: 'admin@gmail.com', password: 'admin', type: 'admin' } as any);
      server.create('user', { email: 'client@gmail.com', password: 'client', type: 'client' } as any);
      const pizzaImageURL = 'https://images.unsplash.com/photo-1594007654729-407eedc4be65?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=428&q=80';
      const hamburgerImageURL = 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=999&q=80';
      const sodaImageURL = 'https://images.unsplash.com/photo-1585498154575-3db0fda49f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80';
      server.create('item', { name: 'Pizza Brotinho', price: 9.99, quantity: 200, category: 'Pizza', image: pizzaImageURL } as any);
      server.create('item', { name: 'Pizza Média', price: 19.99, quantity: 200, category: 'Pizza', image: pizzaImageURL } as any);
      server.create('item', { name: 'Pizza Grande', price: 29.99, quantity: 200, category: 'Pizza', image: pizzaImageURL } as any);
      server.create('item', { name: 'Pizza Gigante', price: 39.99, quantity: 200, category: 'Pizza', image: pizzaImageURL } as any);
      server.create('item', { name: 'Hamburger', price: 9.99, quantity: 200, category: 'Hamburger', image: hamburgerImageURL } as any);
      server.create('item', { name: 'Hamburger Duplo', price: 19.99, quantity: 200, category: 'Hamburger', image: hamburgerImageURL } as any);
      server.create('item', { name: 'Hamburger Triplo', price: 29.99, quantity: 200, category: 'Hamburger', image: hamburgerImageURL } as any);
      server.create('item', { name: 'Coca-Cola', price: 9.99, quantity: 200, category: 'Bebidas', image: sodaImageURL } as any);
      server.create('item', { name: 'Guaraná', price: 9.99, quantity: 200, category: 'Bebidas', image: sodaImageURL } as any);
      server.create('item', { name: 'Fanta', price: 9.99, quantity: 200, category: 'Bebidas', image: sodaImageURL } as any);
    },

    routes() {
      this.post('/api/login', (schema: any, request) => {
        const { email, password } = JSON.parse(request.requestBody);
        const user = schema.users.findBy({ email, password });

        if (user) return new Response(200, {}, { user });
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

      this.get('/api/items', (schema: any) => {
        return schema.items.all();
      });

      this.post('/api/items', (schema: any, request) => {
        const { name, price, quantity, category, image } = JSON.parse(request.requestBody);
        schema.items.create({ name, price, quantity, category, image });
        return schema.items.all();
      });

      this.delete('/api/items/:id', (schema: any, request) => {
        const id = request.params.id;
        schema.items.find(id).destroy();
        return schema.items.all();
      });

      this.put('/api/items/:id', (schema: any, request) => {
        const id = request.params.id;
        const { name, price, quantity, category, image } = JSON.parse(request.requestBody);
        schema.items.find(id).update({ name, price, quantity, category, image });
        return schema.items.all();
      });

      this.post('/api/orders', (schema: any, request) => {
        const { items, client } = JSON.parse(request.requestBody);
        schema.orders.create({ items, client });
        return schema.orders.all();
      });
    },
  });
}