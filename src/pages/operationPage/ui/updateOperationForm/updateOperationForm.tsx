import React, { FC, memo, useMemo } from 'react';
import { type FormikConfig, useFormik } from 'formik';
import { Button } from 'antd';
import { useMutation } from '@apollo/client';
import { Mutation, OperationType, OperationUpdateInput } from '../../../../graphql.types';
import { profileSelector } from '../../../../entities/profileSlice';
import { useSelector } from 'react-redux';
import { GET_OPERATIONS, UPDATE_OPERATIONS } from 'src/connection/fragments';
import { isNotDefinedString } from 'src/shared/forms/validation';
import { Title } from 'src/shared/forms/title/title';
import { OperationForm } from 'src/shared/forms/formOperation/formOperation';
import { OperationFormErrors, OperationFormValues } from '../types';
import '../updateOperationForm/updateOperationForm.css';

export type AddBodyVariables = {
  id: string;
  input: OperationUpdateInput;
};

interface ModalProps {
  id: string;
  onClose?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UpdateOperationForm: FC<ModalProps> = memo(({ id, onClose }) => {
  const [put, { loading, error }] = useMutation<Pick<Mutation, 'operations'>, AddBodyVariables>(UPDATE_OPERATIONS);
  const { costList } = useSelector(profileSelector);

  const { onSubmit, validate, initialValues } = useMemo<
    Pick<FormikConfig<OperationFormValues>, 'onSubmit' | 'validate' | 'initialValues'>
  >(() => {
    const costValue = costList.find((x) => x.id == id);
    return {
      initialValues: {
        name: costValue.name,
        cost: costValue.amount,
        description: costValue.desc,
      },
      onSubmit: (values) => {
        put({
          variables: {
            id: id,
            input: {
              amount: values.cost,
              desc: values.description,
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
  }, [costList]);

  const formManager = useFormik<OperationFormValues>({
    initialValues,
    onSubmit,
    validate,
  });

  const { submitForm } = formManager;

  return (
    <div className="modalUpdate">
      <Title className="title">{'Редактировать операцию'}</Title>
      <OperationForm formManager={formManager} isUpdate={true} />
      <div>
        <Button type="primary" onClick={submitForm}>
          {'Сохранить'}
        </Button>
      </div>
    </div>
  );
});

UpdateOperationForm.displayName = 'UpdateOperationForm';
