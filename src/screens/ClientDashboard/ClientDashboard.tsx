/* eslint-disable @typescript-eslint/no-empty-function */
import { CategorySelector, Input, MenuItem, SideBar } from '@components';
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
  incrementQuantity: (item: Item) => void;
  decrementQuantity: (item: Item) => void;
}

// Component -------------------------------------------------------------------

export function ClientDashboardScreen(): JSX.Element {
  const [items, setItems] = useState<Item[]>([]);
  const [cart, setCart] = useState<CartEntry[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [selectedView, setSelectedView] = useState<'menu' | 'cart'>('menu');

  useEffect(() => {
    async function fetchItems() {
      const response = await fetch('api/items', { method: 'GET' });
      const data = await response.json();
      setItems(data.items);
    }

    fetchItems();
  }, []);

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
          incrementQuantity={item => {
            const entry = cart.find(entry => entry.id === item.id);
            if (entry) {
              entry.quantity += 1;
              setCart([...cart]);
              toast.success(`Mais um "${item.name}" adicionado ao carrinho! Total de ${entry.quantity} itens.`);
            }
          }}
          decrementQuantity={item => {
            const entry = cart.find(entry => entry.id === item.id);
            if (entry) {
              entry.quantity -= 1;
              if (entry.quantity === 0) {
                setCart(cart.filter(entry => entry.id !== item.id));
                toast.success(`${item.name} removido do carrinho!`);
              } else {
                setCart([...cart]);
                toast.success(`Um "${item.name}" removido do carrinho! Total de ${entry.quantity} itens.`);
              }
            }
          }}
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
  return (
    <div>
      {JSON.stringify(props.cart)}
    </div>
  );
}
