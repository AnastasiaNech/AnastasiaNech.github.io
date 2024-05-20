import React, { FC, useState } from 'react';
import './categoryTable.css';
import { useSelector } from 'react-redux';
import { Category } from 'src/graphql.types';
import { profileSelector } from 'src/entities/profileSlice';
import { UpdateCategoryForm } from '../updateCategory/updateCategory';
import { createPortal } from 'react-dom';
import { Modal } from 'src/shared/modal/modal';

interface CategoryTableProps {
  headers: Array<string>;
  rows?: Array<Category>;
}

export const CategoryTable: FC<CategoryTableProps> = ({ headers, rows }) => {
  const { categoryList } = useSelector(profileSelector);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [childUpdate, setChildUpdate] = useState<JSX.Element>();

  function updateCategory(id: string): void {
    setChildUpdate(<UpdateCategoryForm id={id} onClose={setModalUpdate} />);
    setModalUpdate(true);
  }

  return (
    <table>
      <thead>
        <tr>
          {' '}
          {Array.isArray(headers)
            ? headers.map((header) => {
                return <th key={header}>{header}</th>;
              })
            : null}
        </tr>
      </thead>
      <tbody>
        {categoryList.length > 0
          ? categoryList.map((row) => {
              return (
                <tr key={row.id}>
                  <td>{row.name}</td>
                  <td>{new Date(row.updatedAt).toLocaleDateString()}</td>
                  <div className="edit" onClick={() => updateCategory(row.id)}></div>
                </tr>
              );
            })
          : null}
      </tbody>
      {modalUpdate ? createPortal(<Modal setActive={setModalUpdate}>{childUpdate}</Modal>, document.body) : ''}
    </table>
  );
};
