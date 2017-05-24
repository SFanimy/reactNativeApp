/*
实现功能：封装header  在头部显示标题和返回按钮

包含组件：

外部传入：
navigator  点击返回按钮返回上一级页面
initObj（backName、barTitle） 返回按钮的名称、标题
*/

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';


var Icon = require("./left_Icon");

var Header = React.createClass({
  render:function () {

    //获取obj对象  包括：backName barTitle
    var headerContent = this.props.initObj;

    return(
      <View>
      <View style = {styles.barView}></View>

      <View style = {styles.header}>
        <TouchableOpacity style = {styles.left_btn} onPress = {this._pop}>
          <Icon/>
          <Text style = {styles.btn_text}>{headerContent.backName}</Text>
        </TouchableOpacity>

        <View style = {styles.title_container}>
          <Text style = {styles.title} numberOfLines = {1}>{headerContent.barTitle}</Text>
        </View>
      </View>
      </View>
    );
  },

  //返回按钮事件处理方法
  _pop:function () {
    this.props.navigator.pop();
  }

});

var styles = StyleSheet.create({
  barView:{
    height:20,
    backgroundColor:"#3497ff",
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
  },

  header:{
    height:44,
    backgroundColor:"#3497ff",
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
  },

  left_btn:{

    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
  },

  btn_text:{

    color:"#ffffff",
    fontSize:17,
    fontWeight:"bold",
  },

  title_container:{

    flex:1,
    height:44,
    justifyContent:"center",
    alignItems:"center",
  },

  title:{

    color:"#ffffff",
    fontSize:18,
    fontWeight:"bold",
    lineHeight:20,
  }
});


module.exports = Header;
