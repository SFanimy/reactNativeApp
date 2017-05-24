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
  Image,
  Platform
} from 'react-native';


var BookList = require("./../book/book_list");
// var TabNavigator = require("react-native-tab-navigator");
import TabNavigator from "react-native-tab-navigator";
var MovieList = require("./../secondPage/list_page");
var ThirdPage = require("./../thirdPage/task_page");
var FourthPage = require("./../fourthPage/my_page");



//隐藏状态栏
 // StatusBar.setHidden(true);

//TabBarIOS管理两个模块：图书、电影

var HomePage = React.createClass({
  //设置初始状态  对tabbar状态改变
  getInitialState:function () {
    return{
      selectedTab:"首页",
    }
  },

  render:function () {
    return(
      <TabNavigator>
        <TabNavigator.Item
          title = "首页"
          selected = {this.state.selectedTab === "首页"}
          onPress = {()=>{
            this.setState({
              selectedTab:"首页"
            })
          }}
          titleStyle={styles.textStyle}
          selectedTitleStyle={styles.selectedTextStyle}
          renderIcon={() => <Image source = {require("./../resource/tabbar/tabbarhome.png")} style={styles.iconStyle} />}
          renderSelectedIcon={() => <Image source={require("./../resource/tabbar/tabbarhomeAC.png")} style={styles.selectedIconStyle} />}
        >
          <BookList {...this.props}/>
        </TabNavigator.Item>

        <TabNavigator.Item
        title = "网红列表"
        selected = {this.state.selectedTab === "网红列表"}
        onPress = {()=>{
          this.setState({
            selectedTab:"网红列表"
          })
        }}
        titleStyle={styles.textStyle}
        selectedTitleStyle={styles.selectedTextStyle}
        renderIcon={() => <Image source={require("./../resource/tabbar/tabbarlist.png")} style={styles.iconStyle} />}
        renderSelectedIcon={() => <Image source={require("./../resource/tabbar/tabbarlistAC.png")} style={styles.selectedIconStyle} />}
      >
        <MovieList {...this.props}/>
        </TabNavigator.Item>

        <TabNavigator.Item
        title = "广告列表"
        selected = {this.state.selectedTab === "广告列表"}
        onPress = {()=>{
          this.setState({
            selectedTab:"广告列表"
          })
        }}
        titleStyle={styles.textStyle}
        selectedTitleStyle={styles.selectedTextStyle}
        renderIcon={() => <Image source={require("./../resource/tabbar/tabbaradver.png")} style={styles.iconStyle} />}
        renderSelectedIcon={() => <Image source={require("./../resource/tabbar/tabbaradverAC.png")} style={styles.selectedIconStyle} />}
        >
         <ThirdPage {...this.props}/>
        </TabNavigator.Item>

        <TabNavigator.Item
        title = "我的"
        selected = {this.state.selectedTab === "我的"}
        onPress = {()=>{
          this.setState({
            selectedTab:"我的"
          })
        }}
        titleStyle={styles.textStyle}
        selectedTitleStyle={styles.selectedTextStyle}
        renderIcon={() => <Image source={require("./../resource/tabbar/tabbarME.png")} style={styles.iconStyle} />}
        renderSelectedIcon={() => <Image source={require("./../resource/tabbar/tabbarMEAC.png")} style={styles.selectedIconStyle} />}
        >
        <FourthPage {...this.props}/>
        </TabNavigator.Item>

      </TabNavigator>
    );
  }
});


var styles = StyleSheet.create({
  iconStyle:{
    width:22,
    height:22,
  },

  selectedIconStyle:{
    width:22,
    height:22,
  },

  textStyle:{
    color:"#999"
  },

  selectedTextStyle:{
    color:"black"
  }
})

module.exports = HomePage;
