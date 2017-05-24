/*
实现功能： 封装webView  根据传入的url展示网页信息

包含组件：Header WebView

外部传入：
给Header设置：navigator  initObj（nackName title）
给WebView设置：source
*/


import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  WebView
} from 'react-native';


var Header = require("./header");

var CustomView = React.createClass({
  render:function () {
    return(
      <View style = {{backgroundColor:"white",flex:1}}>
        <Header
          navigator = {this.props.navigator}
          initObj = {{
            backName:this.props.backName,
            barTitle:this.props.barTitle
          }}/>

        <WebView
        startInLoadingState = {true}
        contentInset = {{top:0,bottom:-64}}
        source = {{url:this.props.url}}/>

      </View>
    );
  }
});

module.exports = CustomView;
