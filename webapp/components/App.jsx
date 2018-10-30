import React, { Component } from 'react';

import Contents from './layout/contents';
import Headers from './layout/headers';
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
            <div className="container">
                <Headers  globalOpt={globalOpt} logicOpt={logicOpt} actions={actions} routeChild={routeChild} pathAssign={pathAssign}/>
                <Contents globalOpt={globalOpt} logicOpt={logicOpt} actions={actions} routeChild={routeChild} pathAssign={pathAssign} />
                
            </div>
        );
    }
};
