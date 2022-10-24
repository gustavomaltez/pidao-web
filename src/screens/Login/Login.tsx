import { loginLogo } from '@assets/images';
import { Button, Input } from '@components';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export function LoginScreen(): JSX.Element {
  // Hooks ---------------------------------------------------------------------

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    window.localStorage.clear();
  }, []);

  // Handlers ------------------------------------------------------------------

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email || !password) return toast.error('Preencha todos os campos!');
    const response = await fetch(
      'api/login',
      { body: JSON.stringify({ email, password }), method: 'POST' }
    );
    const data = await response.json();
    if (data.error) return toast.error(data.error);

    toast.success('Usuário autenticado com successo!');
    window.localStorage.setItem('user', JSON.stringify(data.user));
    navigate('/dashboard');
  }

  // Rendering -----------------------------------------------------------------

  return (
    <main className={getMainContainerClassName()}>
      <img src={loginLogo} className="w-16 mx-auto my-4" />
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-4 mx-auto w-full"
      >
        <Input
          id='email'
          type='email'
          label='E-mail'
          placeholder='Insira seu e-mail'
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <Input
          id='password'
          type='password'
          label='Senha'
          placeholder='Insira sua senha'
          value={password}
          onChange={e => setPassword(e.target.value)}
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