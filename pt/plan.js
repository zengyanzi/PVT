
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


import Dimensions from 'Dimensions';
import Swipeout from 'react-native-swipeout';


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


var PlanView = React.createClass({

  getInitialState: function(){
    _navigator = this.props.navigator;

    this.state = {

    };
    return {
    };

  },



 render: function(){
      return(
         <ScrollView 
            contentContainerStyle={{flex:1}}
            keyboardDismissMode='on-drag'
            keyboardShouldPersistTaps={false}>
          <View style={styles.maincontain}>
            <View style={[styles.Top,styles.Bottomline]}>
              <View style={[styles.Topbar,styles.Left]}>
                <Image source={require('../img/setting_normal.png') }/>
              </View>
              <View style={styles.Topbar}>
                <Image source={require('../img/ptv_sized.png') }/>
              </View>
              <View style={[styles.Topbar,styles.Right]}>
                <Image source={require('../img/add_pressed.png') }/>
              </View>
            </View>


                  

          </View>
        </ScrollView>
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
    flexDirection: 'row',
    height:50,
    alignItems: 'center',
    backgroundColor:'#38bda0',
    justifyContent: 'center',
  },
  Bottomline:{
    borderBottomWidth:2,
    borderColor:'gray'
  },

  Topbar:{
    flex:1,
    alignItems: 'center',

  },
  Left:{
    position: 'absolute', 
    top: 5, 
    left: 5
  },
  Right:{
    position: 'absolute', 
    top: 5, 
    right: 5,
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
  input: {
   height: 40,
   width:200,
   borderWidth: 1, 
   borderRadius: 5, //圆角
   borderColor: 'lightblue'
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
    buttonstyle: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 150,
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor: '#06c1ae',
        marginBottom: 5,
    },

});
module.exports = PlanView;