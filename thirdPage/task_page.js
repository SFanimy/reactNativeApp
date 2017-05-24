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
  ActivityIndicator,
  Platform
} from 'react-native';

import Swiper from 'react-native-swiper';
import {PullList} from 'react-native-pull';
var Util = require("./../common/util");
var Douban_APIS = require("./../common/service");
var TaskItem = require("./task_item");
var NavigatorTitle = require("./../common/navigatorTitle");

var headerData = ["热门任务","企业任务"];


var ThirdPage = React.createClass({

  getInitialState:function () {

    var sectionData = (dataBlob,sectionID) => {

           return dataBlob[sectionID];
    };

    var rowData = (dataBlob,sectionID,rowID) => {

           return dataBlob[sectionID + ":" + rowID];
    };


    var ds = new ListView.DataSource({
      getSectionData:sectionData,
      getRowData:rowData,
      rowHasChanged:(oldRow,newRow) => oldRow !== newRow,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    });
    return{
      baseData:{},
      dataSource:ds,
      show:false,
      refresh:false,
      page:1,
      slide:[]
    };
  },

  //点击详情
  _showDetail:function (title,url) {

  },

  getData:function () {
    this.setState({
      show:false
    });
    var that = this;
    var url = Douban_APIS.task_url +"page="+this.state.page;

    Util.getRequest(url,function (data) {

      if (!data.taskList || data.taskList.length ==0 ||!data.hotTaskList || data.hotTaskList.length ==0) {
        return alert(未找到相关数据);
      }
      var dataBlob = {},
      sectionIDs = [],
      rowIDs = [],
      slideList =[],
      hotTaskList = [],
      taskList = [];

//    1. 设置改组中每条数据的结构
       slideList = data.slideList;
//    2. 把组号放入sectionIDs数组中
       sectionIDs.push(0);
//    3. 把组中的内容放入dataSource内容中
       dataBlob[0] = headerData[0];
       hotTaskList = data.hotTaskList;
//    4. 先确定rowIDs的第一维
       rowIDs[0] = [];
//    5. 遍历数组,确定rowIDs的第二维
       for (var j = 0 ; j < hotTaskList.length ; j++){
//    把每一行中的内容放入dataSource对象中
          rowIDs[0].push(j);
          dataBlob[0+':'+j] = hotTaskList[j];
      }

      sectionIDs.push(1);
      dataBlob[1] = headerData[1];
      taskList = data.taskList;
      rowIDs[1] = [];
      for (var h = 0 ; h < taskList.length ; h++){
          rowIDs[1].push(h);
          dataBlob[1+':'+h] = taskList[h];
      }

      var sectionData = (dataBlob,sectionID) => {
        return dataBlob[sectionID];
      };
      var rowData = (dataBlob,sectionID,rowID) => {
        return dataBlob[sectionID + ":" + rowID];
      };

      var ds = new ListView.DataSource({
        getSectionData:sectionData,
        getRowData:rowData,
        rowHasChanged:(oldRow,newRow) => oldRow !== newRow,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2
     });


      that.setState({
         show:true,
         refresh:true,
         baseData:data,
         dataSource: ds.cloneWithRowsAndSections(dataBlob,sectionIDs,rowIDs),
         slide:slideList
      });

    },function (error) {
      alert(error);
    })
  },


  _topIndicatorRender(pulling, pullok, pullrelease) {
      return <View style = {styles.container}>
      <ActivityIndicator size = "small" color = "gray" />
         <Text style ={{textAlign:"center"}}>努力加载中...</Text>
      </View>;
  },


  render:function () {
    return(
      this.state.show ?
      <PullList
      onPullRelease={this._onPullRelease}
      topIndicatorRender={this._topIndicatorRender}
      topIndicatorHeight = {44}
      dataSource = {this.state.dataSource}
      renderHeader = {this._renderHeader}
      renderSectionHeader = {this._renderSectionHeader}
      renderRow = {this._renderRow}
      renderSeparator = {this._renderSerpartor}
      onEndReachedThreshold={44}
      onEndReached = {this._onLoadMore}
      renderFooter = {this._renderFooter}
      />
      :Util.loading
    );
  },

  componentDidMount:function () {
    this.getData();
  },

  _onPullRelease:function(resolve) {
    setTimeout(() => {
      this.state.page  = 1,
      this.getData();

      resolve();
    }, 1000);
  },

  // 请求网络数据将加载更多数据状态改为已加载完成   http://www.jianshu.com/p/63debef0ff24
  _onLoadMore:function(){

    if (this.state.baseData.totalPage === this.state.page) {
      setTimeout(() => {
        //修改状态
        this.setState({
          refresh:false
        });
      }, 1000);
    }else {
      var pages =  this.state.page ;
      this.state.page  = pages+1;
      this.getData();
    }

  },


  _renderPage:function () {
    console.log(this.state.slide);
    var imageViews=[];
    for(var i=0;i<this.state.slide.length;i++){
        imageViews.push(
            <Image
                key={i}
                style={styles.page}
                source={{uri:this.state.slide[i].photo}}  />
        );
    }
    return imageViews;
   },

   _renderHeader:function () {
     return(
       <View>
         <NavigatorTitle title="广告列表"/>
         <Swiper height = {100}
                 loop={true}
                 index={0}
                 autoplay={true}>
           {this._renderPage(this.state.slide)}
         </Swiper>
       </View>
     );
   },

  _renderFooter:function () {
    if (this.state.refresh) {
      return (
          <View style={{height: 44}}>
              <ActivityIndicator />
          </View>
      );
    }else {
      return (
          <View style={{height: 24}}>
          </View>
      );
    }
},


  _renderSectionHeader:function (sectionData,sectionID) {
    return(
      <View style = {styles.header}>
        <Text style = {styles.header_title}>{sectionData}</Text>
        <View style = {styles.linestyle} ></View>
      </View>
    );
  },

  _renderRow:function (rowData) {
    return <TaskItem task = {rowData} onPress = {this._showDetail.bind(this,rowData.title,rowData.id)}/>;
  },

  _renderSerpartor:function (sectionID:number,rowID:number) {

    return <View style = {styles.linestyle} key = {100*sectionID+rowID}></View>
  }
});



var styles = StyleSheet.create({
  header:{
    height:44,
    backgroundColor:"#F5F5FF",

  },

  header_title:{
    flex:1,
    fontSize:14,
    fontWeight:"bold",
    textAlign:"left",
    lineHeight:34,
    marginLeft:12,
  },

  linestyle : {
    height:1,
    backgroundColor:"#808080",
  },

  footer:{
    height:20,
    backgroundColor:"white",

  },

  page: {
       flex: 1,
       resizeMode: 'stretch'
   }
});

module.exports = ThirdPage;
