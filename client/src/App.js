import React from 'react';
import { useRoutes } from './routes';
import { BrowserRouter } from 'react-router-dom';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Loader } from './components/Loader';
import 'materialize-css';

function App() {
  const { token, userId, login, logout, ready } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  if (!ready) {
    return <Loader />
  }

  return (
    <AuthContext.Provider value={{
      token, userId, login, logout, isAuthenticated
    }}>

      <BrowserRouter>
        {isAuthenticated ? <Navbar /> : null}
        <div className='container'>
          {routes}
        </div>

      </BrowserRouter>

    </AuthContext.Provider>
  );
}

export default App;
