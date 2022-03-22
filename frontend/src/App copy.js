import React, { useState } from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import Login from './Login'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useStateValue } from './StateContext';

function App() {

  const [{ user }, dispatch] = useStateValue();

  return (
    //BEM naming convention
    <div className="app">
      {!user ? <Login /> : 
      (
      <div className="app__body">
        <Router >
          <Sidebar />
          <Route path="/rooms/:roomId">
            <Chat />
          </Route>
          <Route path="/chat">
            <Chat />
          </Route>
        </Router>
        
      </div>    )}
    </div>
  );
}

export default App;
