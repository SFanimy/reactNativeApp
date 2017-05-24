/*
实现功能：定义多个属性，在项目中会使用的一些功能，包括：获取屏幕尺寸、loading组件、GET请求方法

包含组件：

外部传入：
GET请求方法需要从外部传入url，请求成功的回调方法，请求失败的回调方法
*/


import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator
} from 'react-native';


var Util = {
  //屏幕尺寸
  windowSize:{
    width:Dimensions.get("window").width,
    height:Dimensions.get("window").height
  },

  //基于fetch的get方法  只负责下载数据  下载后的处理操作在回调中实现
  //successCallBack   数据下载成功的回调方法   在组建中实现
  //failCallBack  数据下载失败的回调方法   在组建中实现

  getRequest:function (url,successCallBack,failCallBack) {

    fetch(url)
    .then((response) => response.json())
    .then((responseData) => successCallBack(responseData))
    .catch((error) => failCallBack(error));

  },

  loading:<ActivityIndicator style = {{marginTop:200}}/>
}

module.exports = Util;
