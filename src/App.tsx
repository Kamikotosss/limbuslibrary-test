import React from 'react';
import './App.css';
import { AppRouter } from './components/AppRouter';
import { store } from './store/store';
import { Provider } from 'react-redux';
import {  HashRouter as Router  } from 'react-router-dom';

function App() {
 
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <AppRouter/>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
