/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Platform
  // TabBarIOS,
  // StatusBar,
  // Navigator
} from 'react-native';


//RN添加到原生iOS    http://www.tuicool.com/articles/BfInEv

var NavigatorView = require("./common/navigatorView");

import * as launchImage from 'react-native-launch-image';

var SouHongWang = React.createClass({
  render:function () {
    return(
      <NavigatorView style = {{flex:1}} />
    );
  },

  async componentDidMount(){
       // 随便做点什么，包括可以用await去做异步调用。
       launchImage.hide();
   }
});


AppRegistry.registerComponent('SouHongWang', () => SouHongWang);
