import React from 'react';
import ReactDOM from 'react-dom';
import data from './data.json'
import App from './App';
import './index.sass';

// Init App & load data from json file
ReactDOM.render(<App d={data} />, document.getElementById('root'));