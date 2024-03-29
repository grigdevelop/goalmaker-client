import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import './../node_modules/bootstrap/dist/css/bootstrap.css';
import './index.css';
import ApiClient from './utils/apiClient';
import { HttpClientMock } from './utils/httpClient.mock';
import { liteMocker } from './utils/mockDb';
import App from './App';
import * as serviceWorker from './serviceWorker';

// setup api client
ApiClient.setHttpClient(new HttpClientMock());

// setup test mock data while developing
liteMocker.init();

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
