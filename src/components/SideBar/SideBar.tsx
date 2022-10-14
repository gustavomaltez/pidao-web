import { logo } from '@assets/images';

// Types -----------------------------------------------------------------------

type SideBarItem = {
  /** Text to be displayed under the option. **/
  label: string;
  /** Icon to be displayed at the left side of the option. **/
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  /** Callback method to be executed once the option is clicked.. **/
  onClick: () => void;
  /** Whether the option is selected or not.. **/
  isSelected: boolean;
};

interface SideBarProps {
  /** List of items to be rendered on the sidebar.. **/
  items: SideBarItem[];
}

// Component -------------------------------------------------------------------

export function SideBar(props: SideBarProps): JSX.Element {
  return (
    <nav
      className='bg-gray-200 w-max h-full p-8 text-2xl'
    >
      <img src={logo} className='mb-10 w-48' />
      <div className='flex flex-col gap-5'>
        {props.items.map(item => <Item key={item.label} {...item} />)}
      </div>
    </nav>
  );
}

// Sub-components --------------------------------------------------------------

function Item(props: SideBarItem): JSX.Element {
  return (
    <button
      onClick={props.onClick}
      className={getItemClassName(props)}
    >
      <props.icon className={getIconClassName(props)} />
      <span className='group-hover:text-primary'>{props.label}</span>
    </button>
  );
}

// Helpers ---------------------------------------------------------------------

function getItemClassName(props: SideBarItem): string {
  const classes = ['flex items-center w-min group'];

  if (props.isSelected)
    classes.push('text-primary');

  return classes.join(' ');
}

function getIconClassName(props: SideBarItem): string {
  const classes = ['w-6 h-6 mr-4 group-hover:text-primary'];

  if (props.isSelected)
    classes.push('text-primary');

  return classes.join(' ');
}