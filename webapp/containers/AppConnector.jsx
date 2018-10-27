import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { bindAsyncActions } from 'redux-async-actions-reducers';
// import { filtersCreator } from '../actions';
import * as AppActions from '../actions';
import App from '../components/App';

class AppMng extends Component {
  constructor(props, context) {
    //super(...arguments); // 如果只写props, 会把context 弄丢，所以super时始终建议这么写
    super(props, context);

  }

  render() {
    const { actions, globalOpt,logicOpt} = this.props;
    // console.log(this.props.location.key)
    // console.log(this.props.location.pathname)
  	return (
      <div>
        <App
          globalOpt={globalOpt} logicOpt={logicOpt} actions={actions}
          />
      </div>

    )
  }
}

const mapStateToProps = (state) => {
  return state;
};
// const mapDispatchToProps = {
//   completeToDoCreator
// }

// const mapDispatchToProps = (dispatch) => ({
//     boundActions: bindActionCreators(AppActions, dispatch)
// });
//
// const AppContainer = connect(mapStateToProps,mapDispatchToProps)(App);
//
// export default AppContainer;



const mapDispatchToProps = (dispatch) => ({
    actions: bindAsyncActions(AppActions, dispatch)
});

const AppContainer = connect(mapStateToProps,mapDispatchToProps)(AppMng);

export default AppContainer;
