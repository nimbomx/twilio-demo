import React, { useState } from 'react';
import './App.scss';

import AsideNav from './components/aside-nav';
import AppHeader from './components/header';
import Providers from './pages/Providers/Providers';
import LogIn from './pages/Auth/LogIn';
import SignIn from './pages/Auth/SignIn';

const MyContext = React.createContext()

function App() {
  const [baseURL,setbaseURL] = useState('https://twilio-demo.nimbo.pro/api/')
  //const [baseURL,setbaseURL] = useState('https://laravel8.twilio.nb/api/')
  const [showLogin,setShowLogin] = useState(true)
  const [isAuth,setIsAuth] = useState(false)
  const [token,setToken] = useState(null)
  const [user,setUser] = useState(null)
  const [showFeedback,setShowFeedback] = useState(false)
  return (
    <MyContext.Provider value={
      {
        baseURL,
        isAuth, setIsAuth,
        token,setToken,
        user,setUser,
        showFeedback,setShowFeedback
      }
    }>

    <main className="App">

      {isAuth && <AsideNav />}

      <section className="App__section">

        {isAuth && <AppHeader />}

        <main className="App__body">
          { !isAuth && showLogin && <LogIn onShow={()=> setShowLogin(false)} />}
          { !isAuth && !showLogin && <SignIn onShow={() => setShowLogin(true)} />}
          { isAuth && <Providers />}
        </main>

      </section>

    </main>
    </MyContext.Provider>
  )
}

export default App;
export {MyContext};
