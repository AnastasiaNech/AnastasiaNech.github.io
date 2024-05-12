import React, { FC, memo, useContext, useMemo } from 'react';
import { type FormikConfig, useFormik } from 'formik';
import { useMutation } from '@apollo/client';
import { Mutation, OperationAddInput, OperationType } from '../../../../graphql.types';
import { ADD_OPERATIONS, GET_OPERATIONS } from 'src/connection/fragments';
import { isNotDefinedString } from 'src/shared/forms/validation';
import { Title } from 'src/shared/forms/title/title';
import { Button } from 'antd';
import { useOperation } from 'src/app/lib/useOperation';
import { OperationForm } from 'src/shared/forms/formOperation/formOperation';
import { OperationFormErrors, OperationFormValues } from '../types';

import '../createOperationForm/createOperationForm.css';

export type AddBodyVariables = {
    input: OperationAddInput;
};

interface CreateOperationProps {
    onClose?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CreateOperationForm: FC<CreateOperationProps> = memo(({ onClose }) => {
    const [add, { loading, error }] = useMutation<Pick<Mutation, 'operations'>, AddBodyVariables>(ADD_OPERATIONS);
    const { category } = useOperation();
    const { initialValues, onSubmit, validate } = useMemo<
        Pick<FormikConfig<OperationFormValues>, 'onSubmit' | 'validate' | 'initialValues'>
    >(() => {
        return {
            initialValues: {
                name: '',
                cost: 0,
                category: '',
                description: '',
            },
            onSubmit: (values) => {
                add({
                    variables: {
                        input: {
                            amount: values.cost,
                            desc: values.description,
                            categoryId: category.id,
                            date: new Date(),
                            type: OperationType.Cost,
                            name: values.name,
                        },
                    },
                    refetchQueries: [{ query: GET_OPERATIONS }],
                })
                    .then((res) => onClose(false))
                    .catch((err) => console.error(err));
            },
            validate: (values) => {
                const errors = {} as OperationFormErrors;
                if (isNotDefinedString(values.name)) {
                    errors.name = 'Обязательно для заполнения';
                }
                return errors;
            },
        };
    }, [category]);

    const formManager = useFormik<OperationFormValues>({
        initialValues,
        onSubmit,
        validate,
    });

    const { submitForm } = formManager;

    return (
        <div className='modalCreate'>
            <Title classTitle="titleModal">{'Создать операцию'}</Title>
            <OperationForm formManager={formManager} />
            <div>
                <Button type="primary" onClick={submitForm}>
                    {'Сохранить'}
                </Button>
            </div>
        </div >
    );
});

CreateOperationForm.displayName = 'CreateOperationForm';