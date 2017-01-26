
import React, { Component } from 'react';


import {
   Image,
  View,
  Text,
  StyleSheet,
  ViewPagerAndroid,
  BackAndroid,
  ScrollView,
  Navigator,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  Picker,
  ListView
} from 'react-native';

var Slider = require('react-native-slider');
import Dimensions from 'Dimensions';
import DatePicker from './date.js';
var screenW = Dimensions.get('window').width;
BackAndroid.addEventListener('hardwareBackPress', function() {
  if(_navigator == null){
    return false;
  }
  if(_navigator.getCurrentRoutes().length === 1){
    return false;
  }
  _navigator.pop();
  return true;
});

var _navigator ;


var EditPlanView = React.createClass({

  getInitialState: function(){
    _navigator = this.props.navigator;

    this.state = {
    value: 0.2,

    };
    return {
     value: 0.2,

    };

  },

 render: function(){
      return(
        <ScrollView 
            contentContainerStyle={{flex:1}}
            keyboardDismissMode='on-drag'
            keyboardShouldPersistTaps={false}>
          <View style={styles.maincontain}>
            <View style={[styles.Top,styles.Bottomline]}>
              <View style={[styles.Topbar,styles.Left]}>
                <Image source={require('../img/setting_normal.png') }/>
              </View>
              <View style={styles.Topbar}>
                <Image source={require('../img/ptv_sized.png') }/>
              </View>
              <View style={[styles.Topbar,styles.Right]}>
                <Image source={require('../img/add_pressed.png') }/>
              </View>
            </View>
            <View>
              <Text>Please Choose the Date</Text>
              <DatePicker
                style={styles.sportact}
                date={this.state.date}
                mode="date"
                placeholder="Date"
                format="YYYY-MM-DD"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                onDateChange={(date) => {this.setState({date: date});}}/>
            </View>
            <View>
               <Picker 
                  prompt="Please choose sportclass"
                  style={{width:200}}
                  selectedValue={this.state.sportclass}
                  onValueChange={(value) => this.setState({sportclass: value})}>
                  <Picker.Item label="CHEST" value="CHEST"/>
                  <Picker.Item label="BACK" value="BACK" />
                  <Picker.Item label="lEGS" value="lEGS" />
                  <Picker.Item label="SHOULDERS" value="SHOULDERS" />
                  <Picker.Item label="STOMACH" value="STOMACH" />
              </Picker>
            </View>
            <View>
              <Slider
                value={this.state.value}
                onValueChange={(value) => this.setState({value})} />
              <Text>Value: {this.state.value}</Text>
            </View>
            <View>
              <TouchableOpacity style={styles.btn}
              onPress={this._login}>
              <Text style={styles.text}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        );

  },

});

var styles = StyleSheet.create({
   container:{
    flex: 1,
    backgroundColor: '#38bda0',
    justifyContent: 'center',
  },
  Top:{
    flexDirection: 'row',
    height:50,
    alignItems: 'center',
    backgroundColor:'#38bda0',
    justifyContent: 'center',
  },
  Bottomline:{
    borderBottomWidth:2,
    borderColor:'gray'
  },

  Topbar:{
    flex:1,
    alignItems: 'center',

  },
  Left:{
    position: 'absolute', 
    top: 5, 
    left: 5
  },
  Right:{
    position: 'absolute', 
    top: 5, 
    right: 5,
  },
  maincontain:
  {
    flex: 1,
    backgroundColor: '#38bda0',
    flexDirection:'column',

  },
  listview: {
    flex: 1,
  },
  li: {
    backgroundColor: '#fff',
    borderBottomColor: '#38bda0',
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 16,
    paddingTop: 14,
    paddingBottom: 16,
  },
  liContainer: {
    flex: 2,
  },
  liText: {
    color: '#333',
    fontSize: 16,
  },
});
module.exports = EditPlanView;