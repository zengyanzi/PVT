import React, { Component } from 'react';
import {
  Image,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Navigator,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  Picker,
  Alert,
  ListView
} from 'react-native';

import { Icon } from 'react-native-elements';
import Dimensions from 'Dimensions';
import ScrollableTabView , { ScrollableTabBar, }from'react-native-scrollable-tab-view';
import { SearchBar } from 'react-native-elements'
import Swiper from 'react-native-swiper';
import TrainerlistView from './trainerlist';
import URLnetowrk from '../pub/network';

var width = Dimensions.get('window').width;
var _navigator ;
var TrainerView = React.createClass({
  getInitialState: function(){
    _navigator = this.props.navigator; 
    this.state = { 
    };
    return {
    };
  },   
_search:function(text){
    var name=this.state.keyword;
    var url = URLnetowrk+'search.action'; // get the Trainee 
    url+='?name='+name+'&'+'email='+name;
    console.log(url);
    fetch(url).then(function(response) {  
       return response.json();
    }).then(function(res) {
      console.log(res);
      if (res["data"].length!=0) {
        console.log(res);
        _navigator.push({
          title:'SearchTrainer',
          id:'searchtrainer',
          params:{data:res["data"]}
        })
      }else{
         Alert.alert (
          'Sorry',
          'User not found'
        )
      }
    });
  },
  render: function(){
    return(
      <ScrollView 
          contentContainerStyle={{flex:1}}
          keyboardDismissMode='on-drag'
          keyboardShouldPersistTaps="never">
        <View style={[styles.Top,styles.Bottomline]}>
        </View>
        <SearchBar
            round
            onSubmitEditing={() => this._search()}
            onChangeText={(text) => this.setState({keyword: text})}
            placeholder='Add your Trainer here' />                          
        <TrainerlistView {...this.props}/> 
      </ScrollView>
    );
  },
});
var styles = StyleSheet.create({
  Top:{
    flexDirection: 'row',
    height:50,
    alignItems: 'center',
    backgroundColor:'#38bda0',
     justifyContent: 'space-between',
  },
  Bottomline:{
    borderBottomWidth:2,
    borderColor:'gray'
  },
});
module.exports = TrainerView;