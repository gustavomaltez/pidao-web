import { registerLogo } from '@assets/images';
import { Button, Input } from '@components';
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon } from '@heroicons/react/24/solid';
import { Fragment, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Types -----------------------------------------------------------------------

type NavBarState = 'next' | 'both' | 'done';
type Screen = 'main' | 'secondary' | 'address';

interface CurrentScreenProps {
  screen: Screen;
  data: Data;
  setData: (data: Data) => void;
}

interface NavBarProps {
  state: NavBarState;
  onBack: () => void;
  onNext: () => void;
  onDone: () => void;
}

interface Data {
  name: string;
  email: string;
  password: string;
  cpf: string;
  phone: string;
  address: string;
  addressNumber: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  complement: string;
  dateOfBirth: string;
}

// Component -------------------------------------------------------------------

export function RegisterScreen(): JSX.Element {
  // Hooks ---------------------------------------------------------------------

  const navigate = useNavigate();
  const [navBarState, setNavBarState] = useState<NavBarState>('next');
  const [screen, setScreen] = useState<Screen>('main');
  const [data, setData] = useState<Data>({
    name: '',
    email: '',
    password: '',
    cpf: '',
    phone: '',
    address: '',
    addressNumber: '',
    neighborhood: '',
    city: '',
    state: '',
    zipCode: '',
    complement: '',
    dateOfBirth: '',
  });

  // Internal Navigation -------------------------------------------------------

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

  async function onDoneClick() {
    const hasEmptyFields = Object.values(data).some((value) => !value);
    if (hasEmptyFields) return toast.error('Preencha todos os campos!');
    if (data.password.length < 6) return toast.error('A senha deve ter no mínimo 6 caracteres!');
    if (data.cpf.length !== 14) return toast.error('O CPF deve ter 14 caracteres no formato 000.000.000-00!');
    if (data.phone.length !== 15) return toast.error('O telefone deve ter 15 caracteres no formato (00) 00000-0000!');
    if (data.zipCode.length !== 9) return toast.error('O CEP deve ter 9 caracteres no formato 00000-000!');
    if (data.dateOfBirth.length !== 10) return toast.error('A data de nascimento deve ter 10 caracteres no formato 00/00/0000!');
    if (data.email.indexOf('@') === -1) return toast.error('O e-mail deve ter o formato nome@domínio.com!');

    const _data = {
      ...data,
      type: 'client',
    };

    const response = await fetch(
      'api/register',
      { body: JSON.stringify(_data), method: 'POST' }
    );
    const responseData = await response.json();
    if (responseData.error) return toast.error(responseData.error);
    toast.success('Usuário cadastrado com successo!');
    navigate('/dashboard');
  }

  // Rendering -----------------------------------------------------------------

  return (
    <main className={getMainContainerClassName()}>
      <img src={registerLogo} className="w-16 mx-auto my-4" />
      <form
        className="flex flex-col gap-4 mx-auto w-full"
        onSubmit={e => e.preventDefault()}
      >
        <CurrentScreen
          screen={screen}
          data={data}
          setData={setData}
        />
        <NavBar
          state={navBarState}
          onBack={onBackClick}
          onNext={onNextClick}
          onDone={onDoneClick}
        />
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
    return <MainInfos {...props} />;
  else if (props.screen === 'secondary')
    return <SecondaryInfos {...props} />;
  else if (props.screen === 'address')
    return <AddressInfos {...props} />;
  return <Fragment />;
}

function NavBar(props: NavBarProps): JSX.Element {
  return (
    <div className="flex gap-4">
      {['both', 'done'].includes(props.state) && (
        <Button
          theme='primary'
          label='Anterior'
          type='button'
          onClick={props.onBack}
          icon={ArrowLeftIcon}
          iconPosition='left'
        />
      )}
      <Button
        theme='primary'
        label={props.state === 'done' ? 'Registrar' : 'Próximo'}
        onClick={props.state === 'done' ? props.onDone : props.onNext}
        icon={props.state === 'done' ? CheckIcon : ArrowRightIcon}
        iconPosition='right'
      />
    </div>
  );
}

function MainInfos(props: CurrentScreenProps): JSX.Element {
  return (
    <>
      <Input
        id='name'
        type='text'
        label='Nome'
        placeholder='Insira seu nome'
        value={props.data.name}
        onChange={e => props.setData({ ...props.data, name: e.target.value })}
      />
      <Input
        id='email'
        type='email'
        label='E-mail'
        placeholder='Insira seu e-mail'
        value={props.data.email}
        onChange={e => props.setData({ ...props.data, email: e.target.value })}
      />
      <Input
        id='password'
        type='password'
        label='Senha'
        placeholder='Insira sua senha'
        value={props.data.password}
        onChange={e => props.setData({ ...props.data, password: e.target.value })}
      />
    </>
  );
}

function SecondaryInfos(props: CurrentScreenProps): JSX.Element {
  function maskCPF(cpf: string) {
    return cpf
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  }

  function maskPhone(phone: string) {
    return phone
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')
      .replace(/(-\d{4})\d+?$/, '$1');
  }

  return (
    <>
      <Input
        id='cpf'
        type='text'
        label='CPF'
        placeholder='Insira seu CPF'
        value={props.data.cpf}
        minLength={14}
        maxLength={14}
        onChange={e => props.setData({ ...props.data, cpf: maskCPF(e.target.value) })}
      />
      <Input
        id='dateOfBirth'
        type='date'
        label='Data de Nascimento'
        placeholder='Insira sua data de nascimento'
        value={props.data.dateOfBirth}
        onChange={e => props.setData({ ...props.data, dateOfBirth: e.target.value })}
      />
      <Input
        id='phone'
        type='tel'
        label='Telefone'
        placeholder='Insira seu telefone'
        value={props.data.phone}
        minLength={15}
        maxLength={15}
        onChange={e => props.setData({ ...props.data, phone: maskPhone(e.target.value) })}
      />
    </>
  );
}

function AddressInfos(props: CurrentScreenProps): JSX.Element {

  function maskCEP(cep: string) {
    return cep
      .replace(/\D/g, '')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{3})\d+?$/, '$1');
  }

  return (
    <>
      <div className='flex flex-row w-full gap-4'>
        <Input
          id='address'
          type='text'
          label='Endereço'
          placeholder='Insira seu endereço'
          value={props.data.address}
          onChange={e => props.setData({ ...props.data, address: e.target.value })}
        />
        <Input
          id='addressNumber'
          type='number'
          label='Número'
          placeholder='N°'
          containerClassName='w-1/4'
          value={props.data.addressNumber}
          onChange={e => props.setData({ ...props.data, addressNumber: e.target.value })}
        />
      </div>
      <Input
        id='neighborhood'
        type='text'
        label='Bairro'
        placeholder='Insira seu bairro'
        value={props.data.neighborhood}
        onChange={e => props.setData({ ...props.data, neighborhood: e.target.value })}
      />
      <div className='flex flex-row w-full gap-4'>
        <Input
          id='city'
          type='text'
          label='Cidade'
          placeholder='Insira sua cidade'
          value={props.data.city}
          onChange={e => props.setData({ ...props.data, city: e.target.value })}
        />
        <Input
          id='state'
          type='text'
          label='Estado'
          placeholder='Insira seu estado'
          value={props.data.state}
          onChange={e => props.setData({ ...props.data, state: e.target.value })}
        />
      </div>
      <div className='flex flex-row w-full gap-4'>
        <Input
          id='zipCode'
          type='text'
          label='CEP'
          placeholder='Insira seu CEP'
          containerClassName='w-2/5'
          value={props.data.zipCode}
          onChange={e => props.setData({ ...props.data, zipCode: maskCEP(e.target.value) })}
        />
        <Input
          id='complement'
          type='text'
          label='Complemento'
          placeholder='Insira seu complemento'
          value={props.data.complement}
          onChange={e => props.setData({ ...props.data, complement: e.target.value })}
        />
      </div>
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