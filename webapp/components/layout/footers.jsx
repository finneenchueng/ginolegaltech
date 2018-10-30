import React from 'react';
import PropTypes from 'prop-types';


export default class Footers extends React.Component {
    constructor(props,context){
      super(props,context);
      this.navList=[
        {path:'/',label:'首页'},
        {path:'/flow',label:'流量充值'},
        {path:'/personal',label:'个人中心'}
      ];
    }
    shouldComponentUpdate(nextProps, nextState) {
      var flag0=nextProps.logicOpt !== this.props.logicOpt;
      var flag1=nextProps.globalOpt !== this.props.globalOpt;
      var flag=flag1||flag0;
      // console.log(nextProps.logicOpt.wxTicketOpt)
      // console.log(this.props.logicOpt.wxTicketOpt)
      // if(flag){
      //   wxInitial(nextProps.logicOpt.wxTicketOpt);
      // }
      // console.log('shouldComponentUpdate:',flag)
      return flag;
    }
    componentWillMount(){
      const {logicOpt,actions} = this.props;
      if(typeof window ==='object'){
        if(typeof logicOpt.openid ==='string'){
          // actions.fetchData({
          //   actionType:GET_TICKET_4_JS,
          //   transData:{}
          // },{
          //   method:'GET',
          //   url:'/getAccessToken4Js?url='+window.location.href.split('#')[0]
          // });

          actions.fetchDoPost({
            method:'GET',
            url:getAccessToken4Js+'?url='+window.location.href.split('#')[0]
          },function(json){
            actions.setTokenOption(json);
            wxInitial(json);
          },function(res){
            alert('响应错误：'+JSON.stringify(res))
            // console.log("error-result:",res);
          });
        }
      }

    }
    componentWillUpdate(nextProps,nextState,dd){
      const {logicOpt,actions} = this.props;
      console.log('arguments:',arguments)
      console.log("nextProps:",nextProps)
      console.log("nextState:",nextState)
      console.log("dd:",dd)
    
    }
    componentDidMount(){
      // console.log('footer mounted.....')
      // console.log(this)
    }
    render() {
      const {globalOpt} = this.props;
      return(
           <TabBar>
             {this.getActiveBar()}

           </TabBar>

      )

    }
};
