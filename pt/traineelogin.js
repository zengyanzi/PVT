
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
  Navigator,
  TextInput,
  Alert,
  AsyncStorage
} from 'react-native';
import t from 'tcomb-form-native';
import URLnetowrk from './network';
//navigation
var _navigator;
var Form =t.form.Form;
var User = t.struct({
  email: t.String,              // a required string
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
};
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
var TraineeloginView = React.createClass({
    getInitialState: function(){
    _navigator = this.props.navigator;
    return {
    };
  },
  _login:function(){
      var value = this.refs.form.getValue();
      var email = value["email"];
      var password=value["password"];
      var url = URLnetowrk+'traineelogin.action';
      // var url = 'http://192.168.20.12:8080/pt_server/traineelogin.action';
      url += '?email='+email+'&password='+password;
      fetch(url).then(function(response) {  
        return response.json();
      }).then(function(res){
        console.log(res);
        if (res["data"]!=null) {
          AsyncStorage.setItem("email",email);
          AsyncStorage.setItem("password",password);
          AsyncStorage.setItem("name",res["data"]["name"]);
          AsyncStorage.setItem("surname",res["data"]["surname"]);
          var phone=res['data']['phone'].toString();
          AsyncStorage.setItem("phone",phone);
          AsyncStorage.setItem("gender",res["data"]["gender"]);
          AsyncStorage.setItem("birthday",res["data"]["birthday"]);
          var height=res['data']['height'].toString();
          AsyncStorage.setItem("height",height);
          var initial_weight=res['data']['initial_weight'].toString();
          AsyncStorage.setItem("initial_weight",initial_weight); 
          var target_weight=res['data']['target_weight'].toString();
          AsyncStorage.setItem("target_weight",target_weight);             
          var userid=res['data']['id'].toString();
          AsyncStorage.setItem('userid',userid);
          console.log(userid);
          _navigator.push({
            title:'ThomeView',
            id:'Thome'
          });
        }else{
          Alert.alert('Fail to login','Please check your password');  
        }
    });
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
            <Text style={styles.WelcomeText}>Welcome Back to Training</Text>
          </View>
        </View>
        <View style={styles.maincontain}>
          <Form 
            ref="form"
            type={User}
            options={options}
          />
          <View style={styles.choose}>
            <TouchableOpacity style={styles.btn}
              onPress={this._login}>
              <Text style={styles.text}>login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}
                  onPress={() => _navigator.push({title:'traineeregister',id:'traineeregister'})}>
              <Text style={styles.text}>Forget</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
});
var styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#38bda0',
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
    color: '#ffffff', 
  },
  maincontain:
  {
    flex: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#38bda0',
    justifyContent: 'center',
  },
   logo:{
    width:160,
    height:160,
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
     alignSelf: 'stretch',
     alignItems: 'center',
     justifyContent: 'center',
     backgroundColor: '#2cb395',
     height: 50,
     borderRadius: 5,
     width:140,
     marginTop: 100,
     marginLeft:20,
  },
  text:{
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FFF'
  },
});
module.exports = TraineeloginView;