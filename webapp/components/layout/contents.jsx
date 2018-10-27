import React from 'react';
import './animate-enter.css';

import {
  Link,
  Router,
    Switch,
    Route

} from 'react-router';


import createMemoryHistory from "history/createMemoryHistory";
const history = createMemoryHistory();

import { TransitionGroup, CSSTransition } from "react-transition-group";

import HomeApp from '../../containers/HomeConnector';



const test= (nextState, replace) => {
    console.info('routerenter', nextState)
}
export default class Contents extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentWillMount(){
    const {globalOpt,actions} = this.props;
    // actions.setHistoryOption(history);

  }
  componentDidMount(){


  }
  shouldComponentUpdate(nextProps, nextState) {
    const {globalOpt,actions} = this.props;
    var flag=nextProps.logicOpt.wxTicketOpt !== this.props.logicOpt.wxTicketOpt;
   
    return flag;
  }
 

  render() {
    const {globalOpt,logicOpt,actions} = this.props;

    return (
      <div className="container">

          <Router history={history}>
            <Route
              render={({ location }) => (
                <div className="content-box">
                  <Route
                    exact
                    path="/"  />
                    <TransitionGroup>
                      <CSSTransition key={location.key} classNames={{
                                           enter: 'route-left-enter',
                                           enterActive: 'route-left-enter-active',
                                           exit: 'route-left-leave',
                                           exitActive: 'route-left-leave-active'
                                          }} timeout={200} >
                        <Switch location={location}>
                          <Route exact path="/" component={HomeApp} onEnter={test} />
                        </Switch>

                      </CSSTransition>
                    </TransitionGroup>

                </div>
              )}
            />
          </Router>



      </div>
    )

  }
};
