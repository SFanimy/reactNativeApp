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

var vRecoment = (Util.windowSize.width-20) / 5;

var KindItem= React.createClass({
  render:function () {

    var kind = this.props.kind;

    return(
      <View style  ={styles.item}>
      <TouchableOpacity {...this.props}>
        <View style = {styles.image_view}>
           <Image source={{uri:kind.img}}  style = {styles.image}/>
        </View>

        <View style = {styles.label_view}>
          <Text style = {styles.label}>{kind.name}</Text>
        </View>
      </TouchableOpacity>
      </View>
    );
  }
});

var styles = StyleSheet.create({

  item:{
    height:vRecoment+30,
    marginTop:15,
    flexDirection:"row",
  },

  image_view:{
    width:vRecoment-10,
    height:vRecoment-10,
    marginLeft:5,
    justifyContent: 'center',
  },

  image:{
    width:vRecoment-10,
    height:vRecoment-10,
    borderRadius:(vRecoment-10)/2,
    justifyContent: 'center',
  },

  label_view:{
    marginTop:5,
    width:vRecoment,
  },

  label:{
    fontSize:14,
    color:"#2c323c",
    lineHeight:20,
    textAlign:"center",
  }
});

module.exports = KindItem;
