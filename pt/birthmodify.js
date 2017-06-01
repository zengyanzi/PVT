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
  TouchableHighlight,
  ListView
} from 'react-native';
import { Icon } from 'react-native-elements';
import Dimensions from 'Dimensions';
import { FormLabel, FormInput } from 'react-native-elements';
import URLnetowrk from '../pub/network';
import DatePicker from './date.js';
var screenW = Dimensions.get('window').width;
var _navigator ;
var BirthModifyView = React.createClass({
  getInitialState: function(){
    _navigator = this.props.navigator;
    var ds = new ListView.DataSource({rowHasChanged: (row1, row2) => true});
    this.state = {
    };
    return {
    };

  },
  _save:function(){    
    var birthday=this.state.date;
    var url = URLnetowrk+'modifybirthday.action'; // modify the birthday
    url += '?birthday='+birthday;
    console.log(url);
    fetch(url).then(function(response) {  
      return response.json();
    }).then(function(res) {
      if (res["data"]!=null) {
          console.log(res);
          AsyncStorage.setItem("birthday",birthday);
          _navigator.push({
            title:'ThomeView',
            id:'Thome',
          })
      }else{
        Alert.alert('Fail to display','Please check your data'); 
      }
    });
  },
  render: function(){
    return(
      <View>
        <Text style={{color:'#38bda0'}}>Please Choose the Date</Text>
        <DatePicker
          style={styles.datepicker}
          date={this.state.date}
          mode="date"
          placeholder="Date"
          format="YYYY-MM-DD"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          onDateChange={(date) => {this.setState({date: date});}}/>  
        <TouchableOpacity style={styles.btn}
          onPress={this._save}>
          <Text style={{color:'#fff'}}>Save</Text>
        </TouchableOpacity>
      </View>   
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
     justifyContent: 'space-between',
  },
  Bottomline:{
    borderBottomWidth:2,
    borderColor:'gray'
  },

  Topbar:{
    flex:2,
    flexDirection: 'row',

  },
   Left:{
    flex:1,
    flexDirection: 'row',
  },
  Right:{
  flex:1,
  flexDirection: 'row',

  },
  maincontain:
  {
    flex: 1,
    backgroundColor: '#38bda0',
    flexDirection:'column',

  },   
  btn:{
     alignItems: 'center',
     justifyContent: 'center',
     backgroundColor: '#2cb395',
     marginTop:20,
     height: 40,
     borderRadius: 5,
   },
   text:{
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FFF'
  },
});
module.exports = BirthModifyView;