/* eslint-disable @typescript-eslint/no-empty-function */
import { SideBar } from '@components';
import { ArchiveBoxIcon, HomeIcon, TagIcon } from '@heroicons/react/24/solid';

export function AdminDashboardScreen(): JSX.Element {
  return (
    <section className='h-full'>
      <SideBar
        items={[
          {
            icon: HomeIcon,
            label: 'Inicio',
            isSelected: true,
            onClick: () => { },
          },
          {
            icon: TagIcon,
            label: 'Categorias',
            isSelected: false,
            onClick: () => { },
          },
          {
            icon: ArchiveBoxIcon,
            label: 'Items',
            isSelected: false,
            onClick: () => { },
          }
        ]}
      />
    </section>
  );
}

