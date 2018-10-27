import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { bindAsyncActions } from 'redux-async-actions-reducers';
// import { filtersCreator } from '../actions';
import * as AppActions from '../actions';
import Home from '../components/home';


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

const tmpContainer = connect(mapStateToProps,mapDispatchToProps)(Home);

export default tmpContainer;
