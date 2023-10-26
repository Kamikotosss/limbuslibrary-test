import React from 'react';
import './App.css';
import { AppRouter } from './components/AppRouter';
import { store } from './store/store';
import { Provider } from 'react-redux';
import {  HashRouter as Router } from 'react-router-dom';
import { QueryClient , QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
const queryClient = new QueryClient();
function App() {
 
  return (
    <QueryClientProvider client={queryClient} >
      <Provider store={store}>
        <Router>
          <AppRouter/>
        </Router>
      </Provider>
      {/* <ReactQueryDevtools initialIsOpen={true}/> */}
    </QueryClientProvider>
  );
}

export default App;
