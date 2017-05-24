/*
实现功能：封装导航器初始化设置

包含组件：Navigator

外部传入：
component：需要显示的页面组件
route对象  必须添加component属性，如果需要传值可以添加passProps属性
*/

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';

var HomePage = require("./homePage");

var NavigatorView = React.createClass({

  render:function () {
    //创建route对象  约定格式
    var rootRoute = {
      component:HomePage,
      name:"HomePage",
      passProps:{

      }
    };

    return(
      <View style = {{flex:1}}>
      <Navigator
      style = {{flex:1}}
      initialRoute = {rootRoute}
      configureScene = {() =>{return Navigator.SceneConfigs.PushFromRight}}
      renderScene = {(route,navigator) =>{
        var Component = route.component;
        _navigator = navigator;
        return(
          <Component navigator = {navigator} {...route.params}/>
        );
      }}/>
      </View>
    );
  }
});

var styles = StyleSheet.create({

});

module.exports = NavigatorView;
