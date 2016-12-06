
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
var EditplanView = React.createClass({

  getInitialState: function(){
    _navigator = this.props.navigator;
   var grouptype = {};
    grouptype['CHEST']=['BB BENCH PRESS', 'DB FLYS', 'INCLINE DB BENCH'];
    grouptype['BACK']=['CLOSE MACHINE ROW', 'REVERSE ASSISTED CHIN UPS', 'WIDE LATT PULLDOWN'];
    grouptype['lEGS']=['LEGS PRESS', 'KB STEP UPS','Other'];
    grouptype['SHOULDERS']=['CABLE UPRIGHT ROW', 'MILITARY PRESS','FRONT RAISE'];
    grouptype['STOMACH']=['PRONE HOLD/PLANK', 'OPP ARM LEG EXTENSION','SB PRONE ROLL OUTS'];
    this.state={
      author:null,
      grouptype:grouptype,
      sportclass: 'CHEST',
      sporttype:null,
    };
    return {
      author:this.state.author,
      sportclass:this.state.sportclass,
      sporttype:this.state.sporttype,
      grouptype:this.state.grouptype,
    };
  },

  render: function(){
    return (
      <ScrollView 
        contentContainerStyle={{flex:1}}
        keyboardDismissMode='on-drag'
        keyboardShouldPersistTaps={false}
      >
        
       <View style={styles.container}>
          <View style={styles.Top}>
           <Text style={styles.WelcomeText}>My session</Text>
          </View>
       </View>
       <View style={styles.maincontain}>
          <Picker style={styles.sportact}
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

          <Picker style={styles.sportact}
              prompt="Please choose sporttype"
              style={{width:200}}
              selectedValue={this.state.sporttype}
              onValueChange={(value) => this.setState({sporttype: value})}>
              <Picker.Item label={this.state.grouptype[this.state.sportclass][0]} value={this.state.grouptype[this.state.sportclass][0]} />
              <Picker.Item label={this.state.grouptype[this.state.sportclass][1]} value={this.state.grouptype[this.state.sportclass][1]} />
              <Picker.Item label={this.state.grouptype[this.state.sportclass][2]} value={this.state.grouptype[this.state.sportclass][2]} />
          </Picker>
           <View style={styles.sportact}>
            <TextInput  onChangeText={(text) => this.setState({sportsize: text})}   keyboardType="numeric" placeholder='Target'/>
           </View> 
          <DatePicker
                style={styles.sportact}
                date={this.state.date}
                mode="date"
                placeholder="Date"
                format="YYYY-MM-DD"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                onDateChange={(date) => {this.setState({date: date});}}/>
            <View style={styles.choose}>
                 <TouchableOpacity style={styles.btn}
                     onPress={this._submit}>
                    <Text style={styles.text}>Submit</Text>
                  </TouchableOpacity>
            </View>

        </View>
      </ScrollView>
    );
  },
  componentDidMount() {
    this.setState({
      author:this.props.author,
    });
  }
});
var styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#F4FCFF',
    justifyContent: 'center',
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
    alignItems: 'center',
    flexDirection:'column',

  },

  choose:{
    flexDirection:'row',
    height:50,
    width:200,
  },
  btn:{
     alignSelf: 'stretch',
     alignItems: 'center',
     justifyContent: 'center',
     backgroundColor: '#80b8e4',
     height: 50,
     borderRadius: 5,
     width:200,
     marginTop: 20,
  },
  sportact:{
    marginTop:20,
    height:50,
    width:200,
  },
  sportdate:{
    marginTop:20,
    height:50,
    width:200
  },
  text:{
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FFF',
    marginLeft:5,
    alignItems: 'center',
    justifyContent: 'center'
  },
});

module.exports = EditplanView;