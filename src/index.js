import { BrowserRouter, Route } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
const router =
  <BrowserRouter>
    <App />
  </BrowserRouter>;

ReactDOM.render(router, document.getElementById('root'));
registerServiceWorker();
