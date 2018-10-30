import React from 'react';

import { getInitdatalist,setitem,delitem } from '../../constants/variables';
export default class Tables extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.defaultStateProp={
      rowIndex:0,
      colIndex:0,
      isFocus:false,
      data:[]
  
    };
    this.isTdMove=false;
    this.colTitles=[
        "awesome_text",
        "bad_text",
        "flavour",
        "worst_movie",
        "meaning_of_life",
        "punchline",
        "day"
    ];
    this.getSelectedContent = this.getSelectedContent.bind(this);
    this.doMouseDown = this.doMouseDown.bind(this);
    this.doMouseMove = this.doMouseMove.bind(this);
    this.doMouseUp = this.doMouseUp.bind(this);
    this.doBlur = this.doBlur.bind(this);
    this.getInitData = this.getInitData.bind(this);
    this.setTblFormChg = this.setTblFormChg.bind(this);
    this.doAddLine = this.doAddLine.bind(this);
    this.doDelLine = this.doDelLine.bind(this);
    this.getInitItemline = this.getInitItemline.bind(this);
    this.loadInitList = this.loadInitList.bind(this);
    
     
  }

  getSelectedContent(e){
    console.log(e.target)
  }
  doMouseDown(e){
    this.isTdMove=false;
  }
  doMouseMove(e){
    this.isTdMove=true;
  }
  doMouseUp(e){
    // this.isTdMove=false;
    var ele=e.target;
    if(!this.isTdMove){
      var _rowIndex=ele.getAttribute("row-index");
      var _colIndex=ele.getAttribute("col-index");
      this.setTblFormChg({
        rowIndex:_rowIndex,
        colIndex:_colIndex,
        isFocus:true
      })
    }
    // console.log(e.target)
  }
  doBlur(e){
    var ele=e.target;
    var cur_v=ele.value;
    var _rowIndex=ele.getAttribute("row-index");
    var _colIndex=ele.getAttribute("col-index");
    const {logicOpt,actions} = this.props;
    var tmpOpt= logicOpt.tblFormOpt;
    if(typeof tmpOpt =='undefined'){
      tmpOpt=this.defaultStateProp;
    }
    tmpOpt.data[_rowIndex][this.colTitles[_colIndex]]=cur_v;
    var _self=this;
    actions.fetchDoPost({
      method:'POST',
      url:setitem,
      params:{json:tmpOpt.data[_rowIndex]}
    },function(json){
      if(json.code==0){
        tmpOpt.data[_rowIndex]=json.data;
        tmpOpt=Object.assign({}, tmpOpt, {
          rowIndex:_rowIndex,
          colIndex:_colIndex,
          isFocus:false
        });
        _self.setTblFormChg(tmpOpt);
      }
    },function(res){
      // alert('响应错误：'+JSON.stringify(res))

    });

  }
  doDelLine(e){
    var ele=e.target;
    while(ele.tagName =='SPAN'){
      ele=ele.parentNode;
    }
    var _rowIndex=ele.getAttribute("row-index");
    const {logicOpt,actions} = this.props;
    var tmpOpt= logicOpt.tblFormOpt;
    if(typeof tmpOpt =='undefined'){
      tmpOpt=this.defaultStateProp;
    }
    actions.fetchDoPost({
      method:'POST',
      url:delitem,
      params:{id:tmpOpt.data[_rowIndex].id}
    },function(json){
      if(json.code==0){
        tmpOpt.data.splice(_rowIndex,1); 
        actions.checkTblForm(tmpOpt);
      }
    },function(res){
      // alert('响应错误：'+JSON.stringify(res))

    });
    
  }
  doAddLine(e){
    var ele=e.target;
    while(ele.tagName =='SPAN'){
      ele=ele.parentNode;
    }
    const {logicOpt,actions} = this.props;
    var tmpOpt= logicOpt.tblFormOpt;
    if(typeof tmpOpt =='undefined'){
      tmpOpt=this.defaultStateProp;
    }
    var len=tmpOpt.data.length;
    var newRowIndex=len;
    var opt={
      rowIndex:newRowIndex,
      colIndex:0,
      isFocus:true
    }
    tmpOpt.data.push(this.getInitItemline());
    tmpOpt=Object.assign({}, tmpOpt, opt);
    actions.checkTblForm(tmpOpt);

  }

  getInitItemline(){
    return {
        "awesome_text":"",
        "bad_text":"",
        "flavour":"",
        "worst_movie":"",
        "meaning_of_life":"",
        "punchline":"",
        "day":""
      }
  }
  loadInitList(){
    const {logicOpt,actions} = this.props;
    var _self=this;
    actions.fetchDoPost({
      method:'POST',
      url:getInitdatalist,
      params:{}
    },function(json){
      if(json.code==0){
        _self.setTblFormChg(_self.defaultStateProp.data=json);
      }
    },function(res){
      // alert('响应错误：'+JSON.stringify(res))

    });
  }
  getInitData(){
    const {logicOpt,actions} = this.props;
    var tmpOpt=logicOpt.tblFormOpt;
    if(typeof tmpOpt =='undefined'){
      tmpOpt=this.defaultStateProp;
    }

    return tmpOpt.data.map((item,i)=>{
      return (<tr key={i}>
        
        <th>
          <button type="button" className="close close-del" row-index={i} onClick={this.doDelLine}>
            <span>-</span>
          </button>
        </th>
        <th scope="row">{i+1}</th>
        {
          this.colTitles.map((title,index)=>{
            return (<td className="col-focus" key={title} row-index={i} col-index={index} onMouseDown={this.doMouseDown} onMouseMove={this.doMouseMove} onMouseUp={this.doMouseUp}>
              {item[title]}
              {
                (i==tmpOpt.rowIndex&&index==tmpOpt.colIndex&&tmpOpt.isFocus)?(<input type="text" autoFocus row-index={i} col-index={index} defaultValue={item[title]} className="form-control col-input" onBlur={this.doBlur} />):null
              }
              
            </td>)
          })
        }
        
      </tr>)
    })
  }
  setTblFormChg(opt){
    const {logicOpt,actions} = this.props;
    var tmpOpt= logicOpt.tblFormOpt;
    if(typeof tmpOpt =='undefined'){
      tmpOpt=this.defaultStateProp;
    }
    tmpOpt=Object.assign({}, tmpOpt, opt);
    actions.checkTblForm(tmpOpt);
    
  }
  
  componentWillMount(){
    this.loadInitList()
  }
  componentDidMount(){
    // console.log('Home mounted.....')
    // console.log(this)
    var tableCont = document.querySelector('#table-cont');
    function scrollHandle (e){
        // console.log(this);
        var scrollTop = this.scrollTop;
        console.log(scrollTop);
        this.querySelector('thead').style.transform = 'translateY(' + scrollTop + 'px)';
    }

    tableCont.addEventListener('scroll',scrollHandle);

  }
  render() {
    // const {className, children, ...others} = this.props;
    return (<div className='table-cont' id='table-cont'>

              <table className="table">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">
                      <button type="button" className="close close-add" onClick={this.doAddLine}>
                          <span >+</span>
                        </button>
                    </th>
                    <th scope="col">#</th>
                    {
                      this.colTitles.map(title=>{
                        return (<th scope="col" key={title}>{title}</th>)
                      })
                    }
    
                  </tr>
                </thead>
                <tbody>
                  {this.getInitData()}
                  
                </tbody>
              </table>


    </div>)

  }
};
