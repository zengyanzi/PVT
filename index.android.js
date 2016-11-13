/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,ScrollView,View,Text,Image,Navigator,TouchableOpacity,BackAndroid,StyleSheet,AsyncStorage
} from 'react-native';

var _navigator;
import InstructwelcomeView from'./pt/instructwelcome';
import InstructregisterView from'./pt/instructregister';
import InstructloginView from'./pt/instructlogin';
import TraineewelcomeView from './pt/traineewelcome';
import TraineeloginView from'./pt/traineelogin';
import TraineeregisterView from'./pt/traineeregister';
import MyworkView from'./pt/mywork';
import MysessionView from'./pt/mysession';
import MyrecordView from'./pt/myrecord';
import ClientInfoView from'./pt/clientinfo';
import MyplanView from'./pt/myplan';
import MydietView from'./pt/mydiet';


export default class PTV extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
          // var type =  AsyncStorage.getItem('type');
          var type;
          AsyncStorage.getItem('type',(err, result) => {
                console.log(result);
                type=result;
                if (type!==null) {
                  if (type=="instructor") {
                    var email;
                    AsyncStorage.getItem('email',(err,result)=>{
                      // console.log(result);
                      email=result;
                      var password;
                      AsyncStorage.getItem('password',(err,result)=>{
                      // console.log(result);
                      password=result;
                          // var url = 'http://192.168.20.17:8080/pt_server/instructorlogin.action';
                          var url = 'http://192.168.1.15:8080/pt_server/instructorlogin.action';
                          url += '?email='+email+'&password='+password;
                          console.log(url);
                          fetch(url).then(function(response) {  
                                  return response.json();
                                }).then(function(res) {
                                console.log(res);
                                  if (res["data"]!=null) {
                                    _navigator.push({
                                      title:'ClientInfoView',
                                      id:'clientinfo'
                                    });
                                  }
                                });
                      });
                    });
                  }else{
                    var email;
                    AsyncStorage.getItem('email',(err,result)=>{
                      // console.log(result);
                      email=result;
                      var password;
                      AsyncStorage.getItem('password',(err,result)=>{
                      // console.log(result);
                      password=result;
                      // var url = 'http://192.168.20.17:8080/pt_server/traineelogin.action';
                      var url = 'http://192.168.1.15:8080/pt_server/traineelogin.action';
                          url += '?email='+email+'&password='+password;
                          console.log(url);
                          fetch(url).then(function(response) {  
                                  return response.json();
                                }).then(function(res) {
                                console.log(res);
                                  if (res["data"]!=null) {
                                    _navigator.push({
                                      title:'MyworkView',
                                      id:'mywork'
                                    });
                                  }
                                });
                      });
                    });
                  }
              };
          });   

          // type='instructor';


    }

  configureScenceAndroid(){
    return Navigator.SceneConfigs.FadeAndroid;
  }


 renderSceneAndroid(route,navigator){
    _navigator = navigator;
    if(route.id === 'main'){
      return (
        // <View>

        //   <TouchableOpacity onPress={() => _navigator.push({title:'instructwelcome',id:'instructwelcome'})} style={ styles.button }>
        //     <Text>I am instructor</Text>
        //   </TouchableOpacity>

        // </View>
         <ScrollView 
        contentContainerStyle={{flex:1}}
        keyboardDismissMode='on-drag'
        keyboardShouldPersistTaps={false}
      >
        
       <View style={styles.container}>
          <View style={styles.Top}>
           <Text style={styles.WelcomeText}>Welcome to Virtual PT</Text>
          </View>
       </View>
       <View style={styles.maincontain}>
        <Image source={require('./img/logo.png')} />

            <View style={styles.choose}>
              <TouchableOpacity style={styles.btn}
              onPress={() => _navigator.push({title:'InstructwelcomeView',id:'instructwelcome'})}>
              <Text style={styles.text}>I am Instructor</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn}
             onPress={() => _navigator.push({title:'TraineewelcomeView',id:'traineewelcome'})}>
              <Text style={styles.text}> I am trainee</Text>
              </TouchableOpacity>
            </View>
        </View>
      </ScrollView>
       );
    }

    if(route.id === 'instructwelcome'){
      return (
        <InstructwelcomeView navigator={navigator} route={route} />
       );
    }
    if(route.id === 'instructlogin'){
      return (
        <InstructloginView navigator={navigator} route={route} />
       );
    }
    if(route.id === 'instructregister'){
      return (
        <InstructregisterView navigator={navigator} route={route} />
       );
    }
    if(route.id === 'traineewelcome'){
      return (
        <TraineewelcomeView navigator={navigator} route={route}/>
      );
    }
    if(route.id === 'traineeregister'){
      return (
        <TraineeregisterView navigator={navigator} route={route}/>
      );
    }
    if(route.id === 'traineelogin'){
      return (
        <TraineeloginView navigator={navigator} route={route}/>
      );
    }
    if (route.id ==='clientinfo') {
      return(
        <ClientInfoView navigator={navigator} route={route}/>
        );
    }
    if(route.id === 'mywork'){
      return (
        <MyworkView navigator={navigator} route={route}/>
      );
    }
    if(route.id === 'mysession'){
      return (
        <MysessionView navigator={navigator} route={route}/>
      );
    }
    if(route.id === 'plan'){
      return (
        <PlanView navigator={navigator} route={route}/>
      );
    }
    if(route.id === 'myrecord'){
      return (
        <MyrecordView navigator={navigator} route={route}/>
      );
    }
    if(route.id === 'myplan'){
      return (
        <MyplanView navigator={navigator} route={route}/>
      );
    }
    if(route.id === 'mydiet'){
      return (
        <MydietView navigator={navigator} route={route}/>
      );
    }



  }

 render(){
    var renderScene = this.renderSceneAndroid;
    var configureScence = this.configureScenceAndroid;
    return (
      <Navigator
        debugOverlay={false}
        initialRoute={{ title: 'Main', id:'main'}}
        configureScence={{ configureScence }}
        renderScene={renderScene}/>
   );
  }

}
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
  },
   logo:{
    width:160,
    height:160,
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
     width:120,
     marginTop: 100,
     marginLeft:20,
  },
  text:{
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FFF'
  },
});


AppRegistry.registerComponent('PTV', () => PTV);
