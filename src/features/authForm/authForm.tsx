import React, { memo } from 'react';
import { FormInput } from 'src/shared/forms/formInput/formInput';

import { AuthFormProps } from './types';

export const AuthForm = memo<AuthFormProps>(({ formManager, formElement, autoFocusElement, disabled }) => {
    const { values, touched, errors, submitCount, handleBlur, handleSubmit, handleChange } = formManager;

    return (
        <form ref={formElement} onSubmit={handleSubmit}>
            <FormInput
                autoFocusElement={autoFocusElement}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                errors={errors.email}
                submitCount={submitCount}
                touched={touched.email}
                disabled={disabled}
                title="Email"
                nameInput="email"
                type="input"
                placeholder="логин"
            />
            <FormInput
                autoFocusElement={autoFocusElement}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                errors={errors.password}
                submitCount={submitCount}
                touched={touched.password}
                disabled={disabled}
                title="Пароль"
                nameInput="password"
                type="input"
                placeholder="пароль"
            />
        </form>
    );
});

AuthForm.displayName = 'AuthForm';
