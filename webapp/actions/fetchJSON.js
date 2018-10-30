import fetch from 'cross-fetch';
import { REQUEST_JSON,RECEIVE_JSON } from '../constants/actiontypes';

function requestJSON(name){
	return {
		type: REQUEST_JSON,
		name
	};
}

function receiveJSON(opt, json){

	return {
		type: opt.actionType,
		transOpt:{
			transData:opt.transData,
			json: json
		}
	};
}

function fetchJSON(opt){
	var _transopt=opt.transOption;
	var _paramsopt=opt.paramsOption;
	var paramsArr=[];
	var paramsString='';
	if(_paramsopt.params!=undefined){
		for(var key in _paramsopt.params){
			paramsArr.push(key+'='+_paramsopt.params[key]);
		}
	}
	if(paramsArr.length!=0){
		paramsString=paramsArr.join('&');
	}
	const _opt={
		method:_paramsopt.method==undefined?'POST':_paramsopt.method,
		// body:paramsString,
		body:JSON.stringify(_paramsopt.params),
		headers:{
			'Accept':'application/json',
			'Content-Type':'application/json'
		}
	};
	if(paramsArr.length==0){
		delete _opt.body;
	}


	return dispatch => {
		// dispatch(requestJSON(name));
		return fetch(_paramsopt.url,_opt)
			.then(response => response.json())
			.then(json => dispatch(receiveJSON(_transopt, json)))
			.catch((error) => dispatch(receiveJSON(_transopt, error)));
	}


}
// {
// 			// console.log(response)
// 			return response.json()
// 				// try{
// 				// 	JSON.parse(response);
// 				// 	return response.json()
// 				// }catch(e){
// 				// 	return {
// 				// 		msg:response
// 				// 	}
// 				// }
// 			}
export function fetchDoPost(_paramsopt,doneCall,errorCall){
	var paramsArr=[];
	var paramsString='';
	if(_paramsopt.params!=undefined){
		for(var key in _paramsopt.params){
			paramsArr.push(key+'='+_paramsopt.params[key]);
		}
	}
	if(paramsArr.length!=0){
		paramsString=paramsArr.join('&');
	}
	const _opt={
		method:_paramsopt.method==undefined?'POST':_paramsopt.method,
		body:JSON.stringify(_paramsopt.params),
		headers:{
			'Accept':'application/json',
			'Content-Type':'application/json'
		}
	};
	if(_paramsopt.formdata){
		_opt.body=_paramsopt.formdata;
		_opt.headers['Content-Type']='application/x-www-form-urlencoded';

	}
	// console.log(_opt)
	if(paramsArr.length==0){
		delete _opt.body;
	}
	fetch(_paramsopt.url,_opt)
		.then(response => response.json())
		.then(json => doneCall(json))
		.catch((error) => errorCall(error));
		return {
			type: null,
			name:{}
		};

}

function shouldFetchJSON(state, opt){
	console.log('name:',opt);
	var posts = state.global;
	if(!posts){
		return true;
	}else if(posts.isFetching){
		return false;
	}else{
		return posts.isInvalidated;
	}
}

export function fetchData(transOption,paramsOption){
	return (dispatch, getState) => {
		if(shouldFetchJSON(getState(), transOption)){
			return dispatch(fetchJSON({
		    transOption:transOption,
		    paramsOption:paramsOption
		  }));
		}
	}
}
