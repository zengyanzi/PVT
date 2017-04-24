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
  Picker,
  ListView
} from 'react-native';
import Dimensions from 'Dimensions';
import Swipeout from 'react-native-swipeout';
import Topview from './top.js';
import BottomView from './bottom.js'
import URLnetowrk from './network';
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

  var detailrows = [
    {
      Calories :"457",
      text:"Rower Moderate  5 min 30 sec fast:60 sec slow",
      autoClose: true,
    }, {
      Calories :"457",
      text: "Walking Weighted Lunge  Controlled  Light 3 15  60Sec",
      autoClose: true,
    }, {
      Calories :"457",
      text: "Upper Back 18,29 30-60 sec 1 1",
      autoClose: true,
    }, {
      Calories :"457",
      text: "Bike Fast  3min  Moderate  15  60Sec",
    },
  ];
var DetailRecordView = React.createClass({
  getInitialState: function(){
    _navigator = this.props.navigator;
    var ds = new ListView.DataSource({rowHasChanged: (row1, row2) => true});
    this.state = {
      dataSource: ds.cloneWithRows(detailrows),
      scrollEnabled: true,
      day:this.props.date,
    };
    return {
      dataSource: this.state.dataSource,
      scrollEnabled: true,
    };
  },
  componentWillMount() {
    let _that=this;
    AsyncStorage.getItem('userid',(err, result) => {
      console.log(result);
      var trainee_id=result;
      var day=this.props.date;
      var ds = new ListView.DataSource({rowHasChanged: (row1, row2) => true});
      var url = URLnetowrk+'detailrecord.action';
              // var url = 'http://192.168.20.12:8080/pt_server/traineelogin.action';
      url += '?trainee_id='+trainee_id+'&day='+day;
      console.log(url);
      fetch(url).then(function(response) {  
        return response.json();
      }).then(function(res) {
        console.log(res);
        if (res["data"]!=null) {      
          _that.setState({
           dataSource: ds.cloneWithRows(res["data"]),
           detailrows:res["data"]
          })
        }else{
          Alert.alert('Fail to display','Please check your data'); 
        }
      });
    });   
  },
//  set scrolling to true/false
  allowScroll(scrollEnabled) {
    this.setState({ scrollEnabled: scrollEnabled });
  },
  //  set active swipeout item
  handleSwipeout(sectionID,rowID) {
    for (var i = 0; i < this.state.detailrows.length; i++) {
      if (i != rowID) {
        this.state.detailrows[i].active = false;
      }
      else {
        this.state.detailrows[i].active = true;
      }
    }
    this.updateDataSource(this.state.detailrows);
  },
  updateDataSource(data) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(data),
    });
  },
  renderRow(rowData: string, sectionID: number, rowID: number) {
      var btnsTypes = [
        { text: 'Edit', onPress: function(){ _navigator.push({
                  title:'EditrecordView',
                  id:'editrecord',
                  params:{date:rowData.day,
                    itemname:rowData.itemname
                  }
                })},type: 'primary',},
          { text: 'Delete',onPress: () => { this.delete(rowData) },type: 'delete'},
     ];
    return (
      <Swipeout
        left={rowData.left}
        right={btnsTypes}
        rowID={rowID}
        sectionID={sectionID}
        autoClose={rowData.autoClose}
        backgroundColor={rowData.backgroundColor}
        close={!rowData.active}
        onOpen={(sectionID, rowID) => this.handleSwipeout(sectionID, rowID) }
        scroll={event => this.allowScroll(event)}>
        <View style={styles.li}>
              <Text style={styles.liText}>{rowData.itemname}Sportsize: {rowData.sportsize} </Text>        
        </View>
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
          <View style={[styles.Top,styles.Bottomline]}>
            <View style={[styles.Topbar,styles.Left]}>
                <TouchableOpacity 
                    onPress={() => _navigator.push({title:'AddrecordtodayView',id:'addrecordtoday'})}>
                  <Image source={require('../../img/add_pressed.png') }/>
                </TouchableOpacity> 
            </View>
            <View style={styles.Topbar}>
              <Image source={require('../../img/ptv_sized.png') }/>
            </View>          
            <View style={[styles.Topbar,styles.Right]}>
              <TouchableOpacity 
                      onPress={() => _navigator.push({title:'ChartView',id:'chart'})}>
                <Image source={require('../../img/chart-pressed.png') }/>
              </TouchableOpacity> 
            </View>         
          </View>
          <View style={[styles.header,styles.Bottomline]}>
              <Image  source={require('../../img/plan_normal.png') }/>
              <Text style={{fontSize:20}}>{this.props.date}</Text>
          </View>
          <ListView style={styles.listview}
            scrollEnabled={this.state.scrollEnabled}
            dataSource={this.state.dataSource}
            enableEmptySections={true}
            renderRow={this.renderRow}
          />
          <View>
            <BottomView {...this.props}/>
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
    paddingLeft: 16,
    paddingTop: 14,
    paddingBottom: 16,
  },
  liContainer: {
    flex: 2,
  },
  liText: {
    color: '#333',
    fontSize: 16,
    height:50,
  },
});
module.exports = DetailRecordView;