
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
  PixelRatio,
  AsyncStorage
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
    this.state={
      author:"jenny"
    };
    return {
      author:this.state.author,

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
           <Text style={styles.WelcomeText}>Welecome</Text>
          </View>
          <View style={[styles.row,styles.lineCenter]}>
            <TouchableOpacity onPress={() => _navigator.push({title:'MyhistoryView',id:'myhistory'})} style={[styles.choose,styles.column]}>
              <View style={styles.column}>  
                <Text style={styles.BtnText}>My History</Text>
              </View>
            </TouchableOpacity>   
            <TouchableOpacity onPress={() => _navigator.push({title:'PlanView',id:'plan'})} style={[styles.choose,styles.column]}>
              <View style={[styles.column,styles.lineLeftRight]}><Text style={styles.BtnText}>Sport {'\n'}Schedule</Text></View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => _navigator.push({title:'MyrecordView',id:'myrecord'})} style={[styles.choose,styles.column]}>
              <View style={styles.column}><Text style={styles.BtnText}>Sport Record</Text></View>
            </TouchableOpacity>
          </View>
          <View style={[styles.row,styles.lineCenter]}>
            <TouchableOpacity onPress={() => _navigator.push({title:'PlanView',id:'plan'})} style={[styles.choose,styles.column]}>
              <View style={styles.column}><Text style={styles.BtnText}>My Diet</Text></View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => _navigator.push({title:'TimetableView',id:'timetable'})} style={[styles.choose,styles.column]}>
              <View style={[styles.column,styles.lineLeftRight]}><Text style={styles.BtnText}>Diet Record</Text></View>
            </TouchableOpacity>
            <View style={styles.column}><Text style={styles.BtnText}>My profile</Text></View>
          </View>
          <View style={[styles.row,styles.lineCenter]}>
            <TouchableOpacity onPress={() => _navigator.push({title:'MyrecordView',id:'myrecord'})} style={[styles.choose,styles.column]}>
              <View style={styles.column}><Text style={styles.BtnText}>Find Instructor</Text></View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => _navigator.push({title:'TimetableView',id:'timetable'})} style={[styles.choose,styles.column]}>                       
              <View style={[styles.column,styles.lineLeftRight]}><Text style={styles.BtnText}>Join Gym</Text></View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => _navigator.push({title:'TimetableView',id:'timetable'})} style={[styles.choose,styles.column]}>                       
              <View style={styles.column}><Text style={styles.BtnText}>Setting</Text></View>
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
  BtnText:{
    fontWeight: 'bold',
    fontSize: 22,
    color: '#80b8e4',  
    justifyContent: 'center',  
    alignItems: 'center',     
  },
  row:{
    backgroundColor: '#F4FCFF',
    alignItems: 'center',
    flexDirection:'row',  
    flex:1, 
  },
  lineCenter:{
    borderWidth:1/PixelRatio.get(),
    borderColor:'#d7499a',
  },
  lineLeftRight:{
    borderLeftWidth:2/PixelRatio.get(),
    borderRightWidth:2/PixelRatio.get(),
    borderColor:'#d7499a',
  },
  column:{
    backgroundColor: '#F4FCFF',
    flexDirection:'row', 
    alignItems: 'center',
    justifyContent: 'center',
    height:190,
    flex:1,      
  },
  choose:{
    flex:1
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
     marginLeft:10,
     flexDirection:'row'
  },
});

module.exports = MyworkView;