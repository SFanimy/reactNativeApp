import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ListView
} from 'react-native';

var Util = require("./../common/util");


var HeaderShowView = React.createClass({

  // //设置初始状态  对tabbar状态改变
  // getInitialState:function () {
  //   var ds = new ListView.DataSource({
  //     rowHasChanged:(oldRow,newRow) => oldRow !== newRow
  //   });
  //   return{
  //     dataSource:ds,
  //     selectIndex:this.props.index,
  //   }
  // },

  render:function () {
    console.log("..........");
  console.log(this.props.selectIndex);
    return(
      <ListView
      dataSource = {this.state.dataSource}
      renderRow = {this._renderRow}
      enableEmptySections = {true}
      contentContainerStyle={styles.listViewStyle}/>
    );
  },


  _renderRow:function (list,rowID:number) {
    if (this.state.selectIndex === 0) {
      return(
        <Text style = {styles.list_label}>{list.name}</Text>
      );
    }
    if (this.state.selectIndex === 1) {
       <Text style = {styles.list_label}>平台</Text>
    }
    if (this.state.selectIndex === 2) {
      return(
        <Text style = {styles.list_label}>{list.level}</Text>
      );
    }
    if (this.state.selectIndex === 3) {
      return(
        <Text style = {styles.list_label}>{list}</Text>
      );
    }
  },

});

var styles = StyleSheet.create({
  list_label:{
    width:(Util.windowSize.width)/4,
    fontSize:14,
    color:"black",
    lineHeight:30,
    textAlign:"center",
  },

  listViewStyle:{
        // 主轴方向
        flexDirection:"row",
        // 一行显示不下,换一行
        flexWrap:"wrap",
        // 侧轴方向
        // alignItems:"center", // 必须设置,否则换行不起作用
        backgroundColor:"black",
        alignItems:"flex-start",
        marginBottom:10,
        marginTop:1,
        padding:10,
    }
});

module.exports = HeaderShowView;
