/* eslint-disable @typescript-eslint/no-explicit-any */
import { createServer, Model, Response } from 'miragejs';

export function startFakeAPI() {
  createServer({
    models: {
      user: Model,
      item: Model,
      order: Model,
    },

    seeds(server) {
      server.create('user', { email: 'admin@gmail.com', password: 'admin', type: 'admin', name: 'Zézinho' } as any);
      server.create('user', { email: 'client@gmail.com', password: 'client', type: 'client', name: 'Gustavo Maltez' } as any);
      const pizzaImageURL = 'https://images.unsplash.com/photo-1594007654729-407eedc4be65?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=428&q=80';
      const hamburgerImageURL = 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=999&q=80';
      const sodaImageURL = 'https://images.unsplash.com/photo-1585498154575-3db0fda49f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80';
      server.create('item', { name: 'Pizza Brotinho', price: 9.99, quantity: 3, category: 'Pizza', image: pizzaImageURL } as any);
      server.create('item', { name: 'Pizza Média', price: 19.99, quantity: 7, category: 'Pizza', image: pizzaImageURL } as any);
      server.create('item', { name: 'Pizza Grande', price: 29.99, quantity: 5, category: 'Pizza', image: pizzaImageURL } as any);
      server.create('item', { name: 'Pizza Gigante', price: 39.99, quantity: 2, category: 'Pizza', image: pizzaImageURL } as any);
      server.create('item', { name: 'Hamburger', price: 9.99, quantity: 1, category: 'Hamburger', image: hamburgerImageURL } as any);
      server.create('item', { name: 'Hamburger Duplo', price: 19.99, quantity: 4, category: 'Hamburger', image: hamburgerImageURL } as any);
      server.create('item', { name: 'Hamburger Triplo', price: 29.99, quantity: 7, category: 'Hamburger', image: hamburgerImageURL } as any);
      server.create('item', { name: 'Coca-Cola', price: 9.99, quantity: 3, category: 'Bebidas', image: sodaImageURL } as any);
      server.create('item', { name: 'Guaraná', price: 9.99, quantity: 20, category: 'Bebidas', image: sodaImageURL } as any);
      server.create('item', { name: 'Fanta', price: 9.99, quantity: 13, category: 'Bebidas', image: sodaImageURL } as any);
      server.create('order', {
        'items': [
          {
            'name': 'Pizza Brotinho',
            'price': 9.99,
            'quantity': 1,
            'category': 'Pizza',
            'image': 'https://images.unsplash.com/photo-1594007654729-407eedc4be65?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=428&q=80',
            'id': '1',
            'totalAvailable': 3
          },
          {
            'name': 'Pizza Média',
            'price': 19.99,
            'quantity': 1,
            'category': 'Pizza',
            'image': 'https://images.unsplash.com/photo-1594007654729-407eedc4be65?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=428&q=80',
            'id': '2',
            'totalAvailable': 7
          },
          {
            'name': 'Hamburger Duplo',
            'price': 19.99,
            'quantity': 1,
            'category': 'Hamburger',
            'image': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=999&q=80',
            'id': '6',
            'totalAvailable': 4
          },
          {
            'name': 'Hamburger Triplo',
            'price': 29.99,
            'quantity': 1,
            'category': 'Hamburger',
            'image': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=999&q=80',
            'id': '7',
            'totalAvailable': 7
          },
          {
            'name': 'Fanta',
            'price': 9.99,
            'quantity': 1,
            'category': 'Bebidas',
            'image': 'https://images.unsplash.com/photo-1585498154575-3db0fda49f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
            'id': '10',
            'totalAvailable': 13
          },
          {
            'name': 'Coca-Cola',
            'price': 9.99,
            'quantity': 1,
            'category': 'Bebidas',
            'image': 'https://images.unsplash.com/photo-1585498154575-3db0fda49f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
            'id': '8',
            'totalAvailable': 3
          }
        ],
        'client': {
          'email': 'client@gmail.com',
          'type': 'client',
          'id': '2',
          'name': 'Gustavo Maltez'
        }
      } as any);
    },

    routes() {
      this.post('/api/login', (schema: any, request) => {
        const { email, password } = JSON.parse(request.requestBody);
        const user = schema.users.findBy({ email, password });

        if (user) {
          const userWithoutPassword = { ...user.attrs };
          delete userWithoutPassword.password;
          return new Response(200, {}, { user: userWithoutPassword });
        }
        return new Response(400, {}, { error: 'E-mail ou senha incorretos' });
      });

      this.post('/api/register', (schema: any, request) => {
        const data = JSON.parse(request.requestBody);
        if (schema.users.findBy({ email: data.email })) {
          return {
            status: 400,
            error: 'Já existe um usuário com esse e-mail',
          };
        }

        const user = schema.users.create(data);
        const userWithoutPassword = { ...user.attrs };
        delete userWithoutPassword.password;

        return {
          status: 200,
          user: userWithoutPassword
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
        items.forEach((item: any) => {
          const itemFromDB = schema.items.find(item.id);
          itemFromDB.update({ quantity: itemFromDB.quantity - item.quantity });
        });

        return schema.orders.all();
      });

      this.get('/api/orders', (schema: any) => {
        return schema.orders.all();
      });
    },
  });
}