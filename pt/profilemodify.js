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
  ListView,
  Switch
} from 'react-native';
import { Icon } from 'react-native-elements';
import Dimensions from 'Dimensions';
import { List, ListItem } from 'react-native-elements';
import URLnetowrk from '../pub/network';
import Modal from 'react-native-modalbox';
import PhoneModifyView from './phonemodify';
import PasswordModifyView from './passwordmodify';
var screenW = Dimensions.get('window').width;
var _navigator ;
var ProfileModifyView = React.createClass({
  getInitialState: function(){
    _navigator = this.props.navigator;
    var ds = new ListView.DataSource({rowHasChanged: (row1, row2) => true});
    this.state = {
     email:this.props.email,
     phone:'',
     avatarSource: null,
     videoSource: null
    };
    return {
      email:this.state.email,
      phone:this.state.phone,
      avatarSource:this.state.avatarSource,
      videoSource:this.state.videoSource
    };
  },
  componentWillMount() {
    let _that=this;
    AsyncStorage.getItem('phone',(err,result)=>{
       phone=result;
       _that.setState({
          phone:phone
       })
    })
  },

 render: function(){
    return(
      <ScrollView 
        contentContainerStyle={{flex:1}}
        keyboardDismissMode='on-drag'
        keyboardShouldPersistTaps='never'>
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
              <TouchableOpacity  onPress={() =>this.refs.modal1.open()}>
                <ListItem
                  roundAvatar
                  title='Modify Phone number'
                   subtitle={
                    <View style={styles.subtitleView}>
                      <Text style={styles.ratingText}>{this.state.phone}</Text>
                    </View>
                  }
                />
              </TouchableOpacity>
              <TouchableOpacity  onPress={() =>this.refs.modal2.open()}>
              <ListItem
                roundAvatar
                title='Modify Password'     
              />
              </TouchableOpacity>
              <View style={{flexDirection: 'row',height: 50,marginBottom:10,marginTop:10}}  >
                <Text style={{marginLeft:15,marginBottom:10,marginTop:12,marginRight:15}}>Would you like to join the Sports partners?</Text>
                <Switch
                  onValueChange={(value) => this.setState({falseSwitchIsOn: value})}
                  style={{width: 50, height:50}}
                  value={this.state.falseSwitchIsOn} />
              </View>
            </List>
          </View>
          <Modal style={[styles.modal, styles.modal3]} 
            position={"center"} ref={"modal1"} 
            isDisabled={this.state.isDisabled}>
            <PhoneModifyView {...this.props}/>
          </Modal>
          <Modal style={[styles.modal, styles.modal3]} 
            position={"center"} ref={"modal2"} 
            isDisabled={this.state.isDisabled}>
            <PasswordModifyView {...this.props}/>
          </Modal>
        </View>   
      </ScrollView>
    );
  },
});
var styles = StyleSheet.create({
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
  modal: {
    padding:20
  },
  modal3: {
    height: 320,
    borderRadius:25
  },
});
module.exports = ProfileModifyView;