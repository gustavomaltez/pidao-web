import { Fragment } from 'react';

// Types -----------------------------------------------------------------------

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Text to be displayed at the top. **/
  label?: string;
  /** Unique string identifier for this input element. **/
  id: string;
  /** Optional error message to be displayed bellow input. **/
  error?: string;
  /** Optional extra classnames to apply to Input container. **/
  containerClassName?: string;
  /** Optional icon to be displayed at the left/right side of the button. **/
  icon?: (props: React.ComponentProps<'svg'>) => JSX.Element;
  /** Whether the border should not be highlighted once the user focus on input. **/
  noHighlightOnFocus?: boolean;
}

// Component -------------------------------------------------------------------

export function Input(props: InputProps): JSX.Element {
  const _props = { ...props };
  delete _props.containerClassName;

  return (
    <div className={getContainerClassName(props)}>
      <Label {...props} />
      {props.icon && <props.icon className="absolute w-5 h-5 -translate-y-2/4 top-2/4 left-4 text-gray-400" />}
      <input
        {..._props}
        className={getInputClassName(props)}
      />
      <Error {...props} />
    </div>
  );
}

// Sub-components ---------------------------------------------------------------

function Label(props: InputProps): JSX.Element {
  if (!props.label) return <Fragment />;
  return (
    <label
      id={props.id}
      className="block mb-2 text-sm font-medium text-gray-900"
    >
      {props.label}
    </label>
  );
}

function Error(props: InputProps): JSX.Element {
  if (!props.error) return <Fragment />;
  return (
    <p className="text-red-500">{props.error}</p>
  );
}

// Helpers ---------------------------------------------------------------------

function getContainerClassName(props: InputProps): string {
  const classes = ['w-full relative'];
  if (props.containerClassName)
    classes.push(props.containerClassName);
  if (props.icon)
    classes.push('h-11');
  return classes.join(' ');
}

function getInputClassName(props: InputProps): string {
  const classes = [
    'bg-white text-gray-400 text-sm',
    'border-2 rounded-lg',
    'block w-full p-2.5',
  ];

  if (props.className)
    classes.push(props.className);
  if (props.icon)
    classes.push('pl-11');

  const focusClassName = props.error ? 'focus:ring-red-500 focus:border-red-500' : 'focus:ring-primary focus:border-primary';

  if (props.error)
    classes.push(`border-red-500 ${props.noHighlightOnFocus ? '' : focusClassName}`);
  else
    classes.push(`border-gray-200 ${props.noHighlightOnFocus ? '' : focusClassName}`);

  return classes.join(' ');
}