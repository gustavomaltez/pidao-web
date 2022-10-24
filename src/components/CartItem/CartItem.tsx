import { Input } from 'components/Input/Input';
import { useState } from 'react';


// Types -----------------------------------------------------------------------

interface CartItemProps {
  id: number;
  category: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  totalAvailable: number;
  updateQuantity: (item: Omit<CartItemProps, 'updateQuantity'>, quantity: number) => void;
}

// Component -------------------------------------------------------------------

export function CartItem(props: CartItemProps): JSX.Element {
  const [quantity, setQuantity] = useState<number>(props.quantity);

  function updateQuantity(event: React.ChangeEvent<HTMLInputElement>) {
    setQuantity(Number(event.target.value));
    props.updateQuantity(props, Number(event.target.value));
  }

  return (
    <div className='grid grid-cols-5 items-center p-2 rounded-md border-gray-200 border-2 bg-gray-100'>
      <img
        src={props.image}
        alt={props.name}
        className='h-16 w-16 object-cover rounded-md'
      />
      <p>{props.name}</p>
      <p>{props.category}</p>
      <Input
        id='name'
        type='number'
        min={0}
        max={props.totalAvailable}
        value={quantity}
        onChange={updateQuantity}
        containerClassName='w-20'
      />
      <p>R${(props.price * props.quantity).toFixed(2)}</p>
    </div>
  );
}