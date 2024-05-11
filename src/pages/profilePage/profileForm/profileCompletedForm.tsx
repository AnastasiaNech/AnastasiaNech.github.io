import React, { memo, useMemo } from 'react';
import { FormikConfig, useFormik } from 'formik';

import { useMutation, useQuery } from '@apollo/client';
import { Mutation, UpdateProfileInput } from '../../../graphql.types';
import { EDIT_PROFILE, GET_PROFILE } from '../../../connection/fragments';
import { ProfileFormErrors, ProfileFormValues } from 'src/features/profileForm/types';
import { isNotDefinedString } from 'src/shared/forms/validation';
import { ProfileForm } from 'src/features/profileForm/profileForm';
import { Button } from 'antd';


export type ProfileCompletedBodyVariables = {
    input: UpdateProfileInput;
};

export type ProfileCompletedFormProps = {
    className?: string;
};

export const ProfileCompletedForm = memo<ProfileCompletedFormProps>(() => {
    const { data } = useQuery(GET_PROFILE);
    const [editProfile, { loading, error }] = useMutation<Pick<Mutation, 'profile'>, ProfileCompletedBodyVariables>(EDIT_PROFILE);

    const { onSubmit, validate, initialValues } = useMemo<
        Pick<FormikConfig<ProfileFormValues>, 'onSubmit' | 'validate' | 'initialValues'>
    >(() => {
        return {
            initialValues: {
                name: '',
                email: '',
            },
            onSubmit: (values) => {
                editProfile({
                    variables: {
                        input: { name: values.name },
                    },
                });
            },
            validate: (values) => {
                const errors = {} as ProfileFormErrors;
                if (isNotDefinedString(values.name)) {
                    errors.name = 'Обязательно для заполнения';
                } else if (!/^[_a-zа-я0-9-]{7,}$/i.test(values.name)) {
                    errors.name = 'Значение указано некорректно. Не менее 7 символов.';
                }
                return errors;
            },
        };
    }, [data]);

    const formManager = useFormik<ProfileFormValues>({
        initialValues,
        onSubmit,
        validate,
    });
    const { submitForm } = formManager;

    return (
        <div className="root">
            <div>
                <h3>Профиль</h3>
                <div>имя: {data ? data.profile.name : ''}</div>
                <div>почта: {data ? data.profile.email : ''}</div>
            </div>
            <h3>Редактировать имя профиля</h3>
            <ProfileForm formManager={formManager} />
            <div>
                <Button type="primary" onClick={submitForm}>
                    {'Сохранить'}
                </Button>
            </div>
        </div>
    );
});

ProfileCompletedForm.displayName = 'ProfileCompletedForm';
