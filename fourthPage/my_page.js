/*
电影列表模块：搜索栏、图书列表
电影列表内容
电影列表Item是单独封装的
*/

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ListView,
  ScrollView,
  Platform
} from 'react-native';

import PullRefreshScrollView from 'react-native-pullrefresh-scrollview';
var Util = require("./../common/util");
var Douban_APIS = require("./../common/service");
var MovieItem = require("./../movie/movie_item");
var NavigatorTitle = require("./../common/navigatorTitle");

var FourthPage = React.createClass({
  getInitialState:function () {
    var ds = new ListView.DataSource({
      rowHasChanged:(oldRow,newRow) => oldRow !== newRow
    });
    return{
      dataSource:ds,
      show:false,
      keywords: "哈利波特"
    };
  },

//搜索方法
  _changeText:function (text) {
    this.setState({
      keywords:text
    });
  },
  _searchPress:function () {
    this.getData();
  },

  //点击详情
  _showDetail:function (title,url) {

  },

  getData:function () {
    this.setState({
      show:false
    });
    var that = this;
    var url = Douban_APIS.movie_search + "?count=20&q=" +this.state.keywords;
    Util.getRequest(url,function (data) {
      if (!data.subjects || data.subjects.length ==0) {
        return alert(未找到相关电影);
      }
      var ds = new ListView.DataSource({
        rowHasChanged:(oldRow,newRow) => oldRow !== newRow
      });
      var movies = data.subjects;


      that.setState({
        show:true,
        dataSource:ds.cloneWithRows(movies)
      });

    },function (error) {
      alert(error);
    })
  },

  render:function () {
    return(
      <View style={styles.container}>
        <NavigatorTitle
        title = "我的"/>
        {
          this.state.show ?
          <ListView
          renderScrollComponent = {this._renderScroller}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
                />
        :Util.loading
      }
      </View>
    );
  },

  componentDidMount:function () {
    this.getData();
  },


  _onRefresh:function (PullRefresh) {
    console.log("_onRefresh");
  },

  _onLoadMore:function (PullRefresh) {
    console.log("_onLoadMore");
  },

  _useLoadMore:function (PullRefresh) {
    console.log("_useLoadMore");
  },


  _renderScroller:function (props) {
    return <PullRefreshScrollView onRefresh={this._onRefresh} onLoadMore={this._onLoadMore} useLoadMore={1}{...props}/>;
  },

  _renderRow:function (movie) {
    return <MovieItem movie = {movie} onPress = {this._showDetail.bind(this,movie.title,movie.alt)}/>;
  },
  _renderSerpartor:function (sectionID:number,rowID:number) {
    var style = {
      height:1,
      backgroundColor:"gray",
    };
    return <View style = {style} key = {sectionID+rowID}></View>
  }
});

var styles = StyleSheet.create({

});

module.exports = FourthPage;
