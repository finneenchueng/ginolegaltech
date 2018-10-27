// import '../styles/index.scss';
// import '../styles/index.less';
import '../assets/bootstrap.min.css';
import '../assets/extend.css';
import '../assets/favicon.ico';
import React from 'react';
import ReactDOM from 'react-dom';
import createStore from '../store/createStore';
import createApp from '../store/createApp';

const serverData = typeof window !== 'undefined'?window._SERVER_DATA : {};
// const serverData=[{
//   id: 0,
//   text: 'todo1',
//   complete: true
// }, {
//   id: 1,
//   text: 'todo2',
//   complete: false
// }, {
//   id: 2,
//   text: 'todo_server_1',
//   complete: true
// }, {
//   id: 3,
//   text: 'todo_server_2',
//   complete: true
// }];
const store = createStore(serverData);
const render = () => {
  //const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;

  // ReactDOM.hydrate(
  //   createApp(store),
  //   document.getElementById('app')
  // );

  // const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;
  // renderMethod(
  //   createApp(store),
  //   document.getElementById('app')
  // );

  ReactDOM.render(
    createApp(store),
    document.getElementById('app')
  );
};

render();
