import React, { FC, useState, useEffect, useContext } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';
import { profileActions } from '../../entities/profileSlice';
import { useLazyQuery } from '@apollo/client/react/hooks';
import { gql } from '@apollo/client';
import { Button } from 'antd';
import { Modal } from 'src/shared/modal/modal';
import { OperationTable } from './ui/operationTable/operationTable';
import { CreateOperationForm } from './ui/createOperationForm/createOperationForm';
import { GET_OPERATIONS } from 'src/connection/fragments';


export const OperationPage: FC = () => {
    const headers = ['Название', 'Стоимость', 'Категория', 'Тип', 'Действия'];
    const [getMany, { data, error }] = useLazyQuery(GET_OPERATIONS);
    const [modalActive, setModalActive] = useState(false);
    const dispatch = useDispatch();
    const [child, setChild] = useState<JSX.Element>();

    useEffect(() => {
        getMany();

        if (data) {
            const a = JSON.stringify(data, null, 2);
            const b = JSON.parse(a);
            dispatch(profileActions.setCostList(b.operations.getMany.data));
        }
    }, [data]);

    function createOperation(): void {
        setChild(<CreateOperationForm onClose={setModalActive} />);
        setModalActive(true);
    }

    return (
        <div className='page'>
            <OperationTable headers={headers} rows={data} />
            <Button type="primary" onClick={createOperation}>
                {'Создать операцию'}
            </Button>
            {modalActive ? createPortal(<Modal setActive={setModalActive}>{child}</Modal>, document.body) : ''}
        </div>
    );
};

export default OperationPage;