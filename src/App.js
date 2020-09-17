import React from 'react';
import './App.scss';

import AsideNav from './components/aside-nav';
import AppHeader from './components/header';
import Providers from './pages/Providers/Providers';

function App() {
  return (
    <main className="App">

      <AsideNav />

      <section className="App__section">

        <AppHeader />

        <main className="App__body">
          <Providers />
        </main>
        
      </section>

    </main>
  );
}

export default App;
