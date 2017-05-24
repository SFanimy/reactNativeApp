
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  PickerIOS
} from 'react-native';

var DownConfig = require("./dropDownViewConfig");

var DownView = React.createClass({
  render:function () {
    var handleBtnPressed = this.handleBtnPressed,
     mSelf = this;

    var ContentView = this.props.content;

    return(

      <View style={styles.container}>

      <View style={styles.btnGroup}>{
        this.state.pickers.map(function (picker, index) {
          return (
            <TouchableHighlight
              style={styles.btnGropuItem}
              underlayColor={'#f1f1f1'}
              onPress={handleBtnPressed.bind(mSelf, index)} >
              <View style={styles.btnGropuItemContainer}>
                <Text allowFontScaling={false}>{mSelf.state.selectedTexts[index]}</Text>
                <Image style={styles.btnGropuItemIcon} source={{uri: 'drop-arrow'}} />
              </View>
            </TouchableHighlight>
          )
        })
      }</View>


      <ContentView
        style={styles.content}
        reqData={this.state.reqData}
        dataType={this.state.dataType}
        dataTypeText={this.state.dataTypeText}
        reqParams={this.state.reqParams}
        parents={this.props.parents || ''} />


      <Animated.View style={[styles.picker, {height: this.state.pickerHeight}]}>
        <TouchableHighlight onPress={this.closePicker.bind(mSelf)}
            underlayColor={'#fff'}
            style={styles.completeChooseBtn}>
            <Text allowFontScaling={false} style={styles.completeChoose}>{'完成'}</Text>
        </TouchableHighlight>
        <PickerIOS
          onValueChange={this.handlePickerChanged.bind(this)}
          selectedValue={this.state.selectedValues[this.state.curPickerIndex]} >{
            this.state.pickers[this.state.curPickerIndex].value.map(function (item, index) {
              return (
                <PickerItemIOS label={item.name} value={item.pName} key={index} style={styles.pickerItem} />
              )
            })
        }
        </PickerIOS>
      </Animated.View>

    </View>
  )
    );
  },

  // 处理PickerIOS选择事件
handlePickerChanged(newVal) {
  // 鉴于state的特性不能直接修改，需要借助中间变量复制数组然后重新使用setState来修改状态
  var curPickerIndex = this.state.curPickerIndex;
  var tempValues = _.clone(this.state.selectedValues),
      tempTexts = _.clone(this.state.selectedTexts);
  const newValText =getNameByPName(newVal, this.state.pickers[curPickerIndex].value);
  tempValues[curPickerIndex] = newVal;
  tempTexts[curPickerIndex] = newValText;
  this.setState({
    selectedValues: tempValues,
    selectedTexts: tempTexts,
    newVal: newVal,
    newValText: newValText,
  }, function() {
  });
}

// 不需要发送ajax请求的drop修改处理事件
// 通过修改state中的dataType，来改变传给子组件的props，然后在子组件中修改对应的state来刷新view
_changeDataType(dataType, dataTypeText) {
  this.setState({
    dataType: dataType,
    dataTypeText: dataTypeText,
  });
}

closePicker() {
  if (this.state.pickers[this.state.curPickerIndex].ajaxRequired) {
      (this.props.contentType == 'list') ? (this.setParams()) : (this.getData());
  } else {
      this._changeDataType(this.state.newVal, this.state.newValText);
  }

  Animated.timing(
     this.state.pickerHeight,
     {toValue: 1},
  ).start();
}
// 处理PickerIOS选择事件
handlePickerChanged(newVal) {
  // 鉴于state的特性不能直接修改，需要借助中间变量复制数组然后重新使用setState来修改状态
  var curPickerIndex = this.state.curPickerIndex;
  var tempValues = _.clone(this.state.selectedValues),
      tempTexts = _.clone(this.state.selectedTexts);
  const newValText =getNameByPName(newVal, this.state.pickers[curPickerIndex].value);
  tempValues[curPickerIndex] = newVal;
  tempTexts[curPickerIndex] = newValText;
  this.setState({
    selectedValues: tempValues,
    selectedTexts: tempTexts,
    newVal: newVal,
    newValText: newValText,
  }, function() {
  });
}

// 不需要发送ajax请求的drop修改处理事件
// 通过修改state中的dataType，来改变传给子组件的props，然后在子组件中修改对应的state来刷新view
_changeDataType(dataType, dataTypeText) {
  this.setState({
    dataType: dataType,
    dataTypeText: dataTypeText,
  });
}

closePicker() {
  if (this.state.pickers[this.state.curPickerIndex].ajaxRequired) {
      (this.props.contentType == 'list') ? (this.setParams()) : (this.getData());
  } else {
      this._changeDataType(this.state.newVal, this.state.newValText);
  }

  Animated.timing(
    this.state.pickerHeight,
    {toValue: 1},
  ).start();
}
});

module.exports = DownView;
