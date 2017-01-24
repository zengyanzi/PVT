
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
import DatePicker from './date.js';
import TabNavigator from 'react-native-tab-navigator';
import Dimensions from 'Dimensions';

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




var PlanView = React.createClass({

  getInitialState: function(){
    _navigator = this.props.navigator;
        function format (d) {
            return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
        }
        var today =new Date();
        var today_format = format(today);
        console.log(today_format);//今天
        var tomorrow = new Date(today.getTime() + 1000* 60 * 60 * 24);
        var tomorrow_format = format(tomorrow);
        console.log(tomorrow_format); 
        var afttomorrow=new Date(today.getTime() + 1000* 60 * 60 * 24+1000* 60 * 60 * 24);
        var afttomorrow_format=format(afttomorrow);
        console.log(afttomorrow_format); 
        var data = {
            Monday: ['BB BENCH PRESS:12.5','CABLE UPRIGHT ROW:60', 'OPP ARM LEG EXTENSION:4','FRONT RAISE:7'],
            Tuesday: ['CLOSE MACHINE ROW:6','INCLINE DB BENCH:12.5 ', 'DB FLYS:7','REVERSE ASSISTED CHIN UPS(not):green ', 'WIDE LATT PULLDOWN:80 '],
            Wednesday: ['LEGS PRESS:120','CLOSE MACHINE ROW:6' ,'PRONE HOLD/PLANK:30'],
            Thursday: [ 'MILITARY PRESS:30','KB STEP UPS:6','SB PRONE ROLL OUTS(not):BW'],
            Friday: ['PRONE HOLD/PLANK:30', 'INCLINE DB BENCH:12.5 ','OPP ARM LEG EXTENSION:4'],
        };
        var sectionIDs = ['Monday','Tuesday','Wednesday','Thursday','Friday'];
   
        var rowIDs = [[0,1,2,3],[0,1,2,3,4],[0,1,2],[0,1,2],[0,1,2]]
        var ds = new ListView.DataSource({
            getRowData: this.getRowData,
            getSectionHeaderData: this.getSectionData,
            rowHasChanged: (row1, row2) => row1 !== row2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
        });



    var grouptype = {};
    grouptype['CHEST']=['BB BENCH PRESS', 'DB FLYS', 'INCLINE DB BENCH'];
    grouptype['BACK']=['CLOSE MACHINE ROW', 'REVERSE ASSISTED CHIN UPS', 'WIDE LATT PULLDOWN'];
    grouptype['lEGS']=['LEGS PRESS', 'KB STEP UPS','Other'];
    grouptype['SHOULDERS']=['CABLE UPRIGHT ROW', 'MILITARY PRESS','FRONT RAISE'];
    grouptype['STOMACH']=['PRONE HOLD/PLANK', 'OPP ARM LEG EXTENSION','SB PRONE ROLL OUTS'];
    this.state = {
      grouptype:grouptype,
      sportclass: 'CHEST',
      sporttype:null,
      selectedTab: 'View',
      dataSource: ds.cloneWithRowsAndSections(data, sectionIDs, rowIDs)
    };
    return {
       selectedTab:this.state.selectedTab,
       sportclass:this.state.sportclass,
       sporttype:this.state.sporttype,
       grouptype:this.state.grouptype,
       dataSource:this.state.dataSource
    };


  },
    getRowData(dataBlob, sectionID, rowID){
            return dataBlob[sectionID][rowID];
    },

    getSectionData(dataBlob, sectionID ){
                return sectionID;
    },





    renderHeader() {
        return (

            <View style={styles.header}>
                    <Text>
                        HERR IS YOUR WORK PLAN
                    </Text>
            </View>

        );
    },


    renderFooter() {
        return (
            <View style={styles.footer}>
                <Text>
                    CONTINUE
                </Text>
            </View>
        );
    },

    renderSectionHeader(sectionData, sectionID) {
        return (
            <View style={styles.section}>
                <Text>
                    {sectionData}
                </Text>
            </View>
        );
    },

    renderRow(rowData, sectionID, rowID,sectionData) {
        return (
            <TouchableOpacity  onPress={() => _navigator.push({title:"MysessionView",id:"mysession",params:{rowData:rowData}})}>
                <View style={styles.row}>
                   
                   
                    <Text style={styles.text}>{rowData}</Text>
                 
                </View>
             </TouchableOpacity>

        );
    },

 render: function(){
    var AddView = (

      <ScrollView 
        contentContainerStyle={{flex:1}}
        keyboardDismissMode='on-drag'
        keyboardShouldPersistTaps={false}>
         
        <View style={styles.container}>
          <View style={styles.Top}>
           <Text style={styles.WelcomeText}>My plan manage</Text>
          </View>
        </View>
       <View style={styles.maincontain}>
          <Picker style={styles.sportact}
              prompt="Please choose sportclass"
              style={{width:200}}
              selectedValue={this.state.sportclass}
              onValueChange={(value) => this.setState({sportclass: value})}>
              <Picker.Item label="CHEST" value="CHEST"/>
              <Picker.Item label="BACK" value="BACK" />
              <Picker.Item label="lEGS" value="lEGS" />
              <Picker.Item label="SHOULDERS" value="SHOULDERS" />
              <Picker.Item label="STOMACH" value="STOMACH" />
          </Picker>

          <Picker style={styles.sportact}
              prompt="Please choose sporttype"
              style={{width:200}}
              selectedValue={this.state.sporttype}
              onValueChange={(value) => this.setState({sporttype: value})}>
              <Picker.Item label={this.state.grouptype[this.state.sportclass][0]} value={this.state.grouptype[this.state.sportclass][0]} />
              <Picker.Item label={this.state.grouptype[this.state.sportclass][1]} value={this.state.grouptype[this.state.sportclass][1]} />
              <Picker.Item label={this.state.grouptype[this.state.sportclass][2]} value={this.state.grouptype[this.state.sportclass][2]} />
          </Picker>
              <TextInput  onChangeText={(text) => this.setState({sportsize: text})} style={styles.sportact}  keyboardType="numeric" placeholder='Target'/>
              <DatePicker
                style={styles.sportdate}
                date={this.state.date}
                mode="date"
                placeholder="Date"
                format="YYYY-MM-DD"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                onDateChange={(date) => {this.setState({date: date});}}/>
                <View style={styles.choose}>
                 <TouchableOpacity style={styles.btn}
                     onPress={this._submit}>
                    <Text style={styles.text}>Submit</Text>
                  </TouchableOpacity>
                </View>

        </View>
         
        </ScrollView>
    );
        
        
    var PlanView =(
            <View style={styles.container}>
                <ListView
                    dataSource={this.state.dataSource}
                    style={styles.listview}
                    onChangeVisibleRows={(visibleRows, changedRows) => console.log({visibleRows, changedRows})}
                    renderHeader={this.renderHeader}
                    renderFooter={this.renderFooter}
                    renderSectionHeader={this.renderSectionHeader}
                    renderRow={this.renderRow}

                    initialListSize={10}
                    pageSize={10}
                    scrollRenderAheadDistance={2000}
                />

            </View>
    );
       return (
        <TabNavigator
          tabBarStyle={{ height: 60 }}
        >
          <TabNavigator.Item
              selected={this.state.selectedTab === 'View'}
              title="View"
              renderIcon={() => <Image style={styles.img} source={require('../img/home_tab_home_normal.png') }/>}
              renderSelectedIcon={() => <Image style={styles.img} source={require('../img/home_tab_home_pressed.png') }/>}
              
              
             onPress={() => this.setState({ selectedTab: 'View' })}

          >
            {PlanView}
          </TabNavigator.Item>
          <TabNavigator.Item
              selected={this.state.selectedTab === 'Add'}
              title="Add"
              renderIcon={() => <Image style={styles.img} source={require('../img/home_tab_setting_normal.png') }/>}
              renderSelectedIcon={() => <Image style={styles.img} source={require('../img/home_tab_setting_pressed.png') }/>}
              
              onPress={() => this.setState({ selectedTab: 'Add' })}
             
              >

               {AddView}
          </TabNavigator.Item>


        </TabNavigator>
      

       );
  },

});

var styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#F4FCFF',
    justifyContent: 'center',
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
    alignItems: 'center',
    flexDirection:'column',

  },
  sportact:{
    marginTop:20,
    height:50,
    width:200,
    fontSize: 18
  },
  sportdate:{
    marginTop:20,
    height:50,
    width:200
  },

  choose:{
    flexDirection:'row'
  },
  input: {
   height: 40,
   width:200,
   borderWidth: 1, 
   borderRadius: 5, //圆角
   borderColor: 'lightblue'
  },
  btn:{
     alignSelf: 'stretch',
     alignItems: 'center',
     justifyContent: 'center',
     backgroundColor: '#80b8e4',
     height: 40,
     borderRadius: 5,
     width:200,
     marginTop:20,
  },
    buttonstyle: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 150,
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor: '#06c1ae',
        marginBottom: 5,
    },
    section:{
        borderColor: 'blue',
        borderWidth: 1,
        backgroundColor:'#cdcdcd',
        width:screenW,

    },
    header:{
        borderColor: 'red',
        borderWidth: 1,
        backgroundColor:'#80b8e4',
        width:screenW,
        height:44,
        justifyContent: 'center',
        alignItems:'center',

    },
    footer:{
        borderColor: 'yellow',
        borderWidth: 1,
        backgroundColor:'#d7499a',
        width:screenW,
        height:44,
        justifyContent: 'center',
        alignItems:'center',
    },
    row:{
        borderColor: 'gray',
        borderWidth: 1,
        backgroundColor:'#f5f2f0',
        height:40,
        justifyContent: 'center',
        alignItems: 'center',
        width:screenW,
    },
});

module.exports = PlanView;