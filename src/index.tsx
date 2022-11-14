import './assets/main.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

ReactDOM.render(<App />, document.getElementById('root'));

// FIXME: Flickering with concurrent rendering (should get rid of useLayoutEffect and make lib SSR compatible)
// import { createRoot } from 'react-dom/client';
//
// const root = createRoot(document.getElementById('root')!);
//
// root.render(<App />);
