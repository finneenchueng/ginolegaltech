import { GET_TICKET_4_JS,FLOW_RECHARGE_CHECK } from '../constants/actiontypes';
const testReduce = (state = {
  isFetching: false,
  isInvalidated: false,
  json: {}  }, action ) => {
  switch(action.type){
		case GET_TICKET_4_JS:
      // console.log('GET_TICKET_4_JS action data:',action);
      var _tokenOpt=action.tokenOpt;
      return Object.assign({}, state, {
				wxTicketOpt: _tokenOpt
			});
			// return Object.assign({}, state, {
			// 	isFetching: true,
			// 	isInvalidated: false,
      //   wxTicketOpt:action.json
			// });
    case FLOW_RECHARGE_CHECK:
      // console.log('FLOW_RECHARGE_CHECK action data:',action.flowOpt)
      var flowChargeOpt=state.flowChargeOpt==undefined?{}:state.flowChargeOpt;
      var _flowOpt=action.flowOpt;
      // alert("服务器响应结果action："+JSON.stringify(action));
      // console.log("服务器响应结果action：",JSON.stringify(action));
      if(action.transOpt!=undefined){
        _flowOpt=action.transOpt.transData;
        // alert("服务器响应结果json："+JSON.stringify(action.json));
        _flowOpt.remoteData=action.transOpt.json;
      }
      flowChargeOpt=Object.assign({}, flowChargeOpt, _flowOpt);
			return Object.assign({}, state, {
				flowChargeOpt: flowChargeOpt
			});
		default:
			return state;
	}

};

export default testReduce;
