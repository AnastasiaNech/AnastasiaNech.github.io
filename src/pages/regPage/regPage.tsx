import React, { FC } from 'react';
import { Title } from '../../shared/forms/title/title';
import { SingUpForm } from './singUpForm/singUpForm';

export const RegScreen: FC = () => {
    return (
        <div className="block">
            <div>
                <Title>{'Приложение для контроля доходов/расходов'}</Title>
            </div>
            <div className='vertical'></div>
            <SingUpForm />
        </div>
    );
};
