import React, { Component } from 'react';

import Contents from './layout/contents';

export default class App extends Component {
    static propTypes = {

    };

    static defaultProps = {
    };
    componentWillMount(){

    }
    render() {
        const { actions, globalOpt,logicOpt,routeChild,pathAssign} = this.props;
        return (
          <Contents globalOpt={globalOpt} logicOpt={logicOpt} actions={actions} routeChild={routeChild} pathAssign={pathAssign} />
        );
    }
};
