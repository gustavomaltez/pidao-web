/* eslint-disable @typescript-eslint/no-empty-function */
import { Input, SideBar } from '@components';
import { HomeIcon, MagnifyingGlassIcon, ShoppingCartIcon } from '@heroicons/react/24/solid';

export function ClientDashboardScreen(): JSX.Element {
  return (
    <section className='flex flex-row h-full'>
      <SideBar
        items={[
          {
            icon: HomeIcon,
            label: 'Inicio',
            isSelected: true,
            onClick: () => { },
          },
          {
            icon: ShoppingCartIcon,
            label: 'Carrinho',
            isSelected: false,
            onClick: () => { },
          },
        ]}
      />
      <main className='flex w-full '>
        <Input
          id='search'
          placeholder='Busque por um item no menu'
          icon={MagnifyingGlassIcon}
          containerClassName='m-4 w-3/4 max-w-xl'
          noHighlightOnFocus
        />
      </main>
    </section>
  );
}

