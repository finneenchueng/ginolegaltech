import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import AppConnector from '../containers/AppConnector';


const AsyncMode = React.unstable_AsyncMode;

const createApp = (store) => (
    <AppContainer>
      <Provider store={store}>
        <AppConnector />

      </Provider>
    </AppContainer>

);
if (module.hot) {
  module.hot.accept();
}

export default createApp;
