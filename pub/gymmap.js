
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
  ListView,
  Alert,
  WebView 
} from 'react-native';
import Dimensions from 'Dimensions';
import Swipeout from 'react-native-swipeout';
import URLnetowrk from '../pub/network';
import MapView from 'react-native-maps';
var screenW = Dimensions.get('window').width;
var _navigator ;
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



class GymmapView extends Component {


    constructor() {
    super();
  }
  render() {
    return (
    <WebView
            source={{uri: 'https://www.google.co.nz/maps/search/gym'}}
            style={{marginTop: 20}}
          />

    );
  }

}

module.exports = GymmapView;