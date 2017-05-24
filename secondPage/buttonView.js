import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ListView
} from 'react-native';

var Util = require("./../common/util");


var ButtonView = React.createClass({

  //设置初始状态  对tabbar状态改变
  getInitialState:function () {
    var ds = new ListView.DataSource({
      rowHasChanged:(oldRow,newRow) => oldRow !== newRow
    });
    return{
      selectedTab:0,
      hiddenType:1,
      dataSource:ds,
    }
  },


  _showDetail:function (index) {
    console.log(index);
    this.state.selectedTab = index;
    if (this.state.hiddenType === 1) {
      this.state.hiddenType = 0;
    }else {
      this.state.hiddenType = 1;
    }

    var ds = new ListView.DataSource({
      rowHasChanged:(oldRow,newRow) => oldRow !== newRow
    });
    var that = this;
    for (var i = 0; i < 4; i++) {
      var lists = [];

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



      that.setState({
        dataSource:ds.cloneWithRows(lists)
      });
    }
  },

  _hiddenDetail:function (index) {
    var ds = new ListView.DataSource({
      rowHasChanged:(oldRow,newRow) => oldRow !== newRow
    });
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
    that.setState({
        dataSource:ds.cloneWithRows(lists)
      });
  },


  render:function () {
    return(
      <ListView
      renderHeader = {this._renderHeader}
      dataSource = {this.state.dataSource}
      renderRow = {this._renderRow}
      enableEmptySections = {true}
      contentContainerStyle={styles.listViewStyle}
    />
    );
  },

  _renderHeader:function () {
    var buttonArray = [];
    var labels = ["领域","平台","粉丝","性别"];
    for (var i = 0; i < 4; i++) {
      buttonArray.push(
        <TouchableOpacity style = {styles.button_item} key={i+100} onPress = {this.state.hiddenType?this._showDetail.bind(this,i):this._hiddenDetail.bind(this,i)}>
          <Text style = {styles.label_item}>{labels[i]}</Text>
          <Image style = {styles.imgae_item} source = {require("./../resource/secondP/uparrow.png")}/>
        </TouchableOpacity>
      );
    }

    return(
      <View style = {{height:this.state.hiddenType?64:55,backgroundColor:"#d1f9ff"}}>
        <View style = {styles.button_view}>
          {buttonArray}
        </View>
      </View>
    );
  },

  _renderRow:function (list,rowID:number) {
    if (this.state.selectedTab === 0) {
      return(
        <Text style = {styles.list_label}>{list.name}</Text>
      );
    }
    if (this.state.selectedTab === 1) {
       <Text style = {styles.list_label}>平台</Text>
    }
    if (this.state.selectedTab === 2) {
      return(
        <Text style = {styles.list_label}>{list.level}</Text>
      );
    }
    if (this.state.selectedTab === 3) {
      return(
        <Text style = {styles.list_label}>{list}</Text>
      );
    }
  },

  _renderFooter:function () {

    return (
        <View style={{height: 24}}>
        </View>
    );
  }

});

var styles = StyleSheet.create({
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

  list_label:{
    width:(Util.windowSize.width)/4,
    fontSize:14,
    color:"black",
    lineHeight:30,
    textAlign:"center",
  },

  listViewStyle:{
        // 主轴方向
        flexDirection:"row",
        // 一行显示不下,换一行
        flexWrap:"wrap",
        // 侧轴方向
        // alignItems:"center", // 必须设置,否则换行不起作用
        backgroundColor:"white",
        alignItems:"flex-start"
    },
});

module.exports = ButtonView;
