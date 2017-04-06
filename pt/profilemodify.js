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
import { List, ListItem } from 'react-native-elements';
import URLnetowrk from './network';
var screenW = Dimensions.get('window').width;
var _navigator ;
var ProfileModifyView = React.createClass({
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
                <Text  style={styles.text}>  Update your detail information</Text>
              </View>
              <View style={styles.right}>
              </View>
          </View>
          <View >
            <List>
              <TouchableOpacity onPress={() => _navigator.push({title:'EmailModifyView',id:'emailmodify',params:{email:this.state.email}})}>
                <ListItem
                  roundAvatar
                  title='Modify Email'
                   subtitle={
                    <View style={styles.subtitleView}>
                      <Text style={styles.ratingText}>{this.state.email}</Text>
                    </View>
                  }
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => _navigator.push({title:'PhoneModifyView',id:'phonemodify',params:{email:this.state.email}})}>
                <ListItem
                  roundAvatar
                  title='Modify Phone number'
                   subtitle={
                    <View style={styles.subtitleView}>
                      <Text style={styles.ratingText}>0212949281</Text>
                    </View>
                  }
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => _navigator.push({title:'PasswordModifyView',id:'passwordmodify',params:{email:this.state.email}})}>
              <ListItem
                roundAvatar
                title='Modify Password'     
              />
              </TouchableOpacity>
            </List>
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
module.exports = ProfileModifyView;