import React, { FC, useState } from 'react';
import './operationTable.css';
import { useSelector } from 'react-redux';
import { createPortal } from 'react-dom';
import { Operation } from 'src/graphql.types';
import { profileSelector } from 'src/entities/profileSlice';
import { Modal } from 'src/shared/modal/modal';
import { UpdateOperationForm } from '../updateOperationForm/updateOperationForm';

interface OperationTableProps {
    headers: Array<string>;
    rows?: Array<Operation>;
}

export const OperationTable: FC<OperationTableProps> = ({ headers, rows }) => {
    const { costList } = useSelector(profileSelector);
    const [modalUpdate, setModalUpdate] = useState(false);
    const [childUpdate, setChildUpdate] = useState<JSX.Element>();

    function updateOperation(id: string): void {
        setChildUpdate(<UpdateOperationForm id={id} onClose={setModalUpdate} />);
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
                {costList.length > 0
                    ? costList.map((row) => {
                        return (
                            <tr key={row.id}>
                                <td>{row.name}</td>
                                <td>{row.amount}</td>
                                <td>{row.type}</td>
                                <td>{row.category.name}</td>
                                <div className='edit' onClick={() => updateOperation(row.id)}></div>
                            </tr>
                        );
                    })
                    : null}
            </tbody>
            {modalUpdate ? createPortal(<Modal setActive={setModalUpdate}>{childUpdate}</Modal>, document.body) : ''}
        </table>
    );
};
