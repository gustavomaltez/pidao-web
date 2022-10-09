import { Button, Input } from '@components';
import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

import logo from './images/logo.png';

// Types -----------------------------------------------------------------------

type NavBarState = 'next' | 'both' | 'done';
type Screen = 'main' | 'secondary' | 'address';

interface CurrentScreenProps {
  screen: Screen;
}

interface NavBarProps {
  state: NavBarState;
  onBack: () => void;
  onNext: () => void;
}

// Component -------------------------------------------------------------------

export function RegisterScreen(): JSX.Element {
  const [navBarState, setNavBarState] = useState<NavBarState>('next');
  const [screen, setScreen] = useState<Screen>('main');

  function onNextClick(): void {
    if (screen === 'main') {
      setScreen('secondary');
      setNavBarState('both');
    } else if (screen === 'secondary') {
      setScreen('address');
      setNavBarState('done');
    }
  }

  function onBackClick(): void {
    if (screen === 'secondary') {
      setScreen('main');
      setNavBarState('next');
    } else if (screen === 'address') {
      setScreen('secondary');
      setNavBarState('both');
    }
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
  }

  return (
    <main className={getMainContainerClassName()}>
      <img src={logo} className="w-16 mx-auto my-4" />
      <form
        className="flex flex-col gap-4 mx-auto w-full"
        onSubmit={onSubmit}
      >
        <CurrentScreen screen={screen} />
        <NavBar state={navBarState} onBack={onBackClick} onNext={onNextClick} />
        <p className='text-center'>
          Já possi um cadastro? {' '}
          <Link
            className='text-primary opacity-85 hover:opacity-100'
            to="/login"
          >
            Fazer Login
          </Link>
        </p>
      </form>
    </main>
  );
}

// Sub-components --------------------------------------------------------------

function CurrentScreen(props: CurrentScreenProps): JSX.Element {
  if (props.screen === 'main')
    return <MainInfos />;
  else if (props.screen === 'secondary')
    return <SecondaryInfos />;
  else if (props.screen === 'address')
    return <AddressInfos />;
  return <Fragment />;
}

function NavBar(props: NavBarProps): JSX.Element {
  return (
    <div className="flex gap-4">
      {['both', 'done'].includes(props.state) && (
        <Button theme='primary' label='Anterior' type='button' onClick={props.onBack} />
      )}
      <Button
        theme='primary'
        label={props.state === 'done' ? 'Registrar' : 'Próximo'}
        type={props.state === 'done' ? 'submit' : 'button'}
        onClick={props.onNext}
      />
    </div>
  );
}

function MainInfos(): JSX.Element {
  return (
    <>
      <Input
        id='name'
        type='text'
        label='Nome'
        placeholder='Insira seu nome'
      />
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
    </>
  );
}

function SecondaryInfos(): JSX.Element {
  return (
    <>
      <Input
        id='cpf'
        type='text'
        label='CPF'
        placeholder='Insira seu CPF'
      />
      <Input
        id='dateOfBirth'
        type='date'
        label='Data de Nascimento'
        placeholder='Insira sua data de nascimento'
      />
      <Input
        id='phone'
        type='tel'
        label='Telefone'
        placeholder='Insira seu telefone'
      />
    </>
  );
}

function AddressInfos(): JSX.Element {
  return (
    <>
      <div className='flex flex-row w-full gap-4'>
        <Input
          id='address'
          type='text'
          label='Endereço'
          placeholder='Insira seu endereço'
        />
        <Input
          id='addressNumber'
          type='number'
          label='Número'
          placeholder='Número'
          containerClassName='w-1/4'
        />
      </div>
      <Input
        id='neighborhood'
        type='text'
        label='Bairro'
        placeholder='Insira seu bairro'
      />
      <div className='flex flex-row w-full gap-4'>
        <Input
          id='city'
          type='text'
          label='Cidade'
          placeholder='Insira sua cidade'
        />
        <Input
          id='state'
          type='text'
          label='Estado'
          placeholder='Insira seu estado'
        />
      </div>

      <Input
        id='zipCode'
        type='text'
        label='CEP'
        placeholder='Insira seu CEP'
      />
      <Input
        id='complement'
        type='text'
        label='Complemento'
        placeholder='Insira seu complemento'
      />
    </>
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