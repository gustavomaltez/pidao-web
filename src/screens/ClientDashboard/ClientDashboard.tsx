/* eslint-disable @typescript-eslint/no-empty-function */
import { Button, CartItem, CategorySelector, Input, MenuItem, SideBar } from '@components';
import { HomeIcon, MagnifyingGlassIcon, ShoppingCartIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

// Types -----------------------------------------------------------------------

interface Item {
  id: number;
  category: string;
  name: string;
  price: number;
  image: string;
  totalAvailable: number;
}

interface CartEntry extends Item {
  quantity: number;
}

interface MenuProps {
  items: Item[];
  search?: string;
  setSearch: (search: string) => void;
  selectedCategory?: string;
  setSelectedCategory: (category: string) => void;
  addToCart: (item: Item) => void;
}

interface CartProps {
  cart: CartEntry[];
  removeFromCart: (item: Item) => void;
  updateQuantity: (item: Item, quantity: number) => void;
  clearCart: () => void;
}

// Component -------------------------------------------------------------------

export function ClientDashboardScreen(): JSX.Element {
  const [items, setItems] = useState<Item[]>([]);
  const [cart, setCart] = useState<CartEntry[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [selectedView, setSelectedView] = useState<'menu' | 'cart'>('menu');

  async function fetchItems() {
    const response = await fetch('api/items', { method: 'GET' });
    const data = await response.json();
    const filteredItems = data.items
      .map((item: CartEntry) => ({ ...item, quantity: 0, totalAvailable: item.quantity }))
      .filter((item: CartEntry) => item.totalAvailable > 0);
    setItems(filteredItems);
  }

  useEffect(() => {
    if (cart.length === 0)
      fetchItems();
  }, [cart]);

  return (
    <section className='flex flex-row h-screen'>
      <SideBar
        items={[
          {
            icon: HomeIcon,
            label: 'Inicio',
            isSelected: selectedView === 'menu',
            onClick: () => setSelectedView('menu'),
          },
          {
            icon: ShoppingCartIcon,
            label: 'Carrinho',
            isSelected: selectedView === 'cart',
            onClick: () => setSelectedView('cart'),
          },
        ]}
      />
      {selectedView === 'menu' && (
        <Menu
          items={items}
          search={search}
          setSearch={setSearch}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          addToCart={item => {
            const entry = cart.find(entry => entry.id === item.id);
            const currentAmount = entry ? entry.quantity : 0;
            const totalAvailable = entry ? entry.totalAvailable : 0;

            if (currentAmount !== 0 && currentAmount + 1 > totalAvailable) return toast.error('Quantidade indisponível');

            if (entry) {
              entry.quantity += 1;
              setCart([...cart]);
              toast.success(`Mais um "${item.name}" adicionado ao carrinho! Total de ${entry.quantity} itens.`);
            } else {
              setCart([...cart, { ...item, quantity: 1 }]);
              toast.success(`${item.name} adicionado ao carrinho!`);
            }

          }}
        />
      )}
      {selectedView === 'cart' && (
        <Cart
          cart={cart}
          removeFromCart={item => {
            const entry = cart.find(entry => entry.id === item.id);
            if (entry) {
              setCart(cart.filter(entry => entry.id !== item.id));
              toast.success(`${item.name} removido do carrinho!`);
            }
          }}
          updateQuantity={(item, quantity) => {
            const entry = cart.find(entry => entry.id === item.id);

            if (quantity === 0) {
              setCart(cart.filter(entry => entry.id !== item.id));
              return toast.success(`${item.name} removido do carrinho!`);
            }

            if (entry) {
              entry.quantity = quantity;
              setCart([...cart]);
              toast.success(`Quantidade de "${item.name}" atualizada para ${quantity}!`);
            }
          }}
          clearCart={() => setCart([])}
        />
      )}
    </section>
  );
}

// Views -----------------------------------------------------------------------

function Menu(props: MenuProps): JSX.Element {
  const categories = props.items
    .map(item => ({ id: item.category, name: item.category }))
    .filter((category, index, self) => self.findIndex(c => c.id === category.id) === index);

  const selectedCategory = props.selectedCategory
    ? props.selectedCategory
    : categories.length > 0
      ? categories[0].id
      : '';

  const items = props.items
    .filter(item => selectedCategory ? item.category === selectedCategory : true)
    .filter(item => props.search ? item.name.toLowerCase().includes(props.search.toLowerCase()) : true);

  return (
    <main className='flex flex-col w-full gap-4 p-4 h-screen overflow-y-auto'>
      <Input
        id='search'
        placeholder='Busque por um item no menu'
        icon={MagnifyingGlassIcon}
        containerClassName='w-3/4 max-w-xl'
        noHighlightOnFocus
        value={props.search}
        onChange={e => props.setSearch(e.target.value)}
      />
      <CategorySelector
        categories={categories}
        selectedCategory={{ id: selectedCategory, name: selectedCategory }}
        onCategoryClick={category => props.setSelectedCategory(category.id)}
      />
      <section className='flex flex-wrap gap-5'>
        {items.map(item => (
          <MenuItem
            key={item.id}
            title={item.name}
            price={item.price}
            image={item.image}
            stars={5}
            onClick={() => props.addToCart(item)}
          />
        ))}
      </section>
    </main>
  );
}

function Cart(props: CartProps): JSX.Element {
  const total = props.cart.reduce((total, entry) => total + entry.price * entry.quantity, 0).toFixed(2);

  async function handleOrder() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const response = await fetch(
      'api/orders',
      { body: JSON.stringify({ items: props.cart, client: user }), method: 'POST' }
    );

    if (response.status !== 201) return toast.error('Erro ao registrar pedido');

    toast.success('Pedido realizado com sucesso!');
    props.clearCart();
  }

  return (
    <section className='flex flex-col w-full h-screen overflow-y-auto gap-5 p-4'>
      <div className='mx-4 mt-2 flex flex-row justify-between'>
        <h1 className=' text-3xl font-bold'>Carrinho</h1>
        {+total > 0 && (
          <span className='flex flex-row items-center justify-center text-base font-bold'>
            <p>Total:</p>
            <p className='mx-2'>R${total}</p>
          </span>
        )}
      </div>
      <div className='flex flex-col w-full gap-5 p-4'>
        {props.cart.map(entry => (
          <CartItem
            key={entry.id}
            category={entry.category}
            name={entry.name}
            price={entry.price}
            image={entry.image}
            quantity={entry.quantity}
            id={entry.id}
            updateQuantity={props.updateQuantity}
            totalAvailable={entry.totalAvailable}
          />
        ))}
      </div>
      {+total > 0 && (
        <div className='w-[200px] ml-[75%]'>
          <Button
            theme='primary'
            label='Finalizar pedido'
            onClick={handleOrder}
          />
        </div>
      )}
    </section>
  );
}
