import React, { useState } from 'react';
import './App.scss';

import AsideNav from './components/aside-nav';
import AppHeader from './components/header';
import Providers from './pages/Providers/Providers';
import LogIn from './pages/Auth/LogIn';
import SignIn from './pages/Auth/SignIn';

const MyContext = React.createContext()

function App() {
  const [isAuth,setIsAuth] = useState(false)
  const [token,setToken] = useState(null)
  const [user,setUser] = useState(null)
  return (
    <MyContext.Provider value={
      {
        isAuth, setIsAuth,
        token,setToken,
        user,setUser,
      }
    }>

    <main className="App">

      <AsideNav />

      <section className="App__section">

        <AppHeader />

        <main className="App__body">
          { !isAuth && <LogIn />}
          { !isAuth && <SignIn />}
          { isAuth && <Providers />}
        </main>

      </section>

    </main>
    </MyContext.Provider>
  )
}

export default App;
export {MyContext};
