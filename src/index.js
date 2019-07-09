import React from 'react';
import ReactDOM from 'react-dom';
import './index.sass';
import data from './data.json'
import App from './App';

ReactDOM.render(<App d={data} />, document.getElementById('root'));