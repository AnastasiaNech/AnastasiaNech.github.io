import React, { memo, useMemo } from 'react';
import { FormikConfig, useFormik } from 'formik';
import { Button } from 'antd';
import { useMutation } from '@apollo/client';
import { Mutation } from '../../../graphql.types';
import { SING_IN } from '../../../connection/fragments';
import { isNotDefinedString } from '../../../shared/forms/validation';
import { profileActions } from '../../../entities/profileSlice';
import { storage } from '../../../utils/storage';
import { AuthFormErrors, AuthFormValues } from '../../../features/authForm/types';
import { useDispatch } from '../../../store/useDispatch';

import { AuthForm } from '../../../features/authForm/authForm';
import { useNavigate } from 'react-router';
import { Title } from '../../../shared/forms/title/title';

export type SignInBodyVariables = {
    email: string;
    password: string;
};

export const SingInForm = memo(() => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [signin, { loading, error }] = useMutation<Pick<Mutation, 'profile'>, SignInBodyVariables>(SING_IN);

    const { onSubmit, validate, initialValues } = useMemo<
        Pick<FormikConfig<AuthFormValues>, 'onSubmit' | 'validate' | 'initialValues'>
    >(() => {
        return {
            initialValues: {
                email: undefined,
                password: undefined,
            },
            onSubmit: (values, { setErrors }) => {
                signin({
                    variables: { email: values.email, password: values.password },
                })
                    .then((res) => {
                        dispatch(profileActions.setToken(res.data.profile.signin.token));
                        storage.set('token', res.data.profile.signin.token);
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
    }, [dispatch]);

    const formManager = useFormik<AuthFormValues>({
        initialValues,
        onSubmit,
        validate,
    });

    const { submitForm } = formManager;

    return (
        <div>
            <Title classTitle="title">{'Вход в систему'}</Title>
            <AuthForm formManager={formManager} />
            <div>
                <Button type="primary" onClick={submitForm}>
                    {'Войти'}
                </Button>
            </div>
        </div>
    );
});

SingInForm.displayName = 'SingInForm';
