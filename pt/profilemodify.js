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


class Button extends Component {
  state = {
  active: false,
  };
  _onHighlight = () => {
  this.setState({active: true});
  };
  _onUnhighlight = () => {
  this.setState({active: false});
  };
  render() {
  var colorStyle = {
    color: this.state.active ? '#fff' : '#000',
  };
  return (
    <TouchableHighlight
    onHideUnderlay={this._onUnhighlight}
    onPress={this.props.onPress}
    onShowUnderlay={this._onHighlight}
    style={[styles.button, this.props.style]}
    underlayColor="#a9d9d4">
      <Text style={[styles.buttonText, colorStyle]}>{this.props.children}</Text>
    </TouchableHighlight>
  );
  }
}

var screenW = Dimensions.get('window').width;


var _navigator ;





var ProfileModifyView = React.createClass({

  getInitialState: function(){
    _navigator = this.props.navigator;
    var ds = new ListView.DataSource({rowHasChanged: (row1, row2) => true});

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
        
                <View style={styles.Topbar}>

                </View>
                
                <View style={styles.right}>

                </View>

              </View>
            <View>

            </View>
           <View >

            <List>
              <TouchableOpacity onPress={() => _navigator.push({title:'EmailModifyView',id:'emailmodify'})}>

              <ListItem
                roundAvatar
                title='Modify Email'
                 subtitle={
                  <View style={styles.subtitleView}>
                    <Text style={styles.ratingText}>zeng@gmail.com</Text>
                  </View>
                }
              />
            </TouchableOpacity>

              <ListItem
                roundAvatar
                title='Modify Nickname'
                 subtitle={
                  <View style={styles.subtitleView}>
                    <Text style={styles.ratingText}>Jenny bunny</Text>
                  </View>
                }
              />
              <ListItem
                roundAvatar
                title='Modify Password'
             
              />
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
     height: 30,
     borderRadius: 5,
   },
});
module.exports = ProfileModifyView;