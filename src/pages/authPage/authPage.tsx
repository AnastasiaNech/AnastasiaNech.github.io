import React, { FC } from 'react';
import { Title } from 'src/shared/forms/title/title';
import { SingInForm } from './singInForm/singInForm';
import { Link } from 'react-router-dom';

export const AuthPage: FC = () => {
  return (
    <div className="block">
      <div>
        <Title>{'Приложение для контроля доходов/расходов'}</Title>
        <Link to="/regustration">{'Зарегистрироваться'}</Link>
      </div>
      <div className="vertical"></div>
      <SingInForm />
    </div>
  );
};
