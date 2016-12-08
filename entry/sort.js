import React, {
  Component,
  PropTypes
} from 'react';
import ReactDOM from 'react-dom';

class Sort extends React.Component{
    constructor(props){
        super(props);  
        this.state={
            data:null,
            listInfo:""
        }  
    }
    
    componentDidMount(){
        $.ajax({
            url:"/sort",
            type:"post",
            dataType: 'json',
            contentType : 'application/json',
            success:function(data){
                if(data){
                  this.setState({
                    listInfo : data.data
                  });                   
                }else{
                    listInfo:""
                }
            }.bind(this),
            error:function(){
                alert("请求失败");
            }
        });
    }    

   arraySort(arr, index, isReversed = false){
      arr = arr.sort(function(param1, param2){
          if (typeof param1[index] == "string" && typeof param2[index] == "string") {
            return param1[index].localeCompare(param2[index]);
          }
          //如果参数1为数字，参数2为字符串
          if (typeof param1[index] == "number" && typeof param2[index] == "string") {
            return -1;
          }
          //如果参数1为字符串，参数2为数字
          if (typeof param1[index] == "string" && typeof param2[index] == "number") {
            return 1;
          }
          //如果两个参数均为数字
          if (typeof param1[index] == "number" && typeof param2[index] == "number") {
            return param1[index] - param2[index];
          }
     });

   if (isReversed) {
      return arr.reverse()
   }
      return arr;
   }

    tableSort(index = 0, isReversed){
      let arr = this.state.listInfo;
      arr = this.arraySort(arr, index, isReversed);
      this.setState({
        listInfo:arr
      });
    }


    genRows(){
      let arr = this.state.listInfo;
      if(arr == "")
        return "";
      let rows = arr.map(function(data){
        let tds = data.map(function(data1){
          return <td>{data1}</td>
        })
        return (<tr>{tds}</tr>);
      });
      return rows;
    }

    render(){
        return(
          <table  style={{marginTop:15,marginLeft:15}}>
             <thead>
                  <tr>
                    <th>姓名<b className="up" onClick={this.tableSort.bind(this,0,false)}></b><b className="down" onClick={this.tableSort.bind(this,0,true)}></b></th>
                    <th>年龄<b className="up" onClick={this.tableSort.bind(this,1,false)}></b><b className="down" onClick={this.tableSort.bind(this,1,true)}></b></th>
                    <th>学历<b className="up" onClick={this.tableSort.bind(this,2,false)}></b><b className="down" onClick={this.tableSort.bind(this,2,true)}></b></th>
                  </tr>
             </thead>
             <tbody>
                {this.genRows()}
             </tbody>
          </table>
        );    
    }
}
ReactDOM.render(
    <Sort />, 
   document.getElementById("table")  
);




