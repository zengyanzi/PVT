
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
  Picker
} from 'react-native';
import DatePicker from './date.js';

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



var PlanView = React.createClass({

  getInitialState: function(){
    _navigator = this.props.navigator;
    this.state = {
      sporttype: null
    };
    return {
    };
  },

 render: function(){
       return (
      <ScrollView 
        contentContainerStyle={{flex:1}}
        keyboardDismissMode='on-drag'
        keyboardShouldPersistTaps={false}>
         
       <View style={styles.container}>
          <View style={styles.Top}>
           <Text style={styles.WelcomeText}>My plan manage</Text>
          </View>
       </View>

       <View style={styles.maincontain}>
           <Text >
              Picker选择器实例
            </Text>
            <Picker 
              prompt="Please choose sporttype"
              style={{width:200}}
              selectedValue={this.state.sporttype}
              onValueChange={(value) => this.setState({sporttype: value})}>
              <Picker.Item label="CHEST" value="CHEST" />
              <Picker.Item label="BREST" value="BREST" />
            </Picker>
              <TextInput  onChangeText={(text) => this.setState({sportsize: text})} style={styles.sportact}  keyboardType="numeric" placeholder='Target'/>
              <DatePicker
                style={styles.sportdate}
                date={this.state.date}
                mode="date"
                placeholder="Date"
                format="YYYY-MM-DD"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                onDateChange={(date) => {this.setState({date: date});}}/>

        </View>
         
      </ScrollView>

       );
  },

});

var styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#F4FCFF',
  },
  Top:{
    height:50,
    alignItems: 'center',
    backgroundColor:'#f5f2f0',
    justifyContent: 'center',
  },
  WelcomeText:{
    fontWeight: 'bold',
    fontSize: 18,
    color: '#d7499a', 

  },

  maincontain:
  {
    flex: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#F4FCFF',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:'column',
  },
   sportlist:{
     flexDirection:'row',
     justifyContent: 'space-between',
  },

  sportname:{
    flex: 3,
    height: 50,
    fontWeight: 'bold',
    fontSize: 18,
    color: '#d7499a', 
    textAlign: 'center',
    marginTop:10,
  },
  sportgoal:{
    flex: 1,
    height:50,
    textAlign: 'center',
    fontSize: 12,
    alignItems: 'center', 
    marginTop:10,
    justifyContent: 'center'
  },
  sportact:{
    flex: 2,
    height:50,
    fontSize: 12,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  sportdate:{
    flex:2,
    height:50,
  },

  choose:{
    flexDirection:'row'
  },
  input: {
   height: 40,
   width:200,
   marginTop: 10, //间隔
   borderWidth: 1, 
   borderRadius: 5, //圆角
   borderColor: 'lightblue'
  },
  btn:{
    flex:1,
     alignSelf: 'stretch',
     alignItems: 'center',
     justifyContent: 'center',
     backgroundColor: '#80b8e4',
     height: 40,
     borderRadius: 5,
     width:100,
     marginTop: 100,
     marginLeft:20,
  },
});

module.exports = PlanView;