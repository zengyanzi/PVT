
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
  AsyncStorage
} from 'react-native';

//navigation
var _navigator;


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

var MyplanView = React.createClass({

  getInitialState: function(){
    _navigator = this.props.navigator;
    this.state={
      author:null
    };
    return {
     author:this.state.author,
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
           <Text style={styles.WelcomeText}>{this.state.author}</Text>
          </View>
       </View>
       <View style={styles.maincontain}>

            <View style={styles.choose}>
              <TouchableOpacity style={styles.btn}
              onPress={() => _navigator.push({title:'Myhistoryview',id:'myhistory'})}>
              <Text style={styles.text}>My history</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn}
             onPress={() => _navigator.push({title:'TimetableView',id:'timetable'})}>
              <Text style={styles.text}>Check Schedule</Text>
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

  btn:{
     alignSelf: 'stretch',
     alignItems: 'center',
     justifyContent: 'center',
     backgroundColor: '#80b8e4',
     height: 80,
     borderRadius: 5,
     width:200,
     marginTop: 10,
     marginLeft:20,
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

module.exports = MyplanView;