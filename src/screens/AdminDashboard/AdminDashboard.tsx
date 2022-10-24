/* eslint-disable @typescript-eslint/no-empty-function */
import { Button, CartItem, ItemEntry, SideBar } from '@components';
import { ArchiveBoxIcon, BellAlertIcon, PlusIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';

// Types -----------------------------------------------------------------------

interface Item {
  name: string;
  price: number;
  quantity: number;
  category: string;
  image: string;
  id: string;
}

interface Client {
  id: string;
  name: string;
}

interface OrderEntry {
  id: number;
  items: Item[];
  client: Client;
}

// Component -------------------------------------------------------------------

export function AdminDashboardScreen(): JSX.Element {
  const [selectedView, setSelectedView] = useState<'items' | 'orders'>('items');

  return (
    <section className='flex flex-row h-screen'>
      <SideBar
        items={[
          {
            icon: BellAlertIcon,
            label: 'Pedidos',
            isSelected: selectedView === 'orders',
            onClick: () => setSelectedView('orders'),
          },
          {
            icon: ArchiveBoxIcon,
            label: 'Items',
            isSelected: selectedView === 'items',
            onClick: () => setSelectedView('items'),
          }
        ]}
      />
      {selectedView === 'orders' && <Orders />}
      {selectedView === 'items' && <Items />}
    </section>
  );
}

// Views -----------------------------------------------------------------------

function Orders(): JSX.Element {
  const [orders, setOrders] = useState<OrderEntry[]>([]);

  async function fetchOrders() {
    const response = await fetch('api/orders', { method: 'GET' });
    const data = await response.json();
    setOrders(data.orders);
  }

  useEffect(() => void fetchOrders(), []);

  function getTotalFromItems(items: Item[]) {
    return items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  }

  return (
    <div className='flex flex-col w-full h-screen overflow-y-auto gap-5 p-4'>
      <h1 className='text-3xl font-bold ml-4'>Pedidos</h1>
      {orders.map((order) => (
        <div key={order.id} className="flex flex-col w-full gap-2 p-4">
          <h2>Pedido do {order.client.name} (R${getTotalFromItems(order.items)})</h2>
          {order.items.map((item) => (
            <CartItem
              category={item.category}
              image={item.image}
              name={item.name}
              price={item.price}
              quantity={item.quantity}
              key={item.id}
              id={+item.id}
              totalAvailable={0}
              lockQuantity
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function Items(): JSX.Element {
  const [items, setItems] = useState<Item[]>([]);

  async function fetchItems() {
    const response = await fetch('api/items', { method: 'GET' });
    const data = await response.json();
    setItems(data.items);
  }

  function addItem() {
    setItems([{
      name: 'Novo item',
      price: 1.99,
      quantity: 10,
      category: 'Novo item',
      image: 'https://via.placeholder.com/150',
      id: 'null',
    }, ...items]);
  }

  useEffect(() => void fetchItems(), []);

  return (
    <div className='flex flex-col w-full h-screen overflow-y-auto gap-5 p-4'>
      <h1 className='text-3xl font-bold ml-4'>Items do menu</h1>
      <div className='w-[170px] self-end -mt-14'>
        <Button
          label='Adicionar item'
          onClick={addItem}
          icon={PlusIcon}
          iconPosition='right'
          theme='primary'
        />
      </div>
      {items.map((item) => (
        <ItemEntry
          id={item.id}
          category={item.category}
          image={item.image}
          name={item.name}
          price={item.price}
          quantity={item.quantity}
          key={item.id}
          refresh={fetchItems}
        />
      ))}
    </div>
  );
}

