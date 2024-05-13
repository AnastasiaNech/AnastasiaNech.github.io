import React, { FC, memo, useContext, useMemo } from 'react';
import { type FormikConfig, useFormik } from 'formik';
import { useMutation } from '@apollo/client';
import { CategoryAddInput, Mutation } from '../../../../graphql.types';
import { ADD_CATEGORIES, GET_OPERATIONS } from 'src/connection/fragments';
import { isNotDefinedString } from 'src/shared/forms/validation';
import { Title } from 'src/shared/forms/title/title';
import { Button } from 'antd';
import { useOperation } from 'src/app/lib/useOperation';
import { CategoryFormErrors, CategoryFormValues } from '../../types';
import { CategoryForm } from 'src/shared/forms/formCategory/formCategory';

export type AddCategoryBodyVariables = {
    input: CategoryAddInput;
};

interface CreateCategoryProps {
    onClose?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CreateCategoryForm: FC<CreateCategoryProps> = memo(({ onClose }) => {
    const [add, { loading, error }] = useMutation<Pick<Mutation, 'categories'>, AddCategoryBodyVariables>(ADD_CATEGORIES);
    const { category } = useOperation();
    const { initialValues, onSubmit, validate } = useMemo<
        Pick<FormikConfig<CategoryFormValues>, 'onSubmit' | 'validate' | 'initialValues'>
    >(() => {
        return {
            initialValues: {
                name: '',
            },
            onSubmit: (values) => {
                add({
                    variables: {
                        input: {
                            name: values.name,
                        },
                    },
                    refetchQueries: [{ query: GET_OPERATIONS }],
                })
                    .then((res) => onClose(false))
                    .catch((err) => console.error(err));
            },
            validate: (values) => {
                const errors = {} as CategoryFormErrors;
                if (isNotDefinedString(values.name)) {
                    errors.name = 'Обязательно для заполнения';
                }
                return errors;
            },
        };
    }, [category]);

    const formManager = useFormik<CategoryFormValues>({
        initialValues,
        onSubmit,
        validate,
    });

    const { submitForm } = formManager;

    return (
        <div className='modalCreate'>
            <Title classTitle="titleModal">{'Создать категорию'}</Title>
            <CategoryForm formManager={formManager} />
            <div>
                <Button type="primary" onClick={submitForm}>
                    {'Сохранить'}
                </Button>
            </div>
        </div >
    );
});

CreateCategoryForm.displayName = 'CreateCategoryForm';