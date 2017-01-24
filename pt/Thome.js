
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
import TabNavigator from 'react-native-tab-navigator';
import Dimensions from 'Dimensions';
import PlanView from './plan.js';
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

var ThomeView = React.createClass({

  getInitialState: function(){
    _navigator = this.props.navigator;

    this.state = {
      selectedTab: 'Plan',

    };
    return {
       selectedTab:this.state.selectedTab,
    };


  },

 render: function(){ 
    var RecordView =(
      <View style={styles.container}>
        <Text>check the record</Text>
      </View>    
    );
    var GymView =(
      <View style={styles.container}>
        <Text>join a gym </Text>
      </View>    
    );
    var TrainerView =(
      <View style={styles.container}>
        <Text>find your trainer here</Text>
      </View>    
    );
    var ProfileView =(
      <View style={styles.container}>
        <Text>here is the profile</Text>
      </View>    
    );
       return (
        <TabNavigator
          tabBarStyle={{ height: 60 }}
        >
          <TabNavigator.Item
              selected={this.state.selectedTab === 'Plan'}
              title="Plan"
              renderIcon={() => <Image  source={require('../img/plan_normal.png') }/>}
              renderSelectedIcon={() => <Image  source={require('../img/plan_pressed.png') }/>}
            onPress={() => this.setState({ selectedTab: 'Plan' })}>
            <PlanView {...this.props}/>

          </TabNavigator.Item>

          <TabNavigator.Item
              selected={this.state.selectedTab === 'Record'}
              title="Record"
              renderIcon={() => <Image  source={require('../img/record_normal.png') }/>}
              renderSelectedIcon={() => <Image  source={require('../img/record_pressed.png') }/>}
              onPress={() => this.setState({ selectedTab: 'Record' })}       
              >

               {RecordView}
          </TabNavigator.Item>
          <TabNavigator.Item
              selected={this.state.selectedTab === 'Gym'}
              title="Gym"
              renderIcon={() => <Image  source={require('../img/gym_normal.png') }/>}
              renderSelectedIcon={() => <Image  source={require('../img/gym_pressed.png') }/>}
              onPress={() => this.setState({ selectedTab: 'Gym' })}       
              >

               {GymView}
          </TabNavigator.Item>
          <TabNavigator.Item
              selected={this.state.selectedTab === 'Trainer'}
              title="Trainer"
              renderIcon={() => <Image  source={require('../img/trainer_normal.png') }/>}
              renderSelectedIcon={() => <Image  source={require('../img/trainer_pressed.png') }/>}
              onPress={() => this.setState({ selectedTab: 'Trainer' })}       
              >

               {TrainerView}
          </TabNavigator.Item>
          <TabNavigator.Item
              selected={this.state.selectedTab === 'Profile'}
              title="Profile"
              renderIcon={() => <Image  source={require('../img/profile_normal.png') }/>}
              renderSelectedIcon={() => <Image source={require('../img/profile_pressed.png') }/>}
              onPress={() => this.setState({ selectedTab: 'Profile' })}       
              >

               {ProfileView}
          </TabNavigator.Item>


        </TabNavigator>
      

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
    height:50,
    alignItems: 'center',
    backgroundColor:'#38bda0',
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
    alignItems: 'center',
    flexDirection:'column',

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
     width:200,
     marginTop:20,
  },
});

module.exports = ThomeView;