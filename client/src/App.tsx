import React from 'react';
import './App.css';
import { Theme } from './Theme';
import LoginPage from './screens/LoginPage';

function App() {
  return (
    <Theme>
      <div className="App">
        <LoginPage />
      </div>
    </Theme>
  );
}

export default App;
