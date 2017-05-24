import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

var TaskItem = React.createClass({
  render:function () {

    var task = this.props.task;


    return(
      <TouchableOpacity style = {styles.item} {...this.props}>
        <View style = {styles.left_Container}>
          <View style = {styles.title_Container}>
            <Text style = {styles.title_text}>{task.title}</Text>
          </View>

          <View style = {styles.price_Container}>
            <Text style ={styles.baojia_text}>报价：</Text>
            <Text style = {styles.price_text}>{task.price}</Text>
          </View>

          <View style = {styles.date_Container}>
            <Text style ={styles.date_text}>截止时间：{task.finish_date}</Text>
          </View>
        </View>

        <TouchableOpacity style = {styles.button_Container}>
          <Text style = {styles.button_item}>查看详情</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }
});

var styles = StyleSheet.create({
  item:{
    flexDirection:"row",
    height:90,
    padding:10,
    backgroundColor:"#e6e6e6",
  },

  left_Container:{
    flex:1,
  },

  title_Container:{
      marginLeft:5,
  },

  title_text:{
    fontSize:14,
    color:"#2c323c",
    lineHeight:25,
  },

  price_Container:{
      marginLeft:5,
      flex:1,
      flexDirection:"row",
      marginTop:10,
  },

  price_text:{
    fontSize:12,
    color:"red",
    lineHeight:16,
  },

  baojia_text:{
    fontSize:12,
    color:"#666666",
    lineHeight:16,
  },

  date_Container:{
      marginLeft:5,
      flex:1,
      flexDirection:"row",
      marginTop:5
  },

  date_text:{
    fontSize:12,
    color:"#666666",
    lineHeight:16,
  },


  button_Container:{
    width:80,
    height:34,
    marginRight:25,
    marginTop:25,
    borderColor:"blue",
    borderRadius:24,
    borderWidth:1,
    justifyContent:"center",
    backgroundColor:"white",
  },

  button_item:{
    color:"blue",
    fontSize:12,
    textAlign:"center",
  }
});

module.exports = TaskItem;
