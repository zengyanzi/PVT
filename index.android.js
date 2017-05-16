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
import InstructwelcomeView from'./pt/instruct/instructwelcome';
import InstructregisterView from'./pt/instruct/instructregister';
import InstructloginView from'./pt/instruct/instructlogin';
import TraineewelcomeView from './pt/trainee/traineewelcome';
import TraineeloginView from'./pt/trainee/traineelogin';
import TraineeregisterView from'./pt/trainee/traineeregister';
import ThomeView from './pt/trainee/Thome';
import IhomeView from './pt/instruct/Ihome';
import DetailPlanView from './pt/trainee/detailplan';
import EditPlanView from './pt/trainee/editplan';
import CreateplanView from './pt/trainee/createplan';
import PlanInfoView from './pt/trainee/planinfo';
import EditRecordView from './pt/trainee/editrecord';
import DetailRecordView from './pt/trainee/detailrecord';
import ChartView from './pt/trainee/chart';
import AdditemtodayView from'./pt/trainee/additemtoday';
import AddrecordtodayView from'./pt/trainee/addrecordtoday';
import ProfileModifyView from './pt/trainee/profilemodify';
import IProfileModifyView from './pt/instruct/iprofilemodify';
import EmailModifyView from './pt/trainee/emailmodify';
import URLnetowrk from './pt/network';
import PhoneModifyView from './pt/trainee/phonemodify';
import PasswordModifyView from './pt/trainee/passwordmodify';
import GenderModifyView from './pt/trainee/gendermodify';
import IPhoneModifyView from './pt/instruct/iphonemodify';
import IPasswordModifyView from './pt/instruct/ipasswordmodify';
import IGenderModifyView from './pt/instruct/igendermodify';
import IBirthModifyView from './pt/instruct/ibirthmodify';
import BirthModifyView from './pt/trainee/birthmodify';
import HModifyView from './pt/trainee/hmodify';
import IwView from './pt/trainee/iwmodify';
import TwView from './pt/trainee/twmodify';
import BModifyView from './pt/trainee/bmimodify';
import NewitemView from './pt/trainee/newitem';
import StaticMap from './pt/trainee/staticmap'
import Description from './pt/instruct/description'
import DetailGymView from './pt/detailgym';
import Gymcreate from './pt/gymcreate';
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
                  // var url = 'http://192.168.1.15:8080/pt_server/instructorlogin.action';
                var url = URLnetowrk+'instructor/login.action';
                url += '?email='+email+'&password='+password;
                console.log(url);
                fetch(url).then(function(response) {  
                  return response.json();
                }).then(function(res) {
                  console.log(res);
                  if (res["data"]!=null) {
                    _navigator.push({
                    title:'IhomeView',
                    id:'Ihome'
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
                var url = URLnetowrk+'traineelogin.action';
                url += '?email='+email+'&password='+password;
                console.log(url);
                fetch(url).then(function(response) {  
                  return response.json();
                }).then(function(res) {
                  console.log(res);
                  if (res["data"]!=null) {
                    _navigator.push({
                    title:'ThomeView',
                    id:'Thome'
                    });
                  }
                });
              });
            });
          }
        };
      });   
    }
  configureScenceAndroid(){
    return Navigator.SceneConfigs.FadeAndroid;
  }
  renderSceneAndroid(route,navigator){
    _navigator = navigator;
    if(route.id === 'main'){
      return (
        <ScrollView 
        contentContainerStyle={{flex:1}}
        keyboardDismissMode='on-drag'
        keyboardShouldPersistTaps='never'
        >  
          <View style={styles.container}>
          </View>
          <View style={styles.maincontain}>
            <Image source={require('./img/ptv.png')} style={{width: 280, height: 140}}/>
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
        <InstructwelcomeView {...route.params} navigator={navigator} route={route} />
       );
    }
    if(route.id === 'instructlogin'){
      return (
        <InstructloginView {...route.params} navigator={navigator} route={route} />
       );
    }
    if(route.id === 'instructregister'){
      return (
        <InstructregisterView {...route.params} navigator={navigator} route={route} />
       );
    }
    if(route.id === 'traineewelcome'){
      return (
        <TraineewelcomeView {...route.params} navigator={navigator} route={route}/>
      );
    }
    if(route.id === 'traineeregister'){
      return (
        <TraineeregisterView {...route.params} navigator={navigator} route={route}/>
      );
    }
    if(route.id === 'traineelogin'){
      return (
        <TraineeloginView {...route.params} navigator={navigator} route={route}/>
      );
    }
    if(route.id === 'plan'){
      return (
        <PlanView {...route.params} navigator={navigator} route={route}/>
      );
    }
    if(route.id === 'Thome'){
      return (
        <ThomeView {...route.params} navigator={navigator} route={route}/>
      );
    }
    if(route.id === 'Ihome'){
      return (
        <IhomeView {...route.params} navigator={navigator} route={route}/>
      );
    }
    if(route.id === 'detailplan'){
      return (
        <DetailPlanView {...route.params} navigator={navigator} route={route}/>
      );
    }
    if(route.id === 'editplan'){
      return (
        <EditPlanView {...route.params} navigator={navigator} route={route}/>
      );
    }
    if(route.id === 'createplan'){
      return (
        <CreateplanView {...route.params} navigator={navigator} route={route}/>
      );
    }
    if(route.id === 'planinfo'){
      return (
        <PlanInfoView {...route.params} navigator={navigator} route={route}/>
      );
    }
    if(route.id === 'editrecord'){
      return (
        <EditRecordView {...route.params} navigator={navigator} route={route}/>
      );
    }
    if(route.id === 'detailrecord'){
      return (
        <DetailRecordView {...route.params} navigator={navigator} route={route}/>
      );
    }
    if(route.id === 'chart'){
      return (
        <ChartView {...route.params} navigator={navigator} route={route}/>
      );
    }
    if(route.id === 'additemtoday'){
      return (
        <AdditemtodayView {...route.params} navigator={navigator} route={route}/>
      );
    }
   if(route.id === 'addrecordtoday'){
      return (
        <AddrecordtodayView {...route.params} navigator={navigator} route={route}/>
      );
    }
   if(route.id === 'profilemodify'){
      return (
        <ProfileModifyView {...route.params} navigator={navigator} route={route}/>
      );
    }
   if(route.id === 'iprofilemodify'){
      return (
        <IProfileModifyView {...route.params} navigator={navigator} route={route}/>
      );
    }
    if(route.id === 'phonemodify'){
      return (
        <PhoneModifyView {...route.params} navigator={navigator} route={route}/>
      );
    }  
    if(route.id === 'iphonedmodify'){
      return (
        <IPhoneModifyView {...route.params} navigator={navigator} route={route}/>
      );
    }
    if(route.id === 'passwordmodify'){
      return (
        <PasswordModifyView {...route.params} navigator={navigator} route={route}/>
      );
    }
    if(route.id === 'ipasswordmodify'){
      return (
        <IPasswordModifyView {...route.params} navigator={navigator} route={route}/>
      );
    }
    if(route.id === 'birthmodify'){
      return (
        <BirthModifyView {...route.params} navigator={navigator} route={route}/>
      );
    }
    if(route.id === 'gendermodify'){
      return (
        <GenderModifyView {...route.params} navigator={navigator} route={route}/>
      );
    }
    if(route.id === 'ibirthmodify'){
      return (
        <IBirthModifyView {...route.params} navigator={navigator} route={route}/>
      );
    }
    if(route.id === 'igendermodify'){
      return (
        <IGenderModifyView {...route.params} navigator={navigator} route={route}/>
      );
    }
    if(route.id === 'hmodify'){
      return (
        <HModifyView {...route.params} navigator={navigator} route={route}/>
      );
    }
    if(route.id === 'iwmodify'){
      return (
        <IwView {...route.params} navigator={navigator} route={route}/>
      );
    }
    if(route.id === 'twmodify'){
      return (
        <TwView {...route.params} navigator={navigator} route={route}/>
      );
    }
    if(route.id === 'bmimodify'){
      return (
        <BModifyView {...route.params} navigator={navigator} route={route}/>
      );
    }
    if(route.id === 'newitem'){
      return (
        <NewitemView {...route.params} navigator={navigator} route={route}/>
      );
    }
    if(route.id === 'staticmap'){
      return (
        <StaticMap {...route.params} navigator={navigator} route={route}/>
      );
    }
    if(route.id === 'description'){
      return (
        <Description {...route.params} navigator={navigator} route={route}/>
      );
    }
    if(route.id === 'detailgym'){
      return (
        <DetailGymView {...route.params} navigator={navigator} route={route}/>
      );
    }
    if(route.id === 'gymcreate'){
      return (
        <Gymcreate {...route.params} navigator={navigator} route={route}/>
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
    backgroundColor: '#38bda0',
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
    backgroundColor: '#38bda0',
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
AppRegistry.registerComponent('PTV', () => PTV);
