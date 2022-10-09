import { Fragment } from 'react';


// Types -----------------------------------------------------------------------

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Text to be displayed inside the button. **/
  label: string;
  /** Button theme. Each different theme applies a different set of styles. **/
  theme: 'primary' | 'secondary';
  /** Optional icon to be displayed at the left/right side of the button. **/
  icon?: (props: React.ComponentProps<'svg'>) => JSX.Element;
  /** Whether the icon should be positioned **/
  iconPosition?: 'left' | 'right';
}

// Component -------------------------------------------------------------------

export function Button(props: ButtonProps): JSX.Element {
  const _props = { ...props };
  delete _props.icon;
  delete _props.iconPosition;

  return (
    <button
      className={getButtonClassName(props)}
      {..._props}
    >
      <Icon {...props} />
      {props.label}
    </button>
  );
}

// Sub-components --------------------------------------------------------------

function Icon(props: ButtonProps): JSX.Element {
  if (!props.icon) return <Fragment />;
  return <props.icon className={getIconClassName(props)} />;
}

// Helpers ---------------------------------------------------------------------

function getIconClassName(props: ButtonProps): string {
  const classes = ['absolute w-5 h-5 -translate-y-2/4 top-2/4'];

  if (props.iconPosition === 'left')
    classes.push('left-4');
  else if (props.iconPosition === 'right')
    classes.push('right-4 ');

  return classes.join(' ');
}

function getButtonClassName(props: ButtonProps): string {
  const classes = [
    'text-sm hover:opacity-95',
    'border-2 rounded-lg',
    'block w-full h-11 relative',
  ];

  if (!props.icon)
    classes.push('px-2');
  if (props.iconPosition === 'left')
    classes.push('pl-4 pr-2');
  else if (props.iconPosition === 'right')
    classes.push('pl-2 pr-4');

  if (props.theme === 'primary')
    classes.push('bg-primary border-primary text-white');
  else if (props.theme === 'secondary')
    classes.push('bg-white border-primary text-primary');

  return classes.join(' ');
}