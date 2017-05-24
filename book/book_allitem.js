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

var vRecoment = (Util.windowSize.width-10) / 3;

var HotItem= React.createClass({
  render:function () {
    var recoment = this.props.recoment;

    return(
      <TouchableOpacity style  ={styles.item} {...this.props}>

        <View style = {styles.image_view}>
          <Image
          source={{uri:recoment.pic_url}}
          style = {styles.image_style}/>
        </View>

        <View style = {styles.title_view}>
          <Text
            style = {styles.title_style}
            ellipsizeMode='tail'
            numberOfLines={1}>
            {recoment.star_name}
          </Text>
        </View>

       <View style = {styles.fans_Container}>
         <Text style = {styles.fans_style}>粉丝</Text>
         <Text
         style = {styles.fans_text}
         ellipsizeMode='tail'
         numberOfLines={1}>
         {recoment.fans_num}
         </Text>
       </View>

      </TouchableOpacity>
    );
  }
});

var styles = StyleSheet.create({

  item:{
    height:vRecoment+40,
    marginTop:10,
    padding:10,
    flexDirection:"row",
  },


  image_view:{
    width:vRecoment-10,
    height:vRecoment-10,
    marginLeft:5,
    justifyContent: 'center',
  },

  image_style:{
    width:vRecoment-10,
    height:vRecoment-10,
    // borderRadius:(vRecoment-20)/2,
    // justifyContent: 'center',
  },

  title_view:{
    marginTop:5,
    marginLeft:5,
    width:vRecoment-20,
  },

  title_style:{
      fontSize:14,
      color:"#2c323c",
      lineHeight:20,
      textAlign:"left",
    },


  fans_Container:{
      marginLeft:5,
      width:vRecoment-40,
      flexDirection:"row",
      marginBottom:10,
  },

  fans_text:{
      fontSize:12,
      color:"red",
      lineHeight:18,
      textAlign:"left",
    },

  fans_style:{
      fontSize:12,
      color:"#666666",
      lineHeight:18,
      textAlign:"left"
    },

    label_Container:{
      marginLeft:5,
      marginTop:5,
      marginRight:5,
    },

    label_item:{
      fontSize:12,
      color:"white",
      lineHeight:18,
      textAlign:"center",
      padding:5,
      borderRadius:12,
    }
});

module.exports = HotItem;
