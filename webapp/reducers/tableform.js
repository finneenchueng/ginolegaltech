import { TBL_FORM_CHECK} from '../constants/actiontypes';
const testReduce = (state = {
  isFetching: false,
  isInvalidated: false,
  json: {}  }, action ) => {
  switch(action.type){
		
    case TBL_FORM_CHECK:
      var tblFormOpt=state.tblFormOpt==undefined?{}:state.tblFormOpt;
      var _tblFormOpt=action.tblFormOpt;
      tblFormOpt=Object.assign({}, tblFormOpt, _tblFormOpt);
			return Object.assign({}, state, {
				tblFormOpt: tblFormOpt
			});
		default:
			return state;
	}

};

export default testReduce;
