//  include react-native-swipeout
import Swipeout from 'react-native-swipeout';
//  example row data (see for json structure)
import rows from './data';
//  example styles

import React, {Component} from 'react';
import {AppRegistry, StyleSheet, ListView, Text, View} from 'react-native';

//  example swipout app
class SwipeoutExample extends Component {

  constructor() {
    super();

    //  datasource rerendered when change is made (used to set swipeout to active)
    var ds = new ListView.DataSource({rowHasChanged: (row1, row2) => true});

    this.state = {
      dataSource: ds.cloneWithRows(rows),
      scrollEnabled: true,
    };
  }

  //  set scrolling to true/false
  _allowScroll(scrollEnabled) {
    this.setState({ scrollEnabled: scrollEnabled });
  }

  //  set active swipeout item
  _handleSwipeout(sectionID, rowID) {
    for (var i = 0; i < rows.length; i++) {
      if (i != rowID) rows[i].active = false;
      else rows[i].active = true;
    }
    this._updateDataSource(rows);
  }

  _updateDataSource(data) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(data),
    });
  }

  _renderRow(rowData: string, sectionID: number, rowID: number) {
    return (
      <Swipeout
        left={rowData.left}
        right={rowData.right}
        rowID={rowID}
        sectionID={sectionID}
        autoClose={rowData.autoClose}
        backgroundColor={rowData.backgroundColor}
        close={!rowData.active}
        onOpen={(sectionID, rowID) => this._handleSwipeout(sectionID, rowID) }
        scroll={event => this._allowScroll(event)}>
        <View style={styles.li}>
          <Text style={styles.liText}>{rowData.text}</Text>
        </View>
      </Swipeout>
    );
  }

  render() {
    return (
           <ScrollView 
            contentContainerStyle={{flex:1}}
            keyboardDismissMode='on-drag'
            keyboardShouldPersistTaps={false}>
          <View style={styles.maincontain}>
              <View style={[styles.Top,styles.Bottomline]}>
                <View style={[styles.Topbar,styles.Left]}>
                    <TouchableOpacity 
                        onPress={() => _navigator.push({title:'ThomeView',id:'Thome'})}>
                      <Image source={require('../img/back.png') }/>
                     </TouchableOpacity> 
                </View>
                <View style={styles.Topbar}>
                  <Image source={require('../img/ptv_sized.png') }/>
                </View>
                <View style={[styles.Topbar,styles.Right]}>
                  
                </View>
              </View>
            <View>
              <Text style={styles.text}>Please Choose the Date</Text>
              <DatePicker
                style={styles.datepicker}
                date={this.state.date}
                mode="date"
                placeholder="Date"
                format="YYYY-MM-DD"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                onDateChange={(date) => {this.setState({date: date});}}/>
            </View>
            <View>
                <Text style={styles.text}>Please Choose the sport item</Text>
             <Picker 
                  prompt="Please choose sportname"
                  style={{width:200,color:'#fff',alignItems:'center'}}
                  selectedValue={this.state.sportselected}
                  onValueChange={(value) => this.setState({sportselected: value})}>
                 
                    { this.state.sportname.map((s, i) => {
                        return <Picker.Item
                                 key={i}
                                 value={s}
                                 label={s} />
                     }) }
               
              </Picker>
            </View>
            <View style={styles.slider}>
              <Text style={styles.text}>Please Choose the sport size</Text>
              <Slider 
                value={this.state.value}
                maximumValue={100}
                step={0.5}
                trackStyle={customStyles2.track}
                thumbStyle={customStyles2.thumb}
                thumbTouchSize={{width: 50, height: 40}}
                minimumTrackTintColor='#2cb395'
                onValueChange={(value) => Math.floor(this.setState({value}))} />
              <Text style={styles.text}>Value:{this.state.value} </Text>
            </View>
            <View>
              <TouchableOpacity style={styles.btn}
              onPress={this._submit}>
              <Text style={styles.text}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
    );
  }

}
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
    flex: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#38bda0',
    alignItems: 'center',
    flexDirection:'column',

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
     listview: {
    flex: 1,
  },
  li: {
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
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
  },
  navbar: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    justifyContent: 'center',
    height: 44,
  },
  navbarTitle: {
    color: '#444',
    fontSize: 16,
    fontWeight: "500",
  },
  statusbar: {
    backgroundColor: '#fff',
    height: 22,
  }
});
export default SwipeoutExample;