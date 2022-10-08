import { Fragment } from 'react';

// Types -----------------------------------------------------------------------

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Text to be displayed at the top. **/
  label: string;
  /** Unique string identifier for this input element. **/
  id: string;
  /** Optional error message to be displayed bellow input. **/
  error?: string;
}

// Component -------------------------------------------------------------------

export function Input(props: InputProps): JSX.Element {
  return (
    <div>
      <Label {...props} />
      <input
        className={getInputClassName(props)}
        {...props}
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

function getInputClassName(props: InputProps): string {
  const classes = [
    'bg-white text-gray-400 text-sm',
    'border-2 rounded-lg',
    'block w-full p-2.5',
  ];

  if (props.error)
    classes.push('border-red-500 focus:ring-red-500 focus:border-red-500');
  else
    classes.push('border-gray-200 focus:ring-primary focus:border-primary');

  return classes.join(' ');
}