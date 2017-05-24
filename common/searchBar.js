/*
实现功能：封装搜索栏组件 包括文本输入和搜索按钮

包含组件：

外部导入：
输入框和按钮的属性设置由外部输入  例如：placeholder、onPress、onChangeText
使用 ...this.props 将外部传入的属性设置给TextInput 和 TouchableOpacity
注意：指定高度、边框颜色、边框线宽
*/

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';

var SearchBar = React.createClass({
  render:function () {
    return(
      <View style = {styles.container}>
        <View style = {styles.inputContainer}>
          <TextInput
          style = {styles.input} {...this.props}/>
        </View>

        <TouchableOpacity style = {styles.button} {...this.props}>
          <Text style = {styles.search}>搜索</Text>
        </TouchableOpacity>
      </View>
    );
  }
});


var styles = StyleSheet.create({
  container:{
    flexDirection:"row",
    justifyContent:"flex-end",
    alignItems:"center",
    height:44,
    marginTop:24,
  },

  inputContainer:{
    flex:1,
    marginLeft:5,
  },

  input:{
    flex:1,
    height:44,
    borderWidth:1,
    borderRadius:4,
    borderColor:"#cccccc",
    paddingLeft:5,
  },

  button:{
    width:55,
    height:44,
    marginLeft:5,
    marginRight:5,
    backgroundColor:"#23beff",
    borderRadius:4,
    justifyContent:"center",
    alignItems:"center",
  },

  search:{
    flex:1,
    color:"#ffffff",
    fontSize:15,
    fontWeight:"bold",
    textAlign:"center",
    lineHeight:44
  }
});


module.exports = SearchBar;
