import { Button, Input } from '@components';
import { Link, useNavigate } from 'react-router-dom';

import logo from './images/logo.png';

export function LoginScreen(): JSX.Element {
  // Hooks ---------------------------------------------------------------------

  const navigate = useNavigate();

  // Handlers ------------------------------------------------------------------

  function onSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    // ToDo: add logic to login
    navigate('/dashboard');
  }

  // Rendering -----------------------------------------------------------------

  return (
    <main className={getMainContainerClassName()}>
      <img src={logo} className="w-16 mx-auto my-4" />
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-4 mx-auto w-full"
      >
        <Input
          id='email'
          type='email'
          label='E-mail'
          placeholder='Insira seu e-mail'
        />
        <Input
          id='password'
          type='password'
          label='Senha'
          placeholder='Insira sua senha'
        />
        <Button
          theme='primary'
          label='Entrar'
          type='submit'
        />
        <p className='text-center'>
          Sua primeira vez aqui? {' '}
          <Link
            className='text-primary opacity-85 hover:opacity-100'
            to="/register"
          >
            Realizar Cadastro
          </Link>
        </p>
      </form>
    </main>
  );
}

// Helpers ---------------------------------------------------------------------

function getMainContainerClassName(): string {
  const classes = [
    'flex flex-col items-center justify-center',
    'bg-white rounded-lg',
    'absolute -translate-y-2/4 -translate-x-2/4 left-2/4 top-2/4',
    'max-w-xl w-[90vw] p-4'
  ];
  return classes.join(' ');
}