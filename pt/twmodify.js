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
var screenW = Dimensions.get('window').width;
var _navigator ;
var TwView = React.createClass({
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
    AsyncStorage.getItem('password',(err,result)=>{
       password=result;
       _that.setState({
          password:password
       })
    })
  },
  _save:function(){    
    var weight=this.state.weight;
    console.log(this.state.weight);
    var url = URLnetowrk+'modifyweight.action'; // modify the height
    url+= '?weight='+weight;
    console.log(url);
    fetch(url).then(function(response) {  
      return response.json();
    }).then(function(res) {
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
module.exports = TwView;