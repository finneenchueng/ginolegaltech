// import { createStore, applyMiddleware, compose } from 'redux';
import { applyMiddleware, compose } from 'redux';
import { createStore} from 'redux-async-actions-reducers';
import thunkMiddleware from 'redux-thunk';
import reducer from '../reducers';


const createAppStore = (preloadedState = {}) => {
  let composeEnhancers = compose;

  if (typeof window !== 'undefined') {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  }

  // middlewares
  var middlewares = [
    thunkMiddleware
  ];
  const store = createStore(
    reducer,
    preloadedState,
    applyMiddleware(...middlewares)
  );

  if(module.hot){
    module.hot.accept('../reducers',()=>{
      const nextRootReducer =require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
};
export default createAppStore;
