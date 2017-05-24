import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

var Title = React.createClass({
//导航栏右按钮点击事件  加载webview
  _buttonImg:function () {
    alert("导航栏右按钮点击事件  加载webview");
  },

  render:function () {
    return(
      <View>
        <View style = {styles.barView}>
        </View>

        <View style = {styles.header}>
          <View style = {styles.left_view}></View>
          <View style = {styles.title_container}>
          <Text style = {styles.title} numberOfLines = {1}>{this.props.title}</Text>
          </View>

          <TouchableOpacity style = {styles.right_btn} onPress = {this._buttonImg}>
            <Image source = {require("./../resource/firstP/informationICON.png")} style = {styles.image}/>
          </TouchableOpacity>
        </View>
      </View>
    );
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

  left_view:{
  width:35,
  justifyContent:"center",
  height:44,
  },

  title_container:{
    flex:1,
    height:44,
    justifyContent:"center",
    alignItems:"center",
  },

  title:{
    color:"#ffffff",
    fontSize:20,
    fontWeight:"bold",
  },

right_btn:{
  width:35,
  height:44,
  justifyContent:"center",
},

image:{
  width:25,
  height:25,
  justifyContent:"center",
},
});


module.exports = Title;
