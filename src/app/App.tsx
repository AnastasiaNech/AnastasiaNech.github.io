import React from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router';

import { AuthPage } from '../pages/authPage/authPage';
import { RegPage } from '../pages/regPage/regPage';
import { ProfilePage } from '../pages/profilePage/profilePage';
import { CommonPage } from '../pages/commonPage/commonPage';

import { Client } from '../client/Client';
import { AuthProvider } from './providers/AuthProvider';
import { RouterProvider } from './providers/RouterProvider';
import { store } from '../../src/store/configureStore';

import './App.css';

function App() {
  return (
    <div className='app'>
      <Provider store={store}>
        <Client>
          <AuthProvider>
            <RouterProvider>
              <Route path="" element={<AuthPage />} />
              <Route path="/regustration" element={<RegPage />} />
              <Route path="/" element={<CommonPage />}>
                <Route path="profile" element={<ProfilePage />} />
              </Route>
            </RouterProvider>
          </AuthProvider>
        </Client>
      </Provider>
    </div>
  );
}

export default App;
