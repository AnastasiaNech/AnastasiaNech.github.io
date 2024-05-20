import React, { FC, memo, useMemo } from 'react';
import { type FormikConfig, useFormik } from 'formik';
import { Button } from 'antd';
import { useMutation } from '@apollo/client';
import { CategoryUpdateInput, Mutation, OperationType, OperationUpdateInput } from '../../../../graphql.types';
import { profileSelector } from '../../../../entities/profileSlice';
import { useSelector } from 'react-redux';
import { GET_CATEGORIES, GET_OPERATIONS, UPDATE_CATEGORIES, UPDATE_OPERATIONS } from 'src/connection/fragments';
import { isNotDefinedString } from 'src/shared/forms/validation';
import { Title } from 'src/shared/forms/title/title';
import '../updateCategory/updateCategory.css';
import { CategoryForm } from 'src/shared/forms/formCategory/formCategory';
import { CategoryFormErrors, CategoryFormValues } from '../../types';

export type AddBodyVariables = {
  id: string;
  input: CategoryUpdateInput;
};

interface ModalProps {
  id: string;
  onClose?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UpdateCategoryForm: FC<ModalProps> = memo(({ id, onClose }) => {
  const [put, { loading, error }] = useMutation<Pick<Mutation, 'operations'>, AddBodyVariables>(UPDATE_CATEGORIES);
  const { categoryList } = useSelector(profileSelector);

  const { onSubmit, validate, initialValues } = useMemo<
    Pick<FormikConfig<CategoryFormValues>, 'onSubmit' | 'validate' | 'initialValues'>
  >(() => {
    const costValue = categoryList.find((x) => x.id == id);
    return {
      initialValues: {
        name: costValue.name,
      },
      onSubmit: (values) => {
        put({
          variables: {
            id: id,
            input: {
              name: values.name,
            },
          },
          refetchQueries: [{ query: GET_CATEGORIES }],
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
  }, [categoryList]);

  const formManager = useFormik<CategoryFormValues>({
    initialValues,
    onSubmit,
    validate,
  });

  const { submitForm } = formManager;

  return (
    <div className="modalUpdate">
      <Title className="title">{'Редактировать категорию'}</Title>
      <CategoryForm formManager={formManager} isUpdate={true} />
      <div>
        <Button type="primary" onClick={submitForm}>
          {'Сохранить'}
        </Button>
      </div>
    </div>
  );
});

UpdateCategoryForm.displayName = 'UpdateCategoryForm';
