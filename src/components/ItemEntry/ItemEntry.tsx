import { Button, Input } from '@components';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { toast } from 'react-toastify';

// Types -----------------------------------------------------------------------

interface ItemData {
  name: string;
  price: number;
  quantity: number;
  category: string;
  image: string;
  id: string;
}

interface ItemEntryProps extends ItemData {
  refresh: () => void;
}

// Component -------------------------------------------------------------------

export function ItemEntry(props: ItemEntryProps): JSX.Element {
  const [item, setItem] = useState<ItemData>(props);

  async function updateItem() {
    const hasEmptyFields = Object.values(item).some((value) => value === '' || value === 0);
    if (hasEmptyFields) return toast.error('Todos os campos devem ser preenchidos');
    const id = +item.id;
    if (isNaN(id)) {
      const response = await fetch('api/items', { body: JSON.stringify(item), method: 'POST' });
      const data = await response.json();
      const newItem = data.items.find((x: ItemData) => x.name === item.name && x.price === item.price && x.quantity === item.quantity && x.category === item.category && x.image === item.image);
      toast.success('Item criado com sucesso');
      setItem(newItem);
    } else {
      await fetch(`api/items/${id}`, { body: JSON.stringify(item), method: 'PUT' });
      toast.success('Item atualizado com sucesso');
    }
  }

  function deleteItem() {
    const id = +item.id;
    if (isNaN(id)) return props.refresh();
    const confirmed = confirm('Tem certeza que deseja deletar este item?');
    if (!confirmed) return;
    fetch(`api/items/${item.id}`, { method: 'DELETE' });
    toast.success('Item deletado com sucesso');
    props.refresh();
  }

  return (
    <div className='flex flex-row items-center justify-center w-full p-2 pt-6 rounded-md border-gray-200 border-2 bg-gray-100 max-h-96 relative'>
      <button
        className='absolute top-2 right-2 text-sm hover:opacity-95 border-2 rounded-lg bg-primary border-primary text-white cursor-pointer'
        onClick={deleteItem}
      >
        <XMarkIcon className='h-6 w-6' />
      </button>
      <img
        src={item.image}
        alt={item.name}
        className='h-80 w-80 object-cover rounded-md mx-auto'
      />
      <div className='flex flex-col ml-4 gap-4 w-3/4'>
        <Input
          label="URL da imagem"
          id="image"
          type="text"
          placeholder="https://"
          value={item.image}
          onChange={(event) => setItem({ ...item, image: event.target.value })}
        />
        <div className='grid grid-cols-2 gap-5'>
          <Input
            label="Nome"
            id="name"
            type="text"
            value={item.name}
            onChange={(event) => setItem({ ...item, name: event.target.value })}
          />
          <Input
            label="Preço"
            id="price"
            type="number"
            min={1}
            value={item.price}
            onChange={(event) => setItem({ ...item, price: Number(event.target.value) })}
          />
          <Input
            label="Quantidade"
            id="quantity"
            type="number"
            min={1}
            value={item.quantity}
            onChange={(event) => setItem({ ...item, quantity: Number(event.target.value) })}
          />
          <Input
            label="Categoria"
            id="category"
            type="text"
            value={item.category}
            onChange={(event) => setItem({ ...item, category: event.target.value })}
          />
        </div>
        <Button
          label='Salvar'
          theme='primary'
          onClick={updateItem}
        />
      </div>
    </div>
  );
}