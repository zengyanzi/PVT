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
  TouchableHighlight,
  ListView
} from 'react-native';
import { Icon } from 'react-native-elements';
import Dimensions from 'Dimensions';
import { FormLabel, FormInput } from 'react-native-elements';
import URLnetowrk from '../pub/network';
var screenW = Dimensions.get('window').width;
var _navigator ;
var IwView = React.createClass({
  getInitialState: function(){
    _navigator = this.props.navigator;
    var ds = new ListView.DataSource({rowHasChanged: (row1, row2) => true});
    this.state = {
      weight:''
    };
    return {
      weight:this.state.weight
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
    var weight=this.state.weight;
    var email=this.state.email;
    var password=this.state.password
    console.log(this.state.weight);
    if (weight !=null) {
      var url = URLnetowrk+'modifyweight.action'; // modify the height
      url+= '?weight='+weight;
      console.log(url);
      fetch(url).then(function(response) {  
        return response.json();
      }).then(function(res) {
         if (res["data"]!=null)d: {
          var url = URLnetowrk+'traineelogin.action';//fresh the BMI
          // var url = 'http://192.168.20.12:8080/pt_server/traineelogin.action';
          url += '?email='+email+'&password='+password;
          fetch(url).then(function(response) {  
            return response.json();
          }).then(function(res){
            if (res["data"]!=null) {
            console.log(res);
            AsyncStorage.setItem('initial_weight',weight);
            _navigator.push({
              title:'ThomeView',
              id:'Thome',
            })
            }else{
              Alert.alert('Fail to display','Please check your data'); 
            }
          });
        }else{
            Alert.alert('Fail to display','Please check your data'); 
        }
      });     
    }else{
      Alert.alert('Sorry','Please check your information'); 
    };
  },
  render: function(){
    return(
       <View>
          <View style={{flexDirection: 'row'}}>
            <TextInput
              style={{height: 40, borderColor: '#2cb395', borderWidth: 2,width:180,color:'#2cb395',fontWeight: 'bold',fontSize: 16,}}
              onChangeText={(text) => this.setState({weight:text})}
              keyboardType={'numeric'}
               placeholder="Enter Weight"
              value={this.state.text}
            />
            <Text  style={{color:'#2cb395'}}> kg</Text> 
          </View>
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
     marginTop:50,
     height: 30,
     borderRadius: 5,
   },
   text:{
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FFF'
  },
  input:{
    flexDirection: 'row',
  },
});
module.exports = IwView;