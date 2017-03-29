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
  ListView
} from 'react-native';

import { Icon } from 'react-native-elements';
import Dimensions from 'Dimensions';
import { List, ListItem } from 'react-native-elements';


var screenW = Dimensions.get('window').width;


var _navigator ;


var ProfileView = React.createClass({

  getInitialState: function(){
    _navigator = this.props.navigator;
    var ds = new ListView.DataSource({rowHasChanged: (row1, row2) => true});

    this.state = {


    };
    return {
       
    };

  },



  _logout: function(){
            _navigator.push({
            title:'main',
            id:'main'
           });  
      AsyncStorage.removeItem('type',(err,result)=>{
        console.log(result);
      });

      AsyncStorage.removeItem('email',(err,result)=>{
        console.log(result);
      });
      AsyncStorage.removeItem('password',(err,result)=>{
        console.log(result);
      
      });
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

                </View>
                
                <View style={styles.right}>

                </View>

              </View>
            <View>

            </View>
           <View >

           <TouchableOpacity onPress={() => _navigator.push({title:'ProfileModifyView',id:'profilemodify'})}>
            <List>
              <ListItem
                roundAvatar
                title='Zeng Jenny'
                subtitle={
                  <View style={styles.subtitleView}>
                    <Text style={styles.ratingText}>zeng@gmail.com</Text>
                  </View>
                }
                avatar={require('../img/profile_normal.png')}
              />
            </List>
            </TouchableOpacity>
          
            <List>
              <ListItem
                roundAvatar
                title='Gender'
                avatar={require('../img/gender.png')}
              />
              <ListItem
                roundAvatar
                title='Birthday'
                avatar={require('../img/plan_normal.png')}
              />
      
            <ListItem
                roundAvatar
                title='Height'
                avatar={require('../img/height.png')}
              />
            <ListItem
                roundAvatar
                title='Initial Weight'
                avatar={require('../img/weight.png')}
              />
            <ListItem
                roundAvatar
                title='Target Weight'
                avatar={require('../img/target.png')}
              />
            <ListItem
                roundAvatar
                title='BMI'
                avatar={require('../img/Heart.png')}
              />
            </List>
            </View>  
            <View >
              <TouchableOpacity style={styles.btn}
              onPress={this._logout}>
              <Text style={styles.text}>Logout</Text>
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
   subtitleView: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 5
  },
  ratingImage: {
    height: 19.21,
    width: 100
  },
  ratingText: {
    paddingLeft: 10,
    color: 'grey'
  },
    btn:{
     alignItems: 'center',
     justifyContent: 'center',
     backgroundColor: '#2cb395',
     height: 50,
     borderRadius: 5,
   }
});
module.exports = ProfileView;