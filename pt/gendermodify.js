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
import t from 'tcomb-form-native';
import URLnetowrk from '../pub/network';
var screenW = Dimensions.get('window').width;
var _navigator ;
var GenderModifyView = React.createClass({
  getInitialState: function(){
    _navigator = this.props.navigator;
    var ds = new ListView.DataSource({rowHasChanged: (row1, row2) => true});
    this.state = { 
    
    };
    return {   
     
    };

  },
  componentWillMount() {
    let _that=this;
    AsyncStorage.getItem('email',(err,result)=>{
       email=result;
       _that.setState({
          email:email
       })
    })
    AsyncStorage.getItem('bmi',(err,result)=>{
       bmi=parseFloat(result).toFixed(2);
       console.log(bmi);
       _that.setState({
          bmi:bmi
       })
    })
    AsyncStorage.getItem('gender',(err,result)=>{
      gender=result;
      _that.setState({
        gender:gender
      })
    })
    AsyncStorage.getItem('birthday',(err,result)=>{
      birthday=result;
      _that.setState({
        birthday:birthday
      })
    })
    AsyncStorage.getItem('height',(err,result)=>{
      height=result;
      _that.setState({
        height:height
      })
    })
    AsyncStorage.getItem('target_weight',(err,result)=>{
      target_weight=parseFloat(result).toFixed(2);
             _that.setState({
          target_weight:target_weight
       })
    })
  },
  _save:function(){    
    var gender=this.state.gender;
    console.log(this.state.gender);
    var url = URLnetowrk+'modifygender.action'; // modify the gender
    url+= '?gender='+gender;
    console.log(url);
    fetch(url).then(function(response) {  
      return response.json();
    }).then(function(res) {
      AsyncStorage.setItem("gender",gender);
      if (res["data"]!=null) {
          console.log(res);
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
       <View >
        <Picker 
            prompt="Please choose sportname"
            style={{width:200,color:'#38bda0',alignItems:'center'}}
            selectedValue={this.state.gender}
            onValueChange={(value) => this.setState({gender: value})}>       
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />   
        </Picker>

        <TouchableOpacity style={styles.btn}
          onPress={this._save}>
          <Text style={styles.text}>Save</Text>
         </TouchableOpacity>
      </View> 
    );
  },
});

var styles = StyleSheet.create({
  btn:{
     alignItems: 'center',
     justifyContent: 'center',
     backgroundColor: '#2cb395',
     marginTop:10,
     height: 30,
     borderRadius: 5,
   },
     text:{
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FFF'
  },
});
module.exports = GenderModifyView;