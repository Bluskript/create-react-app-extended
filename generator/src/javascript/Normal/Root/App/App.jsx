import React from 'react';
import ReactLogo from '../../img/react.png';

const App = () => {
  return (
    <div className="header">
      <img src={ReactLogo} className="logo" />
      <h1>It works!</h1>
      <p>Your React App has been created.</p>
      <p>
        Edit <code>./src/Root/App/App.jsx</code> and save to refresh
      </p>
    </div>
  );
};

export default App;
