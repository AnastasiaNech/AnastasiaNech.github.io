import React, { FC, useState, useEffect, useContext } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';
import { profileActions } from '../../entities/profileSlice';
import { useLazyQuery } from '@apollo/client/react/hooks';
import { Button } from 'antd';
import { Modal } from 'src/shared/modal/modal';
import { GET_CATEGORIES } from 'src/connection/fragments';
import { CreateOperationForm } from '../operationPage/ui/createOperationForm/createOperationForm';
import { CategoryTable } from './ui/categoryTable/categoryTable';
import { CreateCategoryForm } from './ui/createCategoryForm/createCategoryForm';

export const CategoryPage: FC = () => {
  const headers = ['Название', 'Дата создания', 'Действия'];
  const [getMany, { data, error }] = useLazyQuery(GET_CATEGORIES);
  const [modalActive, setModalActive] = useState(false);
  const dispatch = useDispatch();
  const [child, setChild] = useState<JSX.Element>();

  useEffect(() => {
    getMany();

    if (data) {
      const a = JSON.stringify(data, null, 2);
      const b = JSON.parse(a);
      dispatch(profileActions.setCategoryList(b.categories.getMany.data));
    }
  }, [data]);

  function createCategory(): void {
    setChild(<CreateCategoryForm onClose={setModalActive} />);
    setModalActive(true);
  }

  return (
    <div className="page">
      <CategoryTable headers={headers} rows={data} />
      <Button type="primary" onClick={createCategory}>
        {'Создать категорию'}
      </Button>
      {modalActive ? createPortal(<Modal setActive={setModalActive}>{child}</Modal>, document.body) : ''}
    </div>
  );
};

export default CategoryPage;
