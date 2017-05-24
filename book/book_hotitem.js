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

var vRecoment = (Util.windowSize.width-10) / 4;

var RecomentItem= React.createClass({
  render:function () {
    var recoment = this.props.recoment;

    var labels =[];
    labels = recoment.label;

    var array = [];
    for(var i=0;i<labels.length;i++){
      if (i <2) {
        array.push(
          <View key={i+100}  style = {styles.label_view}>
            <Text key={i} style = {styles.label_item}>{labels[i]}</Text>
          </View>
        );
      }
    }

    return(
      <View style  ={styles.item}>
      <TouchableOpacity  {...this.props}>

        <View style = {styles.image_view}>
          <Image source={{uri:recoment.pic_url}}  style = {styles.image_style}/>
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

       <View style = {styles.label_Container}>
          {array}
       </View>

      </TouchableOpacity>
      </View>
    );
  }
});

var styles = StyleSheet.create({

  item:{
    height:vRecoment+70,
    marginTop:10,
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
    borderRadius:(vRecoment-10)/2,
    justifyContent: 'center',
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
      textAlign:"center",
    },


  fans_Container:{
      marginLeft:5,
      width:vRecoment-30,
      flexDirection:"row",
      marginBottom:5,
      alignItems:"center"
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
      textAlign:"right"
    },

    label_Container:{
      marginLeft:5,
      width:vRecoment-10,
      height:20,
      flexDirection:"row",
      width:32,
    },

    label_view:{
      backgroundColor:"blue",
      width:32,
      marginLeft:3,
      flexDirection:"row",
      borderRadius:12,
    },

    label_item:{
      fontSize:12,
      color:"white",
      lineHeight:15,
      textAlign:"center",
      height:15,
      marginLeft:3,
      marginTop:2
    }


});

module.exports = RecomentItem;
