import React, { FC, useCallback, useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from 'antd';

import './header.css';
import { profileActions } from 'src/entities/profileSlice';
import { useAuth } from 'src/app/lib/useAuth';
import { useDispatch } from 'src/store/useDispatch';

export const Header: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setIsAuth } = useAuth();

  const onClose = useCallback(() => {
    dispatch(profileActions.setToken(null));
    setIsAuth(false);
    navigate(`/`);
  }, [navigate]);

  return (
    <div className="header light">
      <div className="title">Приложение для контроля доходов/расходов</div>
      <div className="title active" onClick={() => navigate('/profile')}>
        Профиль
      </div>
      <div className="title active" onClick={() => navigate('/categories')}>
        Категории
      </div>
      <div className="title active" onClick={() => navigate('/operations')}>
        Операции
      </div>
      <div className="buttom-header">
        <div className="exit" onClick={onClose}></div>
      </div>
    </div>
  );
};
