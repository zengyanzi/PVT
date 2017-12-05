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
var HModifyView = React.createClass({
  getInitialState: function(){
    _navigator = this.props.navigator;
    var ds = new ListView.DataSource({rowHasChanged: (row1, row2) => true});
    this.state = {
      height:''
    };
    return {
    };

  },
  _save:function(){    
    var height=this.state.height;
    if (height!=null) {
      var url = URLnetowrk+'modifyheight.action'; // modify the height
      url+= '?height='+height;
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
    }else{
      Alert.alert('Sorry','Please check your information'); 
    };
  },
  render: function(){
    return(
      <View>
        <View style={{flexDirection: 'row'}}>
            <TextInput
              style={{height: 40, borderColor: '#2cb395', borderWidth: 2,width:180,color:'#38bda0',fontWeight: 'bold',fontSize: 16,}}
              onChangeText={(text) => this.setState({height:text})}
              keyboardType={'numeric'}
               placeholder="Enter Height"
              value={this.state.text}
            />
            <Text style={styles.text}> meter</Text> 
        </View>
          <TouchableOpacity style={styles.btn}
            onPress={this._save}>
            <Text style={{color:'#fff'}}>Save</Text>
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
    color: '#38bda0'
  },
  input:{
    flexDirection: 'row',
  },
});
module.exports = HModifyView;