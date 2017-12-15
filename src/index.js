import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// This is the real renderer. All the code in app.js is called here.
// Notice this takes two functions, the imported App
ReactDOM.render(
  <App />,
   document.getElementById('root'));

registerServiceWorker();

if (module.hot) {
module.hot.accept();
}
