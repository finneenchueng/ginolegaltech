
import { combineAsyncReducers } from 'redux-async-actions-reducers';
import initialReduce from './default';
import tableformReduce from './tableform';

const todoApp = combineAsyncReducers({
  globalOpt:initialReduce,
  logicOpt:tableformReduce

});
export default todoApp;
