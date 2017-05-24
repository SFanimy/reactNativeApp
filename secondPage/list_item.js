import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

var Util = require("./../common/util");

var List_Item = React.createClass({

  render:function () {
    var lists = this.props.list;
    var labels =[];
    labels = lists.labels;

    var array = [];
    var number = 2;
    for(var i=0;i<labels.length;i++){
      if (Util.windowSize.width >320) {
        number = 3;
      }
      if (i <number) {
        array.push(
          <View style = {styles.label_view} key={i+100}>
            <Text style = {styles.label_item} key={i}>{labels[i]}</Text>
          </View>
        );
      }
    }

    return(
      <TouchableOpacity style = {styles.item}>
        <View style = {styles.image_Container}>
          <Image
          style = {styles.image_view}
          resizeMode = "contain"
          source = {{uri:lists.pic_url}}/>
        </View>

        <View>
          <View style = {styles.name_view}>
            <Text style = {styles.name_title}>{lists.star_name}</Text>
          </View>

          <View style = {styles.middle_view}>
            <View style = {styles.label_Container}>
              {array}
            </View>
            {
              labels.length >number ?(
                <TouchableOpacity style = {styles.button_view}>
                  <Image style = {styles.button_item} source = {require("./../resource/secondP/more.png")}/>
                </TouchableOpacity>
              ):null
            }
          </View>

          <View style = {styles.bottom_view}>
            <Text style = {styles.fans_item}>粉丝数:</Text>
            <Text style = {styles.fans_num}>{lists.fans_num}</Text>
            <Text style = {styles.price_item}>报价:</Text>
            <Text style = {styles.price_num}>{lists.min_price}</Text>
          </View>

        </View>

      </TouchableOpacity>
    );
  }
});

var styles = StyleSheet.create({
  item:{
    flexDirection:"row",
    height:110,
    padding:15,
    backgroundColor:"#e3e7ff",
  },

  image_Container:{

    width:80,
    height:80,
    justifyContent: 'center',
  },

  image_view:{
    width:80,
    height:80,
    justifyContent: 'center',
  },

  name_view:{
    marginLeft:10,
    marginRight:15,
  },

  name_title:{
    fontSize:14,
    color:"#2c323c",
    lineHeight:20,
    textAlign:"left",
  },

  middle_view:{
    marginLeft:5,
    width:Util.windowSize.width -115,
    height:24,
    flexDirection:"row",
    marginTop:7,
  },

  label_Container:{
    height:24,
    flexDirection:"row",
    justifyContent:"flex-start",
  },

  label_view:{
    backgroundColor:"blue",
    width:60,
    borderRadius:18,
    height:24,
    marginLeft:5,
  },

  label_item:{
    fontSize:12,
    color:"white",
    lineHeight:20,
    textAlign:"center",
    marginLeft:5,
    marginTop:2,
    height:20,
    width:50,
  },

  button_view:{
    marginRight:30,
    width:35,
    height:24,
    justifyContent:"flex-end",
    flexDirection:"row-reverse",
    borderRadius:12,
    borderColor:"gray",
    borderWidth:1,
  },

  button_item:{
    width:14,
    height:14,
    justifyContent:"center",
    marginLeft:10,
    marginTop:5,
  },

  bottom_view:{
    marginLeft:10,
    marginRight:15,
    marginTop:7,
    alignItems:"center",
    flexDirection:"row",
  },

  fans_item:{
    fontSize:14,
    color:"#808080",
    lineHeight:20,
    textAlign:"left",
  },

  fans_num:{
    fontSize:14,
    color:"red",
    lineHeight:20,
    textAlign:"left",
  },

  price_item:{
    fontSize:14,
    color:"#808080",
    lineHeight:20,
    textAlign:"left",
    marginLeft:20,
  },

  price_num:{
    fontSize:14,
    color:"red",
    lineHeight:20,
    textAlign:"left",
  },

});

module.exports = List_Item;
