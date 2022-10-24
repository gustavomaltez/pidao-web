import { ShoppingCartIcon, StarIcon } from '@heroicons/react/24/solid';
import { Button } from 'components/Button/Button';

// Types -----------------------------------------------------------------------

interface MenuItemProps {
  title: string;
  stars: number;
  price: number;
  image: string;
  onClick: () => void;
}

// Component -------------------------------------------------------------------

export function MenuItem(props: MenuItemProps): JSX.Element {
  return (
    <div className='p-2 rounded-md border-gray-200 border-2 max-w-[232px] bg-gray-100'>
      <img
        src={props.image}
        alt={props.title}
        className='w-full h-40 object-cover rounded-md'
      />
      <div className='flex flex-row justify-between py-2'>
        <p className='w-full'>{props.title}</p>
        <span className='flex justify-center items-center gap-2'>
          <p>{props.stars}</p>
          <StarIcon className='w-5 h-5 text-yellow-300' />
        </span>
      </div>
      <p className='text-base mb-2 font-bold'>R${props.price}</p>
      <Button
        theme='primary'
        icon={ShoppingCartIcon}
        iconPosition='right'
        label='Adicionar ao carrinho'
      />
    </div>
  );
}