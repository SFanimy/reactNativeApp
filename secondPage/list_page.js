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
  ListView,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Platform
} from 'react-native';

import PullRefreshScrollView from 'react-native-pullrefresh-scrollview';
import Swiper from 'react-native-swiper';
import {PullList} from 'react-native-pull';
var Util = require("./../common/util");
var Douban_APIS = require("./../common/service");
var List_Item = require("./list_item");
var NavigatorTitle = require("./../common/navigatorTitle");
var ButtonView = require("./buttonView");
var HeaderShowView = require("./headerShowView");

var List_Page = React.createClass({

  getInitialState:function () {
    var ds = new ListView.DataSource({
      rowHasChanged:(oldRow,newRow) => oldRow !== newRow
    });
    return{
      baseData:{},
      dataSource:ds,
      show:false,
      refresh:false,
      slide:[],
      page:1,
      hiddenType:1,
      selectedTab:0,
      lid: "",
      pid: "",
      fid: "",
      sid: ""
    };
  },

  //点击详情
  _showDetail:function (title,url) {

  },

  getData:function () {

    var that = this;
    var url = Douban_APIS.star_url + "&&page=" + this.state.page;

    Util.getRequest(url,function (data) {

      if (!data.datas.searchList || data.datas.searchList.length === 0) {
        return alert(暂无数据);
      }

      that.setState({
        show:false
      });

      var ds = new ListView.DataSource({
        rowHasChanged:(oldRow,newRow) => oldRow !== newRow
      });

      var datas = data.datas;
      var lists = data.datas.searchList;
      var sliders = data.datas.slideList;

      that.setState({
        baseData:datas,
        show:true,
        refresh:true,
        slide:sliders,
        dataSource:ds.cloneWithRows(lists)
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
      <View style={styles.container}>
        {
          this.state.show ?
          <ListView
          renderScrollComponent = {this._renderScroller}
          renderRow = {this._renderRow}
          dataSource = {this.state.dataSource}
          initialListSize = {20}
          renderHeader = {this._renderHeader}
          renderSeparator = {this._renderSerpartor}

                />
        :Util.loading
      }
      </View>
    );
  },

  componentDidMount:function () {
    this.setState({
      show:false
    });
    this.getData();
  },

  _onPullRelease:function(PullRefresh) {

    this.state.page  = 1;
    var that = this;
    var url = Douban_APIS.star_url + "&&page=" + this.state.page;

    Util.getRequest(url,function (data) {

      if (!data.datas.searchList || data.datas.searchList.length === 0) {
        return alert(暂无数据);
      }

      var ds = new ListView.DataSource({
        rowHasChanged:(oldRow,newRow) => oldRow !== newRow
      });

      var datas = data.datas;
      var lists = data.datas.searchList;
      var sliders = data.datas.slideList;

      that.setState({
        baseData:datas,
        show:true,
        refresh:true,
        slide:sliders,
        dataSource:ds.cloneWithRows(lists)
      });
      PullRefresh.onRefreshEnd();
    },function (error) {
      alert(error);
       PullRefresh.onRefreshEnd();
    })
  },

  // 请求网络数据将加载更多数据状态改为已加载完成   http://www.jianshu.com/p/63debef0ff24
  _onLoadMore:function(PullRefresh){
    console.log("_onLoadMore");
    if (this.state.baseData.totalPage === this.state.page) {
      setTimeout(() => {
          PullRefresh.onLoadMoreEnd();
      }, 1000);

    }else {
    setTimeout(() =>{
      var pages =  this.state.page ;
      this.state.page  = pages+1;
      this.getData();
    }, 2000);
    }
  },

  _renderScroller:function (props) {
    return <PullRefreshScrollView onRefresh={this._onPullRelease} onLoadMore={this._onLoadMore} useLoadMore={1}{...props} />;
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


   _showDetailSelect:function (index) {

     this.state.selectedTab = index;
     var lists = [];

     if (this.state.hiddenType === 1) {
       this.state.hiddenType = 0;
     }else {
       this.state.hiddenType = 1;
     }

     for (var i = 0; i < 4; i++) {
       if (index === 0) {
         lists = this.state.baseData.labelList;
       }
       if (index === 1) {

       }
       if (index === 2) {
         lists = this.state.baseData.fansList;
       }
       if (index === 3) {
         lists = ["男","女"];
       }
     }
     console.log("+++++++++++++");
     return(
       <HeaderShowView/>
     );
   },

   _hiddenDetailSelect:function (index) {
     var that = this;
     var lists = [];

     if (this.state.selectedTab === index) {
       if (this.state.hiddenType === 1) {
         this.state.hiddenType = 0;
       }else {
         this.state.hiddenType = 1;
       }

     }else {
       this.state.selectedTab = index;
       for (var i = 0; i < 4; i++) {
         if (index === 0) {
           lists = this.props.datas.labelList;
         }
         if (index === 1) {

         }
         if (index === 2) {
           lists = this.props.datas.fansList;
         }
         if (index === 3) {
           lists = ["男","女"];
         }
       }
     }
   },


   _renderHeader:function () {
     var buttonArray = [];
     var labels = ["领域","平台","粉丝","性别"];
     for (var i = 0; i < 4; i++) {
       buttonArray.push(
         <TouchableOpacity style = {styles.button_item} key={i+100} onPress = {this.state.hiddenType?this._showDetailSelect.bind(this,i):this._hiddenDetailSelect.bind(this,i)}>
           <Text style = {styles.label_item}>{labels[i]}</Text>
           <Image style = {styles.imgae_item} source = {require("./../resource/secondP/uparrow.png")}/>
         </TouchableOpacity>
       );
     }

     return(
       <View>
         <NavigatorTitle title="广告列表"/>
         <Swiper height = {100}
                 loop={true}
                 index={0}
                 autoplay={true}>
           {this._renderPage(this.state.slide)}
         </Swiper>
         <View style = {{height:this.state.hiddenType?64:54,backgroundColor:"#d1f9ff"}}>
           <View style = {styles.button_view}>
             {buttonArray}
           </View>
         </View>
       </View>
     );
   },


  _renderRow:function (list,rowID:number) {

    return <List_Item list = {list}/>;
  },

  _renderSerpartor:function (sectionID:number,rowID:number) {
    var style = {
      height:1,
      backgroundColor:"gray",
    };
    return <View style = {style} key = {sectionID+rowID}></View>
  },

  _renderFooter:function () {
    return (
        <View style={{height: 24}}>
        </View>
    );
  }
});

var styles = StyleSheet.create({
  page: {
       flex: 1,
       resizeMode: 'stretch'
   },

   button_view:{
     height:44,
     width:Util.windowSize.width,
     flexDirection:"row",
     backgroundColor:"white",
     marginTop:10,
   },

   button_item:{
     width:Util.windowSize.width/4,
     height:14,
     marginTop:15,
     flexDirection:"row",
     justifyContent:"center"
   },

   label_item:{
     width:30,
     fontSize:14,
     color:"black",
     lineHeight:14,
     textAlign:"center",

   },

   image_item:{
     marginTop:15,
     width:14,
     height:14,
     marginLeft:5,
     justifyContent: 'center',
   },

   headerShowView:{
     height:88,
     width:Util.windowSize.width,
     backgroundColor:"white",

   }
});




module.exports = List_Page;
