/*
图书列表模块：搜索栏、图书列表
图书列表内容：通过调用图书搜索获得多条图书数据
图书列表Item是单独封装的
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
  ScrollView
} from 'react-native';

import Swiper from 'react-native-swiper';
var Util = require("./../common/util");
var SearchBar = require("./../common/searchBar");
var Douban_APIS = require("./../common/service");
var NavigatorTitle = require("./../common/navigatorTitle");
var Book_KindItem = require("./book_kinditem");
var Book_HotItem = require("./book_hotitem");
var Book_AllItem = require("./book_allitem");

var headerData = ["热门网红"];


var BookList = React.createClass({
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
      label:[],
      slide:[]
    };
  },


  getData:function () {
    this.setState({
      show:false
    });
    var that = this;
    var url = Douban_APIS.souhong_url;

    Util.getRequest(url,function (data) {

      if (!data.labelList || data.labelList.length ==0 ||!data.allStarLabelList || data.allStarLabelList.length ==0) {
        return alert(未找到相关数据);
      }
      var dataBlob = {},
      sectionIDs = [],
      rowIDs = [],
      sliderLsit =[],
      recommendList =[],
      labelList = [],
      allStarLabelList = [];
//    1. 获取数据
       slideList = data.slideList;
       labelList = data.labelList;
       recommendList = data.recommendList;

//    2. 把组号放入sectionIDs数组中
       sectionIDs.push(0);
//    3. 把组中的内容放入dataSource内容中
       dataBlob[0] ="";
//    4. 先确定rowIDs的第一维
       rowIDs[0] = [];
//    5. 遍历数组,确定rowIDs的第二维
       for (var j = 0 ; j < labelList.length ; j++){
//    把每一行中的内容放入dataSource对象中
        if (j <=8) {
          rowIDs[0].push(j);
          dataBlob[0+':'+j] = labelList[j];
        }
      }


      sectionIDs.push(1);
      dataBlob[1] = headerData[0];
      rowIDs[1] = [];
      for (var j = 0 ; j < recommendList.length ; j++){
        rowIDs[1].push(j);
        dataBlob[1+':'+j] = recommendList[j];
     }


      allStarLabelList = data.allStarLabelList;
      for (var i = 0; i < allStarLabelList.length; i++) {
        var stars = [],
        r = i+2;
        rowIDs[r] = [];
        stars = allStarLabelList[i].stars;

        sectionIDs.push(r);
        dataBlob[r] = allStarLabelList[i].label_name;

        for (var h = 0 ; h < stars.length ; h++){
            rowIDs[r].push(h);
            dataBlob[r+':'+h] =stars[h];
        }
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
         baseData:data,
         dataSource: ds.cloneWithRowsAndSections(dataBlob,sectionIDs,rowIDs),
         slide:slideList,
         label:labelList
      });

    },function (error) {
      alert(error);
    })
  },

//详情
  _showDeatil:function () {

  },

  render:function () {
    return(
      <ScrollView >
        <NavigatorTitle title="搜红网"/>
        {
          this.state.show?
          <ListView
          dataSource = {this.state.dataSource}
          renderHeader = {this._renderHeader}
          renderSectionHeader = {this._renderSectionHeader}
          renderRow = {this._renderRow}
          initialListSize = {100}
          renderSeparator = {this._renderSerpartor}
          contentContainerStyle={styles.listViewStyle}
          renderFooter = {this._renderFooter}/>
           :Util.loading
        }
      </ScrollView>
    );
  },
  componentDidMount:function () {
    //请求数据
    this.getData();
  },

  _renderPage:function () {
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
       <Swiper height = {100}
               loop={true}
               index={0}
               autoplay={true}
               marginLeft={-10}
               width = {Util.windowSize.width +10}>
         {this._renderPage(this.state.slide)}
       </Swiper>
       </View>
     );
   },

  _renderFooter:function () {
    return (
        <View style={styles.footer}>
        </View>
    );
},


  _renderSectionHeader:function (sectionData,sectionID) {

    if (sectionID ===0) {
      return(
        <View style = {{height:10}}>
          <Text></Text>
        </View>
      );
    }

    return(
      <View style = {styles.header}>
        <Text style = {styles.header_title}>     {sectionData}</Text>
      </View>
    );
  },

  _renderRow:function (rowData,sectionID:number,rowID:number) {
    if (sectionID === 0) {
      return <Book_KindItem kind = {rowData}  style = {styles.itemViewStyle}/>;
    }

    if (sectionID === 1) {
      return <Book_HotItem recoment = {rowData}  style = {styles.itemViewStyle}/>;
    }

      return <Book_AllItem recoment = {rowData}  style = {styles.itemViewStyle}/>;
  },

  _renderSerpartor:function (sectionID:number,rowID:number) {

    return <View style = {styles.linestyle} key = {100*sectionID+rowID}></View>
  }
});

var styles = StyleSheet.create({
  listViewStyle:{
        // 主轴方向
        flexDirection:"row",
        // 一行显示不下,换一行
        flexWrap:"wrap",
        // 侧轴方向
        // alignItems:"center", // 必须设置,否则换行不起作用
        backgroundColor:"white",
        marginBottom:24,
        padding:10,
        marginTop:-9,
        alignItems:"flex-start"
    },

  header:{
    height:54,
    marginLeft:-10,
    backgroundColor:"#dbe6d3",
    width:Util.windowSize.width,
    flexDirection:"row",
  },

  header_title:{
    fontSize:14,
    fontWeight:"bold",
    textAlign:"left",
    lineHeight:44,
    marginTop:10,
    backgroundColor:"white",
    width:Util.windowSize.width,
  },

  linestyle : {
    height:10,
    backgroundColor:"yellow",
  },

  footer:{
    height:24,
    backgroundColor:"#dbe6d3",

  },

  page: {
       flex: 1,
       resizeMode: 'stretch'
   }
});

module.exports = BookList;
