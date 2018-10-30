import React from 'react';

import { getTemplatesData,doAnswer } from '../../constants/variables';

export default class Home extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.dataType={
      "text": "string",
      "date": "date",
      "number": "number",
      "boolean": "boolean"
    }
    this.initData={
      firstStep:1,
      lastStep:5,
      currentStep:0,
      checkMsgOpt:null,
      msgblock:null,
      variables:[],
      records:[]
    }
    
     
    
    this.getTeplatesData = this.getTeplatesData.bind(this);
    this.getStepTitleLine = this.getStepTitleLine.bind(this);
    this.getStepContent = this.getStepContent.bind(this);
    this.geInputItem = this.geInputItem.bind(this);
    this.getChkFormItem = this.getChkFormItem.bind(this);
    this.setTblFormStep = this.setTblFormStep.bind(this);
    this.doBack = this.doBack.bind(this);
    this.doNext = this.doNext.bind(this);
    this.getBasicOpt = this.getBasicOpt.bind(this);
    this.getStepBtnLines = this.getStepBtnLines.bind(this);
    this.recordStepData = this.recordStepData.bind(this);
    this.setRecords = this.setRecords.bind(this);
    this.doBackFirstStep = this.doBackFirstStep.bind(this);
    this.isExistNext = this.isExistNext.bind(this);
    this.doSend = this.doSend.bind(this);
    this.doStart = this.doStart.bind(this);
    this.getDateByTimes = this.getDateByTimes.bind(this);

  }


  getDateByTimes(timestamps){
    var d = new Date(timestamps * 10000);    //根据时间戳生成的时间对象
    var date = (d.getFullYear()) + "-" + 
           (d.getMonth() + 1) + "-" +
           (d.getDate()) + " " + 
           (d.getHours()) + ":" + 
           (d.getMinutes()) + ":" + 
           (d.getSeconds());
    return date
  }
  getBasicOpt(){
    const {logicOpt} = this.props;
    var tmpOpt= logicOpt.tblFormOpt;
    if(typeof tmpOpt =='undefined'){
      tmpOpt=this.initData;
    }
    return tmpOpt;
  }
  setTblFormStep(opt){
    const {logicOpt,actions} = this.props;
    var tmpOpt= this.getBasicOpt();
    tmpOpt=Object.assign({}, tmpOpt, opt);
    actions.checkTblForm(tmpOpt);
    
  }
  recordStepData(ele){
    while(ele.tagName !='FORM'){
      ele=ele.parentNode;
    }
    var inputs = ele.querySelectorAll("input");
    var opt={};
    var msg={};
    for(var i=0;i<inputs.length;i++){
      var _iteminput=inputs[i];
      if(_iteminput.name){
        if(_iteminput.type=='checkbox'){
          opt[_iteminput.name]=_iteminput.checked;
        }else{
          var value= _iteminput.value;
          if(_iteminput.type=='text'){
            if(value.trim().length==0){
              if(typeof msg.checkInputName ==='undefined'){
                msg.checkInputName=_iteminput.name;
                msg.errorDesc="is not allowed empty!"
              }
            }
          }else if(_iteminput.type=='number'){
            
            if(/^(\+|-)?\d+($|\.\d+$)/i.test(value)){
              var _min=_iteminput.getAttribute("data-min");
              var _max=_iteminput.getAttribute("data-max");
              value=parseInt(value);
              var flag=false;
              if(_min!=null){
                _min=parseInt(_min);
                if(value < _min){ 
                  flag=true;
                    // console.log(value < _min) 
                    // console.log(value +'<'+ _min)             
                     if(typeof msg.checkInputName ==='undefined'){
                        msg.checkInputName=_iteminput.name;
                        msg.errorDesc="should be equal or greater than " +_min;
                      }
                  
                }
              }
              if(!flag){
                if(_max!=null){
                  _max=parseInt(_max);
                  // console.log(value > _max) 
                  //     console.log(value +'>'+ _max) 
                  if(value > _max){
                    if(typeof msg.checkInputName ==='undefined'){
                          msg.checkInputName=_iteminput.name;
                          msg.errorDesc="should be less than or equal to " +_max;
                      }
                  }
                }
              }
              

              // if(_min!=null && value < _min){ 
              //     console.log(value < _min) 
              //     console.log(value +'<'+ _min)             
              //     if(typeof msg.checkInputName ==='undefined'){
              //       msg.checkInputName=_iteminput.name;
              //       msg.errorDesc="should be equal or greater than " +_min;
              //     }
                
              // }else{
              //    if(_max!=null&&value > _max){
              //     console.log(value < _max) 
              //       console.log(value +'>'+ _max) 
              //       if(typeof msg.checkInputName ==='undefined'){
              //           msg.checkInputName=_iteminput.name;
              //           msg.errorDesc="should be less than or equal to " +_max;
              //       }
              //     }
              // }
             
              
            }else{
              if(typeof msg.checkInputName ==='undefined'){
                msg.checkInputName=_iteminput.name;
                msg.errorDesc="must be number !"
              }
               
            }
            

          }else if(_iteminput.type=='date'){
            
            if(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/i.test(value)){
              var _min=_iteminput.getAttribute("data-min");
              var _max=_iteminput.getAttribute("data-max");
              var _values=new Date(value).getTime();
              var flag=false;
              if(_min!=null){
                _min=parseInt(_min);
                if(_values < _min*10000){ 
                    // console.log(_values < _min*10000) 
                    // console.log(_values +'<'+ _min*10000)
                    flag=true;             
                     if(typeof msg.checkInputName ==='undefined'){
                        msg.checkInputName=_iteminput.name;
                        msg.errorDesc="should be later than" +this.getDateByTimes(_min);
                      }
                  
                }
              }
              if(!flag){
                if(_max!=null){
                  _max=parseInt(_max);
                  // console.log(_values > _max*10000) 
                  //     console.log(_values +'>'+ _max*10000) 
                  if(_values > _max*10000){
                    if(typeof msg.checkInputName ==='undefined'){
                          msg.checkInputName=_iteminput.name;
                          msg.errorDesc="should be earlier than" +this.getDateByTimes(_max);
                      }
                  }
                }
              }
              
              
            }else{
              if(typeof msg.checkInputName ==='undefined'){
                msg.checkInputName=_iteminput.name;
                msg.errorDesc="must be date type !"
              }
            }
          }
          opt[_iteminput.name]=value;


        }

      }
      // if(typeof msg.checkInputName ==='string'){
      //   break;
      // }
      
    }
    // console.log('option values:',opt)
    return {
        data:opt,
        msgopt:msg
      }
  }
  isExistNext(tmpOpt){
    var flag=false;
    if(tmpOpt.records[tmpOpt.currentStep+1]==undefined){
      flag=true;
    }else {
      if(tmpOpt.records[tmpOpt.currentStep+1].length==0){
        flag=true;
      }
    }
    return flag;
  }
  setRecords(ele,tmpOpt){
    var tmp_arr=[];
    if(tmpOpt.variables.length>0){
      var cur_opt=this.recordStepData(ele);
      var cur_record=cur_opt.data;
      if(typeof cur_opt.msgopt.checkInputName==='string'){
        tmpOpt.checkMsgOpt=cur_opt.msgopt
      }else{
        tmpOpt.checkMsgOpt=null;
        
      }
      for(var k=0;k<tmpOpt.variables.length;k++){
        var _item=tmpOpt.variables[k];
        _item.value=cur_record[_item.name];
        tmp_arr.push(_item)
      }
      
    }
    
    return {
      opt:tmpOpt,
      arr:tmp_arr
    };
  }
  doNext(e){
    var tmpOpt= this.getBasicOpt();
    // console.log(tmpOpt)
    if(tmpOpt.currentStep < tmpOpt.lastStep){
      // tmpOpt.currentStep++;
      // this.setTblFormStep(tmpOpt);
      var _opt=this.setRecords(e.target,tmpOpt);
      tmpOpt=_opt.opt;
      var _arr=_opt.arr;
      var flag=false;
      if(tmpOpt.checkMsgOpt==null){
        if(tmpOpt.records[tmpOpt.currentStep-1]==undefined){
          tmpOpt.records.push(_arr);
        }else{
          if(tmpOpt.records[tmpOpt.currentStep-1].length==0){
            tmpOpt.records[tmpOpt.currentStep-1]=_arr;
          }
        }
        if(tmpOpt.records[tmpOpt.currentStep]==undefined){
          flag=true;
        }else {
          if(tmpOpt.records[tmpOpt.currentStep].length==0){
            flag=true;
          }
        }
        if(flag){
          tmpOpt.currentStep++;
          this.getTeplatesData(tmpOpt)
        }else{
          tmpOpt.variables=tmpOpt.records[tmpOpt.currentStep];
          tmpOpt.currentStep++;
          this.setTblFormStep(tmpOpt);
        }
        
      }else{
        this.setTblFormStep(tmpOpt);
      }
    }else if(tmpOpt.currentStep==tmpOpt.lastStep){
      tmpOpt.currentStep++;
      tmpOpt.msgblock={
        title:'Send all answers',
        msg:'Send all answers'
      };
      this.setTblFormStep(tmpOpt);
    }else if(tmpOpt.currentStep>tmpOpt.lastStep){
      console.log(3)
    }
  }
  doBack(e){
    var tmpOpt= this.getBasicOpt();
    if(tmpOpt.currentStep>tmpOpt.firstStep){
      // console.log(JSON.stringify(tmpOpt))
      var flag=false;
      if(tmpOpt.records[tmpOpt.currentStep-2]==undefined){
        flag=true;
      }else{
        if(tmpOpt.records[tmpOpt.currentStep-2].length==0){
          flag=true;
        }
      }
      tmpOpt.checkMsgOpt=null;
      if(flag){
        tmpOpt.currentStep--;
        this.getTeplatesData(tmpOpt)
      }else{
        tmpOpt.variables=tmpOpt.records[tmpOpt.currentStep-2];
        tmpOpt.currentStep--;
        // console.log(JSON.stringify(tmpOpt))
        this.setTblFormStep(tmpOpt);
      }
      

    }
    
  }
  doBackFirstStep(e){
    var tmpOpt= this.getBasicOpt();
    tmpOpt.currentStep=1;
    var flag=false;
    if(tmpOpt.records[tmpOpt.currentStep]==undefined){
      flag=true;
    }else {
      if(tmpOpt.records[tmpOpt.currentStep].length==0){
        flag=true;
      }
    }
    if(flag){
      this.getTeplatesData(tmpOpt)
    }else{
      tmpOpt.variables=tmpOpt.records[tmpOpt.currentStep-1];
      this.setTblFormStep(tmpOpt);
    }
    
    
  }
  doSend(e){
    var tmpOpt= this.getBasicOpt();
    let formdata = new FormData();
    // var tmp={};
    formdata.append("template_id",tmpOpt.template_id);
    formdata.append("template_name",tmpOpt.template_name);
    // tmp.template_id=tmpOpt.template_id
    // tmp.template_name=tmpOpt.template_name
    const {logicOpt,actions} = this.props;
    var _self=this;
    var tmpOpt= this.getBasicOpt();
    var formdatas=tmpOpt.records;
    for(var i=0;i<formdatas.length;i++){
      var arr_item=formdatas[i];
      var len=arr_item.length;
      if(len>0){
        for(var j=0;j<len;j++){
          var sub_item=arr_item[j];
          formdata.append((i+1)+'-'+(j+1),sub_item.value);
          // tmp[(i+1)+'-'+(j+1)]=sub_item.value
        }
      }
    }
    // console.log('send formdata:',tmp)
    actions.fetchDoPost({
      method:'POST',
      url:doAnswer,
      formdata:formdata
    },function(json){
      // console.log(json)
      tmpOpt.currentStep++;
      if(json.status=='OK'){
        tmpOpt.msgblock.msg='Data have been successfully sent. Thanks for your collaboration';
      }
      _self.setTblFormStep(tmpOpt);
    },function(res){
      // console.log('err,',res)
      tmpOpt.currentStep++;
      tmpOpt.msgblock.msg=res;
      _self.setTblFormStep(tmpOpt);
    });
    
  }
  doStart(e){
    var tmpOpt= this.initData;
    tmpOpt.currentStep =1;
    this.getTeplatesData(tmpOpt);
    
  }
  getTeplatesData(tmpOpt0){
    const {logicOpt,actions} = this.props;
    var _self=this;
    var tmpOpt= typeof tmpOpt0.currentStep ==='undefined'?this.getBasicOpt():tmpOpt0;
    actions.fetchDoPost({
      method:'GET',
      url:getTemplatesData
    },function(json){
      // console.log(json)
      tmpOpt.variables=json.variables;
      tmpOpt.template_id=json.template_id;
      tmpOpt.template_name=json.template_name;
      if(tmpOpt.variables.length==0){
        tmpOpt.errMsg="An error occurred, go to next step";
      }else{
        tmpOpt.errMsg=null;
      }
      _self.setTblFormStep(tmpOpt);
    },function(res){
      // console.log('err,',res)
      tmpOpt.variables=[];
      tmpOpt.errMsg="An error occurred, go to next step";
      _self.setTblFormStep(tmpOpt);
    });
  }
  getStepTitleLine(){
    var tmpOpt= this.getBasicOpt();
    if(tmpOpt.currentStep>0&&tmpOpt.currentStep<=tmpOpt.lastStep){
      return (<h2>Step {tmpOpt.currentStep}/{tmpOpt.lastStep}</h2>)
    }
    if(tmpOpt.currentStep == tmpOpt.lastStep+1){
      return (<h2>{tmpOpt.msgblock.title}</h2>) 
    }else if(tmpOpt.currentStep == tmpOpt.lastStep+2){
      return (<h2>{tmpOpt.msgblock.title}</h2>) 
    }
    return null;
  }
  getStepBtnLines(){
     const {logicOpt,actions} = this.props;
      var tmpOpt= this.getBasicOpt();
      const _styles={"marginTop":"1em","textAlign":"right"};
      if(tmpOpt.currentStep==0){
        return null
      }else if(tmpOpt.currentStep==tmpOpt.firstStep){
        return (<p style={_styles}>
                <button type="button" className="btn btn-info" onClick={this.doNext}>NEXT</button>
              </p>)
      }else if(tmpOpt.currentStep>tmpOpt.firstStep&&tmpOpt.currentStep<=tmpOpt.lastStep){
        return (<p style={_styles}>
                <button type="button" className="btn btn-light" onClick={this.doBack}>BACK</button>
                <button type="button" className="btn btn-info" onClick={this.doNext}>NEXT</button>
              </p>)
      }else if(tmpOpt.currentStep==tmpOpt.lastStep+1){
        return (<p style={_styles}>
                <button  type="button" className="btn btn-light" onClick={this.doBackFirstStep}>CHECK ANSWERS</button>
                <button  type="button" className="btn btn-info" onClick={this.doSend}>SEND</button>
              </p>)
      }else if(tmpOpt.currentStep==tmpOpt.lastStep+2){
        return (<p style={_styles}>
                <button  type="button" className="btn btn-info" onClick={this.doStart}>DO AGAIN</button>
              </p>)
      }
      
      
  }
  getStepContent(){
    const {logicOpt,actions} = this.props;
    var tmpOpt= this.getBasicOpt();
    var _self=this;
    if(tmpOpt.currentStep==0){
      return (<p style={{"marginTop":"1em","textAlign":"center","padding":"1em 0"}}>
        <button type="button" className="btn btn-info" onClick={this.doStart}>START</button>
        </p>)
    }else{
      return (
          <div style={{"boxShadow":"0 1rem 3rem rgba(0,0,0,.175)","padding":".3em 1em"}}>
              {
                this.getStepForms()
              }
              
          </div>
        )
    }
  }
  getStepForms(){
    const {logicOpt,actions} = this.props;
    var tmpOpt= this.getBasicOpt();
    var _self=this;
    // console.log(tmpOpt)
    if(tmpOpt.currentStep>=tmpOpt.firstStep&&tmpOpt.currentStep<=tmpOpt.lastStep){
      if(tmpOpt.variables.length==0){
        return (<p className="font-weight-normal" style={{"marginTop":"1em"}}>{tmpOpt.errMsg}</p>)
      }else{
        return tmpOpt.variables.map((item,index)=>{
          if(item.boolean){
            return _self.getChkFormItem(index,item,'checked is not set')
          }else{
            return _self.geInputItem(index,item)
          }
        })
      }
    }else if(tmpOpt.currentStep==tmpOpt.lastStep+1){
      return (<p className="font-weight-normal" style={{"marginTop":"1em"}}>{tmpOpt.msgblock.msg}</p>)
    }else if(tmpOpt.currentStep==tmpOpt.lastStep+2){
      return (<p className="font-weight-normal" style={{"marginTop":"1em"}}>{tmpOpt.msgblock.msg}</p>)
    }
    // if(tmpOpt.variables.length==0){
    //   return (<p className="font-weight-normal" style={{"marginTop":"1em"}}>{tmpOpt.errMsg}</p>)
    // }else if(tmpOpt.currentStep>tmpOpt.lastStep){
    //   return (<p className="font-weight-normal" style={{"marginTop":"1em"}}>Send all answers</p>)
    // }else{
    //   return tmpOpt.variables.map((item,index)=>{
    //     if(item.boolean){
    //       return _self.getChkFormItem(index,item,'checked is not set')
    //     }else{
    //       return _self.geInputItem(index,item)
    //     }
    //   })
    // }

  }

  geInputItem(key,item){
    var tmpOpt= this.getBasicOpt();
    const lbl_id='lbl'+(Math.floor(Math.random()*10000000));
    key = key+"_"+Math.floor(Math.random()*1000);
    var lblName=item.label,inputType=item.type,inputName=item.name;
    var flag=false;
    if(tmpOpt.checkMsgOpt!=null){
      if(tmpOpt.checkMsgOpt.checkInputName==inputName){
        flag=true;
      }
    }
    var lbl_box=lblName;
    if(typeof lblName ==='object'){
      lbl_box=lblName.en;
    }else if(typeof lblName ==='string'){
      var lbl_text=lblName;
      if(lbl_text.length>95){
        var _wid=lbl_text.length*2*.2;
        lblName=lbl_text.substring(0,12)+'...'
        lbl_box=(<a href="javascript:void(0)" className="lbl-pop">
            <strong>{lblName}</strong>
            <div className="popover fade bs-popover-right show"  style={{"transform": "translate3d(120px, -16px, 0)","maxWidth":_wid+"px", "width": _wid+"px","willChange": "transform"}} >
              <div className="arrow" style={{"top": "16px"}}></div>
              <h3 className="popover-header"></h3>
              <div className="popover-body">{lbl_text}</div>
            </div>
          </a>)
      } 
    }
    var _input_ele=null;
    if(typeof item.min_value=='undefined'){
      _input_ele=(<input type={inputType} name={ inputName } className="form-control" id={lbl_id} required placeholder={lblName} defaultValue={item.value} />);
    }else{
      _input_ele=(<input type={inputType} name={ inputName } className="form-control" id={lbl_id} data-min={item.min_value} data-max={item.max_value}  required placeholder={lblName} defaultValue={item.value} />)
    }

    if(flag){
      return (<div key={key} className="form-group was-validated">
                <label htmlFor= {lbl_id} >{lbl_box}</label>
                {_input_ele}
                <div className="invalid-feedback" style={{"display":"block"}}>{inputName+" "+tmpOpt.checkMsgOpt.errorDesc}</div>
              </div>)
    }else{
      return (<div key={key} className="form-group">
                <label htmlFor= {lbl_id} >{lbl_box}</label>
                {_input_ele}
              </div>)
    }
    
  }
  getChkFormItem(key,lblName,errorDesc){
    const lbl_id='C'+(Math.floor(Math.random()*100000008));

    return (<div key={key} className="custom-control custom-checkbox mb-3" >
              <input type="checkbox" className="custom-control-input" id={lbl_id} required />
              <label className="custom-control-label" htmlFor={lbl_id}>{item.label}</label>
              {

               (<div className="invalid-feedback">{item.name+" "+errorDesc}</div>)
              }
            </div>)
  }
  componentWillMount(){
    
  }
  componentDidMount(){
    // console.log('Home mounted.....')
    // // console.log(this)
    // var tableCont = document.querySelector('#table-cont');
    // function scrollHandle (e){
    //     // console.log(this);
    //     var scrollTop = this.scrollTop;
    //     console.log(scrollTop);
    //     this.querySelector('thead').style.transform = 'translateY(' + scrollTop + 'px)';
    // }

    // tableCont.addEventListener('scroll',scrollHandle);
    /*
    <div className="custom-control custom-checkbox mb-3">
      <input type="checkbox" className="custom-control-input" id="customControlValidation1" required />
      <label className="custom-control-label" for="customControlValidation1">Check this custom checkbox</label>
      <div className="invalid-feedback">Example invalid feedback text</div>
    </div>

    <div className="custom-control custom-radio">
      <input type="radio" className="custom-control-input" id="customControlValidation2" name="radio-stacked" required />
      <label className="custom-control-label" for="customControlValidation2">Toggle this custom radio</label>
    </div>
    <div className="custom-control custom-radio mb-3">
      <input type="radio" className="custom-control-input" id="customControlValidation3" name="radio-stacked" required />
      <label className="custom-control-label" for="customControlValidation3">Or toggle this other custom radio</label>
      <div className="invalid-feedback">More example invalid feedback text</div>
    </div>
     <div className="form-group">
      <label for="validationTooltip01">First name</label>
      <input type="text" className="form-control" id="customControlValidation4" required />
      <div className="invalid-feedback">Example invalid custom select feedback</div>
    </div>
    */
  }
  render() {
    // const {className, children, ...others} = this.props;
    return ( <form>
            {

              this.getStepTitleLine()
            }
            {
              this.getStepContent()
            }
            {
              this.getStepBtnLines()
            }
            </form>
    )

  }
};
