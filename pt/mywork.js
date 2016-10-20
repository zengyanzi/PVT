
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

var MyworkView = React.createClass({

  getInitialState: function(){
    _navigator = this.props.navigator;
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
           <Text style={styles.WelcomeText}>My Workout</Text>
          </View>
       </View>

       <View style={styles.maincontain}>
          <TouchableOpacity onPress={() => _navigator.push({title:'MysessionView',id:'mysession'})}>
            <Image 
                source={require('../img/mywork.png')}
                style={styles.choice}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => _navigator.push({title:'MyrecordView',id:'myrecord'})}>
            <Image 
                source={require('../img/myrecord.png')}
                style={styles.choice}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => _navigator.push({title:'BarChartScreen',id:'BarChartScreen'})}>
            <Image 
                source={require('../img/mydiet.png')}
                style={styles.choice}/>
          </TouchableOpacity> 
           <TouchableOpacity onPress={() => _navigator.push({title:'BarChartScreen',id:'BarChartScreen'})}>
            <Image 
                source={require('../img/mygym.png')}
                style={styles.choice}/>
          </TouchableOpacity>   
           <TouchableOpacity onPress={() => _navigator.push({title:'BarChartScreen',id:'BarChartScreen'})}>
            <Image 
                source={require('../img/instruct.png')}
                style={styles.choice}/>
          </TouchableOpacity>            
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
  choice:{
    marginTop:10,
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

module.exports = MyworkView;