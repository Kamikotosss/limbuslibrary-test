import React from 'react';
import './App.css';
import { AppRouter } from './components/AppRouter';
import { store } from './store/store';
import { Provider } from 'react-redux';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <AppRouter></AppRouter>
      </Provider>
    </div>
  );
}

export default App;
