import React, { FC, useEffect } from 'react';
import { Outlet } from 'react-router';
import { profileActions, profileSelector } from '../../entities/profileSlice';
import { useDispatch } from '../../store/useDispatch';
import { useSelector } from 'react-redux';
import { useAuth } from '../../app/lib/useAuth';
import { Header } from '../../shared/header/Header';

export const CommonPage: FC = () => {
  const dispatch = useDispatch();
  const { setIsAuth } = useAuth();
  const { authToken } = useSelector(profileSelector);

  useEffect(() => {
    dispatch(profileActions.getToken());
    dispatch(profileActions.getProfileInfo());
    dispatch(profileActions.getCostList());
    setIsAuth(Boolean(authToken));
  }, [dispatch]);

  return (
    <div>
      <nav>
        <Header />
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};
