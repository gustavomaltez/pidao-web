// Types -----------------------------------------------------------------------

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Text to be displayed inside the button. **/
  label: string;
  /** Button theme. Each different theme applies a different set of styles. **/
  theme: 'primary' | 'secondary';
}

// Component -------------------------------------------------------------------

export function Button(props: ButtonProps): JSX.Element {
  return (
    <button
      className={getButtonClassName(props)}
      {...props}
    >
      {props.label}
    </button>
  );
}

// Helpers ---------------------------------------------------------------------

function getButtonClassName(props: ButtonProps): string {
  const classes = [
    'text-sm hover:opacity-95',
    'border-2 rounded-lg',
    'block w-full px-2 h-11',
  ];

  if (props.theme === 'primary')
    classes.push('bg-primary border-primary text-white');
  else if (props.theme === 'secondary')
    classes.push('bg-white border-primary text-primary');

  return classes.join(' ');
}