
import React, { Component } from 'react';


import {
   Image,
  View,
  Text,
  StyleSheet,
  ViewPagerAndroid,
  BackAndroid,
  ScrollView,
  Navigator,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  Picker
} from 'react-native';
import DatePicker from './date.js';

BackAndroid.addEventListener('hardwareBackPress', function() {
  if(_navigator == null){
    return false;
  }
  if(_navigator.getCurrentRoutes().length === 1){
    return false;
  }
  _navigator.pop();
  return true;
});

var _navigator ;



var MydietView = React.createClass({

  getInitialState: function(){
    _navigator = this.props.navigator;
    this.state={
      sportname:null,
      date:null
    };
    return {
      sportname:this.state.rowData,
    };
  },

_submit: function(){
      var day=this.state.date;
      var userid=this.state.userid;
      var sportname=this.state.sportname;
      var num=sportname.indexOf(":")
      var sporttype=sportname.slice(0, num);
      var sportsize=this.state.sportsize;
      console.log(sportname);
      console.log(day);
      console.log(this.state.userid);      
      console.log(sporttype);
      console.log(sportsize);
      var url = 'http://47.90.60.206:8080/pt_server/addrecord.action';
      // var url = 'http://192.168.20.12:8080/pt_server/traineelogin.action';
      url += '?userid='+userid+'&day='+day+'&sporttype='+sporttype+'&sportsize='+sportsize;
      fetch(url).then(function(response) {  
            return response.json();
          }).then(function(res) {
          console.log(res);
            if (res["data"]!=null) {

              _navigator.push({
                title:'MyworkView',
                id:'mywork'
              });
          }else{
          Alert.alert('Fail to record','Please check your data');  
          }
        });
},
 render: function(){
       return (
      <ScrollView 
        contentContainerStyle={{flex:1}}
        keyboardDismissMode='on-drag'
        keyboardShouldPersistTaps={false}>
        
        <View style={styles.container}>
          <View style={styles.Top}>
           <Text style={styles.WelcomeText}>My daily diet</Text>
            </View>
       </View>

       <View style={styles.maincontain}>
          <View style={styles.sportlist}>
              <Picker style={styles.sportact}
              prompt="Please choose sportclass"
              style={{width:200}}
              selectedValue={this.state.sportclass}
              onValueChange={(value) => this.setState({sportclass: value})}>
              <Picker.Item label="Breakfast" value="Breakfast"/>
              <Picker.Item label="Lunch" value="Lunch" />
              <Picker.Item label="Dinner" value="Dinner" />
              <Picker.Item label="Snack" value="Snack" />

          </Picker>
              <TextInput  onChangeText={(text) => this.setState({sportsize: text})} style={styles.sportact}  keyboardType="numeric" placeholder='record'/>
              <DatePicker
                style={styles.sportdate}
                date={this.state.date}
                mode="date"
                placeholder="Date"
                format="YYYY-MM-DD"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                onDateChange={(date) => {this.setState({date: date});}}/>
          </View>
            <View style={styles.choose}>
             <TouchableOpacity style={styles.btn}
                 onPress={this._submit}>
                <Text style={styles.text}>Submit my record</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn}
                onPress={() => _navigator.push({title:'EditplanView',id:'editplan'})}>
                <Text style={styles.text}>Edit my diet</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn}
                onPress={() => _navigator.push({title:'MyplanView',id:'myplan'})}>
                <Text style={styles.text}>Delete my diet</Text>
              </TouchableOpacity>
            </View>
        </View>
      </ScrollView>
       );
  },
  componentDidMount(){
        let _that=this;
     AsyncStorage.getItem('userid',(err, result) => {
        console.log(result);
        id=result;

      _that.setState(
        {
        userid:id,
        sportname:this.props.rowData  
        }

      );
    });
  }

});

var styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#F4FCFF',
  },
  Top:{
    height:50,
    alignItems: 'center',
    backgroundColor:'#f5f2f0',
    justifyContent: 'center',
  },
  WelcomeText:{
    fontWeight: 'bold',
    fontSize: 18,
    color: '#d7499a', 

  },

  maincontain:
  {
    flex: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#F4FCFF',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:'column',
  },
   sportlist:{
     flexDirection:'row',
     justifyContent: 'space-between',
  },

  sportname:{
    flex: 3,
    height: 50,
    fontWeight: 'bold',
    fontSize: 18,
    color: '#d7499a', 
    textAlign: 'center',
    marginTop:10,
  },
  sportgoal:{
    flex: 1,
    height:50,
    textAlign: 'center',
    fontSize: 12,
    alignItems: 'center', 
    marginTop:10,
    justifyContent: 'center'
  },
  sportact:{
    flex: 2,
    height:50,
    fontSize: 12,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  sportdate:{
    flex:2,
    height:50,
  },

  choose:{
    flexDirection:'row'
  },
  input: {
   height: 40,
   width:200,
   marginTop: 10, //间隔
   borderWidth: 1, 
   borderRadius: 5, //圆角
   borderColor: 'lightblue'
  },
  btn:{
    flex:1,
     alignSelf: 'stretch',
     alignItems: 'center',
     justifyContent: 'center',
     backgroundColor: '#80b8e4',
     height: 40,
     borderRadius: 5,
     width:100,
     marginTop: 100,
     marginLeft:20,
  },
});

module.exports = MydietView;