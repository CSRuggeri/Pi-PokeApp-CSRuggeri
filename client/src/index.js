import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; // Importa Provider desde react-redux
import {store} from "./redux/store" // Importa tu store de Redux
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <Provider store={store}> {/* Envuelve tu App con el Provider */}
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();

