import React, { memo, useMemo } from 'react';
import { FormikConfig, useFormik } from 'formik';
import { Button } from 'antd';
import { useMutation } from '@apollo/client';
import { Mutation } from '../../../graphql.types';
import { profileActions } from '../../../entities/profileSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { storage } from '../../../utils/storage';
import { isNotDefinedString } from '../../../shared/forms/validation';
import { AuthFormErrors, AuthFormValues } from '../../../features/authForm/types';
import { SING_UP } from '../../../connection/fragments';
import { Title } from '../../../shared/forms/title/title';
import { AuthForm } from '../../../features/authForm/authForm';

export type SignUpBodyVariables = {
    commandId: string;
    email: string;
    password: string;
};

export const SingUpForm = memo(() => {
    const [signup, { loading, error }] = useMutation<Pick<Mutation, 'profile'>, SignUpBodyVariables>(SING_UP);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { onSubmit, validate, initialValues } = useMemo<
        Pick<FormikConfig<AuthFormValues>, 'onSubmit' | 'validate' | 'initialValues'>
    >(() => {
        return {
            initialValues: {
                commandId: undefined,
                email: undefined,
                password: undefined,
            },
            onSubmit: (values, { setErrors }) => {
                signup({
                    variables: { commandId: '1', email: values.email, password: values.password },
                })
                    .then((res) => {
                        dispatch(profileActions.setToken(res.data.profile.signup.token));
                        storage.set('token', res.data.profile.signup.token);
                        navigate('/profile');
                    })
                    .catch((err) => console.error(err));
            },
            validate: (values) => {
                const errors = {} as AuthFormErrors;
                if (isNotDefinedString(values.email)) {
                    errors.email = 'Обязательно для заполнения';
                } else if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(values.email)) {
                    errors.email = 'Значение указано некорректно';
                }
                if (isNotDefinedString(values.password)) {
                    errors.password = 'Обязательно для заполнения';
                } else if (
                    !/^((?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,32})$/.test(values.password)
                ) {
                    errors.password =
                        'Пароль должен содержать строчные и прописные латинские буквы, цифры, спецсимволы (!@#$%^&*). Минимум 6 и максимум 32 символов';
                }
                return errors;
            },
        };
    }, []);

    const formManager = useFormik<AuthFormValues>({
        initialValues,
        onSubmit,
        validate,
    });

    const { submitForm } = formManager;

    return (
        <div>
            <Title classTitle="title">{'Регистрация'}</Title>
            <AuthForm formManager={formManager} />
            <div>
                <Button type="primary" onClick={submitForm}>
                    {'Зарегистрироваться'}
                </Button>
            </div>
        </div >
    );
});

SingUpForm.displayName = 'SingUpForm';