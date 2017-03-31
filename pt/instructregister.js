
import React, { Component } from 'react';
import {
  Image,
  View,
  Text,
  StyleSheet,
  ViewPagerAndroid,
  BackAndroid,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  DatePickerAndroid,
  navigator
} from 'react-native';
import t from 'tcomb-form-native';
import DatePicker from './date.js';
import URLnetowrk from './network';
//import Storage from 'react-native-storage';
var _navigator ;
var Form =t.form.Form;
var User = t.struct({
  name: t.String,              // a required string
  surname: t.maybe(t.String),  // an optional string
  phone:t.maybe(t.Number),  
  email:t.String,             // a required number
  password:t.String,
  //rememberMe: t.Boolean        // a boolean
});
var options = {
   fields: {
    password: {
      password: true,
      secureTextEntry: true,
    },
  }
}; // optional rendering options (see documentation)
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
var InstructregisterView = React.createClass({
  getInitialState: function(){
    _navigator = this.props.navigator;
    this.state={
    date:''
    };
    return {
    };
  },
  _register: function () {
    var value = this.refs.form.getValue();
    var name = value["name"];
    var surname = value["surname"];
    var email = value["email"];
    var phone = value["phone"];
    // var birthday = this.state.date;
    var password = value["password"];
    var url = URLnetowrk+'instructorregister.action';
    url += '?name='+name+'&surname='+surname+'&email='+email+'&phone='+phone+'&password='+password;
    fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(function(res){
      console.log(res);
    }).catch((error)=>{
      console.log(error);
    });
    _navigator.push({
      title:'InstructloginView',
      id:'instructlogin'
    })
  },
  render: function(){
    return (
      <ScrollView 
            contentContainerStyle={{flex:1}}
            keyboardDismissMode='on-drag'
            keyboardShouldPersistTaps={false} >
        <View style={styles.maincontain}>
          <View>
            <Form
              ref="form"
              type={User}
              options={options}/>
            <TouchableHighlight style={styles.button} onPress={this._register} underlayColor='#99d9f4'>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableHighlight>
          </View>
        </View>
      </ScrollView>
    );
  }
});
var styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#F4FCFF',
  },
  Top:{
    height:50,
    alignItems: 'center',
    backgroundColor:'#38bda0',
    justifyContent: 'center',
  },
  WelcomeText:{
    fontWeight: 'bold',
    fontSize: 18,
    color: '#d7499a', 
    borderWidth: 2,
    borderBottomColor:'#b8a6b0',
  },
  maincontain:
  {
    flex: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#38bda0',
    justifyContent: 'center',
 },
 birthday:{
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
 },
   logo:{
    width:160,
    height:160,
  },
  text:{
    fontWeight: 'bold',
    fontSize: 14,
    color: '#241003',
  },
   buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#2cb395',
    borderColor: '#2cb395',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
});

module.exports = InstructregisterView;