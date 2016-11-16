
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
  navigator,
} from 'react-native';
import t from 'tcomb-form-native';
import DatePicker from './date.js';

var Form =t.form.Form;
var _navigator ;

var Person = t.struct({
  Name: t.String,              // a required string
  surname: t.maybe(t.String),  // an optional string
  phone:t.maybe(t.Number),  
  email:t.String,             // a required number
  password:t.String,            // a required number
  //rememberMe: t.Boolean        // a boolean
});

var options = {
   fields: {
    password: {
      password: true,
      secureTextEntry: true,
    }
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




var TraineeregisterView = React.createClass({

  getInitialState: function(){
    _navigator = this.props.navigator;
    return {

    };
  },

   _register: function () {

    var value = this.refs.form.getValue();
    var name = value["name"];
    var surname = value["surname"];
    var phone = value["phone"];
    var password = value["password"];
    var email = value["email"];
    var url = 'http://47.90.60.206:8080/pt_server/traineeregister.action';
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
      title:'TraineeloinView',
      id:'traineelogin'
    })


  },



 render: function(){
    return (
      <ScrollView 
            contentContainerStyle={{flex:1}}
            keyboardDismissMode='on-drag'
            keyboardShouldPersistTaps={false} >

 

        <View style={styles.maincontain}>
            <View style={styles.formstyle}>
              <Form
                ref="form"
                type={Person}
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
    backgroundColor: '#d7499a',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
});

module.exports = TraineeregisterView;