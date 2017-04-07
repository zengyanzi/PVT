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
  Modal,
  TouchableHighlight,
  ListView
} from 'react-native';
import { Icon } from 'react-native-elements';
import Dimensions from 'Dimensions';
import URLnetowrk from './network';
import { FormLabel, FormInput } from 'react-native-elements';
var screenW = Dimensions.get('window').width;
var _navigator ;
var NewitemView = React.createClass({
  getInitialState: function(){
    _navigator = this.props.navigator;
    var ds = new ListView.DataSource({rowHasChanged: (row1, row2) => true});
    this.state = {
     email:this.props.email
    };
    return {
      email:this.state.email
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
              <View style={styles.Topbar}>
                <Text  style={styles.text}>  Add an new sport item here</Text>
              </View>
              <View style={styles.right}>
              </View>
          </View>
          <View >
            <FormLabel 
              labelStyle={{color: '#fff',fontSize:18}} 
            > New Item Name</FormLabel>
            <FormInput  containerStyle={{borderBottomColor: '#fff',borderBottomWidth:2}} onChangeText={(text) => this.setState({newEmail: text})}/>
            <FormLabel 
              labelStyle={{color: '#fff',fontSize:18}} 
            > How long have you worked on it today?</FormLabel>
            <FormInput  containerStyle={{borderBottomColor: '#fff',borderBottomWidth:2}} onChangeText={(text) => this.setState({Email: text})}/>
          </View>
          <View>
            <TouchableOpacity style={styles.btn}
              onPress={this._save}>
              <Text style={styles.text}>Save</Text>
             </TouchableOpacity>
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
     height: 30,
     borderRadius: 5,
   },
  text:{
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FFF'
  },
});
module.exports = NewitemView;