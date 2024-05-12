import React, { memo, useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { Category } from '../../../graphql.types';
import { FormInput } from '../formInput/formInput';
import { GET_CATEGORIES } from 'src/connection/fragments';
import { useOperation } from 'src/app/lib/useOperation';
import { SelItem } from 'src/app/providers/OperationProvider';
import { OperationFormProps } from 'src/pages/operationPage/ui/types';
import './formOperation.css';

export const OperationForm = memo<OperationFormProps>(({ formManager, formElement, disabled, isUpdate }) => {
    const { values, touched, errors, submitCount, handleBlur, handleSubmit, handleChange } = formManager;
    const [getMany, { data, error }] = useLazyQuery(GET_CATEGORIES);
    const [categoryList, setCategoryList] = useState<SelItem[]>([]);
    const { category, setCategory } = useOperation();

    useEffect(() => {
        getMany();

        if (data) {
            const a = JSON.stringify(data, null, 2);
            const b = JSON.parse(a);
            setCategoryList(
                b.categories.getMany.data.map((item: Category) => {
                    return { id: item.id, name: item.name };
                })
            );
            setCategory(categoryList[0]);
        }
    }, [data, categoryList]);

    const getOptions = function (): JSX.Element[] {
        return categoryList.map((item: SelItem) => {
            return (
                <option
                    value={item.id}
                    key={item.id}
                    selected={category ? category.id == item.id : item.id == categoryList[0].id ? true : false}
                >
                    {item.name}
                </option>
            );
        });
    };

    const changeSelect = function (e: SelItem): void {
        setCategory(categoryList.find((x: any) => x.id == e));
    };

    return (
        <form ref={formElement} onSubmit={handleSubmit}>
            <FormInput
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                errors={errors.name}
                submitCount={submitCount}
                touched={touched.name}
                disabled={disabled}
                title="Название"
                nameInput="name"
                type="input"
            />
            <FormInput
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.cost.toString()}
                errors={errors.cost}
                submitCount={submitCount}
                touched={touched.cost}
                disabled={disabled}
                title="Стоимость"
                nameInput="cost"
                type="number"
            />
            {!isUpdate && (
                <label className="labelSelect">
                    <div className='root'>Категория</div>
                    <select onChange={(e: any) => changeSelect(e.target.value)}>
                        {categoryList && categoryList.length > 0 ? getOptions() : <option />}
                    </select>
                </label>
            )}
            <FormInput
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                errors={errors.description}
                submitCount={submitCount}
                touched={touched.description}
                disabled={disabled}
                title="Описание"
                nameInput="description"
                type="input"
            />
        </form>
    );
});

OperationForm.displayName = 'OperationForm';

