import { HTML5_HISTORY,FOOTER_ACTIVE,REQUEST_JSON,RECEIVE_JSON } from '../constants/actiontypes';
const initialReduce = (state = {
  isFetching: false,
  isInvalidated: false,
  json: {},
  footerOpt:{activeIndex:0}
}, action) => {
  switch(action.type){
		case REQUEST_JSON:
			return Object.assign({}, state, {
				isFetching: true,
				isInvalidated: false
			});
		case RECEIVE_JSON:
			return Object.assign({}, state, {
				isFetching: false,
				isInvalidated: false,
				json: action.json,
				lastUpdated: action.receivedAt
			});
    case HTML5_HISTORY:
			return Object.assign({}, state, {
				history: action.historyOpt
			});
    case FOOTER_ACTIVE:
      var footerOpt=state.footerOpt==undefined?{}:state.footerOpt;
      footerOpt=Object.assign({}, footerOpt, action.footerOpt);
      return Object.assign({}, state, {
        footerOpt: footerOpt
      });
		default:
			return state;
	}

};

export default initialReduce;
