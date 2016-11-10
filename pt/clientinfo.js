
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
  ListView,
  AsyncStorage,
  Alert
} from 'react-native';

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
import TraineeregisterView from'./traineeregister';

var ClientInfoView = React.createClass({

  getInitialState: function(){
    _navigator = this.props.navigator;
    return {

    };
  },

  _logout: function(){
            _navigator.push({
            title:'main',
            id:'main'
           });  
      AsyncStorage.removeItem('type',(err,result)=>{
        console.log(result);
      });

      AsyncStorage.removeItem('email',(err,result)=>{
        console.log(result);
      });
      AsyncStorage.removeItem('password',(err,result)=>{
        console.log(result);
      
      });
  },


 render: function(){

   return (
      <ScrollView 
        contentContainerStyle={{flex:1}}
        keyboardDismissMode='on-drag'
        keyboardShouldPersistTaps={false}>
        
       <View style={styles.container}>
          <View style={styles.Top}>
           <Text style={styles.WelcomeText}>My Client</Text>
          </View>
       </View>

       <View style={styles.maincontain}>
          <View style={styles.clientlist}>
              <Text style={styles.clientname}>Jenny</Text>
              <Text style={styles.clientstatueDisactivation}>Disactivation</Text>
          </View>
          <View style={styles.clientlist}>
              <Text style={styles.clientname}>Vincent</Text>
              <Text style={styles.clientstatueDisactivation}>Disactivation</Text>
          </View>
          <View style={styles.choose}>
              <TouchableOpacity style={styles.btn}
              onPress={() => _navigator.push({title:'traineeregister',id:'traineeregister'})}>
              <Text style={styles.text}>Add Client</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn}
              onPress={() => _navigator.push({title:'traineeregister',id:'traineeregister'})}>
              <Text style={styles.text}>Add plan</Text>
              </TouchableOpacity>
          </View>
          <View >
              <TouchableOpacity style={styles.btn}
              onPress={this._logout}>
              <Text style={styles.text}>Logout</Text>
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
  clientlist:{
     flexDirection:'row',
  },

  clientname:{
    flex: 1,
    height: 50,
    fontWeight: 'bold',
    fontSize: 18,
    color: '#d7499a', 
    borderWidth: 2,
    textAlign: 'center',
    marginTop:10,
    borderBottomColor:'#b8a6b0',
  },
  clientstatueactivate:{
    flex: 1,
    height:50,
    textAlign: 'center',
    backgroundColor: '#b8a6b0',
    alignItems: 'center', 
    marginTop:10,
    justifyContent: 'center'
  },
  clientstatueDisactivation:{
    flex: 1,
    height:50,
    textAlign: 'center',
    backgroundColor: '#aaaaaa',
    alignItems: 'center', 
    marginTop:10,
    justifyContent: 'center'
  },
  input: {
   height: 40,
   width:200,
   marginTop: 10, //间隔
   borderWidth: 1, 
   borderRadius: 5, //圆角
   borderColor: 'lightblue'
  },
    choose:{
    flexDirection:'row'
  },
  btn:{
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

module.exports = ClientInfoView;