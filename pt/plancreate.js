
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
  TouchableHighlight,
  AsyncStorage,
  Picker,
  ListView,
  Alert,
} from 'react-native';


import Dimensions from 'Dimensions';
import Swipeout from 'react-native-swipeout';

var screenW = Dimensions.get('window').width;
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
 var btnsDefault = [ { text: 'Button' } ];

  var btnsTypes = [
      { text: 'Detail', onPress: function(){ _navigator.push({
                title:'PlanInfoView',
                id:'planinfo'
              })},type: 'primary',},

      
  ];
  var detailrows = [
  {
    rowID:'1',
     Calories :"957",
     text: "Full Body Workout",
     right:btnsTypes,
    autoClose: true,
  }, {
    rowID:'2',
    Calories :"1457",
    text: "Strength,Shape,Tone",
    right:btnsTypes,
    autoClose: true,
  }, {
    rowID:'3',
    Calories :"1657",
    text: "Mixed Cadio",
    right:btnsTypes,
    autoClose: true,
  }, {
    rowID:'4',
    Calories :"1257",
    text: "Tone Shape",
    right:btnsTypes,
  },
   {
    rowID:'5',
    Calories :"1257",
    text: "Tone Shape",
    right:btnsTypes,
  },
   {
    rowID:'6',
    Calories :"1257",
    text: "Tone Shape",
    right:btnsTypes,
  },
   {
    rowID:'7',
    Calories :"1257",
    text: "Tone Shape",
    right:btnsTypes,
  },
   {
    rowID:'8',
    Calories :"1257",
    text: "Tone Shape",
    right:btnsTypes,
  },

  ];



var PlanCreateView = React.createClass({

  getInitialState: function(){
    _navigator = this.props.navigator;
    var ds = new ListView.DataSource({rowHasChanged: (row1, row2) => true});
    this.state = {
      dataSource: ds.cloneWithRows(detailrows),
      scrollEnabled: true,
      optionplanid:'',
      planid:1,

    };
    return {
      dataSource: this.state.dataSource,
      scrollEnabled: true,
      optionplanid:this.state.optionplanid,
      planid:this.state.planid

    };

  },
//  set scrolling to true/false
  allowScroll(scrollEnabled) {
    this.setState({ scrollEnabled: scrollEnabled });
  },

  //  set active swipeout item
  handleSwipeout(sectionID,rowID) {
    for (var i = 0; i < detailrows.length; i++) {
      if (i != rowID) detailrows[i].active = false;
      else detailrows[i].active = true;

    }
    this.updateDataSource(detailrows);
  },

  updateDataSource(data) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(data),
    });
  },

  renderRow(rowData: string, sectionID: number, rowID: number,) {
  
    return (
      <Swipeout
        left={rowData.left}
        right={rowData.right}
        rowID={rowID}
        sectionID={sectionID}
        autoClose={rowData.autoClose}
        backgroundColor='transparent'
        close={!rowData.active}
   

        onOpen={(sectionID, rowID) => this.handleSwipeout(sectionID, rowID) }
        scroll={event => this.allowScroll(event)}>
         <TouchableHighlight style={styles.li} activeOpacity={0.5} underlayColor = '#2cb395'  onPress={() =>this.setState({planid:parseInt(rowID)+1})}>
          
                <Text style={styles.liText}>Plan NO: {parseInt(rowID)+1} {rowData.text}Calories: {rowData.Calories}</Text>        
          
        </TouchableHighlight >
      </Swipeout>
    );
  },


_editplan:function(){
     _navigator.push({
      title:'TraineeloinView',
      id:'traineelogin'
    })
   },

 render: function(){

      return(
         <ScrollView 
            contentContainerStyle={{flex:1}}
            keyboardDismissMode='on-drag'
            keyboardShouldPersistTaps={false}>
          <View style={styles.maincontain}>
            <Text style={styles.text}>Your Plan is NO: {this.state.planid}</Text>
            <ListView style={styles.listview}
              scrollEnabled={this.state.scrollEnabled}
              dataSource={this.state.dataSource}
              initialListSize={6}
              renderRow={this.renderRow}
              />
          </View>

        </ScrollView>
        );

  },

        componentDidUpdate() {
        var planid=this.state.planid.toString();
        AsyncStorage.setItem("planid",planid);

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
    justifyContent: 'center',
  },
  Bottomline:{
    borderBottomWidth:2,
    borderColor:'gray'
  },

  Topbar:{
    flex:1,
    alignItems: 'center',

  },
  Left:{
    position: 'absolute', 
    top: 5, 
    left: 5
  },
  Right:{
    position: 'absolute', 
    top: 5, 
    right: 5,
  },
  maincontain:
  {
    flex: 1,
    backgroundColor: '#38bda0',
    flexDirection:'column',

  },
  header:{

    flexDirection: 'row',
    height:50,
    alignItems: 'center',
    backgroundColor:'#fff',
    justifyContent: 'center',

  },

  listview: {
    flex: 1,
  },
  li: {
    backgroundColor: '#fff',
    borderBottomColor: '#38bda0',
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft:5,
    paddingTop: 5,
    paddingBottom:5,
  },
  liContainer: {
    flex: 1,
  },
  liText: {
    color: '#333',
    fontSize: 18,
  },
  choosestyle:{
    borderColor:'red'
  },
 text:{
    fontSize:18,
    color:'#fff',
  },
});
module.exports = PlanCreateView;