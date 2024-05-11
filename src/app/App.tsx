import React from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router';

import { AuthScreen } from '../pages/authPage/authPage';
import { RegScreen } from '../pages/regPage/regPage';
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
              <Route path="" element={<AuthScreen />} />
              <Route path="/regustration" element={<RegScreen />} />
            </RouterProvider>
          </AuthProvider>
        </Client>
      </Provider>
    </div>
  );
}

export default App;
