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
  Linking,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  Picker,
  ListView,
  Alert
} from 'react-native';
import Dimensions from 'Dimensions';
import Swipeout from 'react-native-swipeout';
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
//delete choose item
// detailrows = [
//     {
//       Name :"Jetts",
//       slogan:"Enjoy your everyday with Jetts",  
//       Open:"7x24 membership",
//       Contact:"0800-0201-023",
//       Location:"24 shally rd,Tamaki drive"
//     }
//   ];
class CustomButton extends React.Component {
  constructor(props){
    super(props);
  }
  propTypes: {
    url: React.PropTypes.string,
  }
  render() {
    return (
      <TouchableOpacity
        style={styles.button}
        underlayColor="#a5a5a5"
        onPress={()=>Linking.canOpenURL(this.props.url).then(supported => {
           if (supported) {
               Linking.openURL(this.props.url);
           } else {
              console.log('无法打开该URI: ' + this.props.url);
           }
        })}>
        <Text style={styles.buttonText}>{this.props.text}</Text>
      </TouchableOpacity>
    );
  }
}

var DetailGymView = React.createClass({
  getInitialState: function(){
    _navigator = this.props.navigator;
    this.state = {
      name :"Jetts",
      slogan:"Enjoy your everyday with Jetts",  
      open:"7x24 membership",
      contact:"0800-0201-023",
      location:"24 shally rd,Tamaki drive"
    };
    return {
       name:this.props.data.name,
       slogan:this.props.data.slogan,
       open:this.props.data.open,
       contact:this.props.data.contact,
       location:this.props.data.location
    };
  },
  // componentWillMount() {
  //   let _that=this;
  //   AsyncStorage.getItem('userid',(err, result) => {
  //     console.log(result);
  //     var trainee_id=result;
  //     var day=this.props.date;
  //     var ds = new ListView.DataSource({rowHasChanged: (row1, row2) => true});
  //     var url = URLnetowrk+'gym.action';
  //     // var url = 'http://192.168.20.12:8080/pt_server/traineelogin.action';
  //     console.log(url);
  //     fetch(url).then(function(response) {  
  //       return response.json();
  //     }).then(function(res) {
  //       console.log(res); 
  //       if (res["data"]!=null) {        
  //         _that.setState({
  //          // name:this.state.name,
  //          // slogan:this.state.slogan,
  //          // open:this.state.open,
  //          // contact:this.state.contact,
  //          // location:this.state.location
  //         })
  //       }else{
  //         Alert.alert('Fail to display','Please check your data'); 
  //       }  
  //     });       
  //   });  
  // },
//  set scrolling to true/false
  // allowScroll(scrollEnabled) {
  //   this.setState({ scrollEnabled: scrollEnabled });
  // },
  // //  set active swipeout item
  // handleSwipeout(sectionID,rowID) {
  //   for (var i = 0; i < this.state.detailrows.length; i++) {
      
  //     if (i != rowID){
  //       this.state.detailrows[i].active = false;
  //     } 
  //     else{
  //       this.state.detailrows[i].active = true;
  //     } 
  //   }
  //   this.updateDataSource(this.state.detailrows);
  // },
  // updateDataSource(data) {
  //   this.setState({
  //     dataSource: this.state.dataSource.cloneWithRows(data),
  //   });
  // },
  
  // renderRow(rowData: string, sectionID: number, rowID: number) {
  //   var btnsTypes = [
  //     { text: 'Edit', onPress: function(){ _navigator.push({
  //               title:'EditplanView',
  //               id:'editplan',
  //               params:{date:rowData.day,
  //                 itemname:rowData.item_name,
  //                 dayplan_id:rowData.id
  //               }
  //             })},type: 'primary',},
  //       { text: 'Submit',onPress:  () => { this.submitrecord(rowData) },type:'secondary'},
  //       { text: 'Delete',onPress: () => { this.delete(rowData) },type: 'delete'},
  //   ];
  //   return (
  //     <Swipeout
  //       left={rowData.left}
  //       right={btnsTypes}
  //       rowID={rowID}
  //       sectionID={sectionID}
  //       autoClose={rowData.autoClose}
  //       backgroundColor={rowData.backgroundColor}
  //       close={!rowData.active}
  //       onOpen={(sectionID, rowID) => this.handleSwipeout(sectionID, rowID) }
  //       scroll={event => this.allowScroll(event)}>
  //       <View style={styles.li}>
  //             <Text style={styles.liText}>Name:{rowData.Name}</Text>  
  //             <Text style={styles.liText}>slogan: {rowData.slogan} </Text>
  //             <Text style={styles.liText}>slogan: {rowData.slogan} </Text>           
  //       </View>
  //     </Swipeout>
  //   );
  // },
  render: function(){
    return(
       <ScrollView 
          contentContainerStyle={{flex:1}}
          keyboardDismissMode='on-drag'
          keyboardShouldPersistTaps='never'>
        <View style={styles.maincontain}>
          <View style={[styles.Top,styles.Bottomline]}>
            <View style={[styles.Topbar,styles.Left]}>
              <TouchableOpacity 
                  onPress={() => _navigator.jumpBack()}>
                <Image source={require('../img/back.png') }/>
              </TouchableOpacity> 
            </View>
            <View style={styles.Topbar}>
              <Image source={require('../img/ptv_sized.png') }/>
            </View>
              <View style={[styles.Topbar,styles.Right]}>             
            </View>
          </View>
          <View style={styles.li}>
            <View style={{flexDirection:'row'}}>
              <Image source={require('../img/gymname.png') }/>
              <Text style={styles.liText}>  Name:{this.state.name}</Text> 
            </View>
            <View style={{flexDirection:'row'}}>  
              <Image source={require('../img/slogan.png') }/>   
              <Text style={styles.liText}>  Slogan: {this.state.slogan} </Text>
            </View>
            <View style={{flexDirection:'row'}}>  
              <Image source={require('../img/phone.png') }/>
              <Text style={styles.liText}>   Contact: {this.state.contact} </Text>
            </View>
            <View>
                  <CustomButton url={'tel:'+this.state.contact} text="Call the Gym right now"/>
            </View>
            <View style={{flexDirection:'row'}}>  
              <Image source={require('../img/open.png') }/>
              <Text style={styles.liText}>  open: {this.state.open} </Text>
            </View>
            <View style={{flexDirection:'row'}}>  
              <Image source={require('../img/location.png') }/>
              <Text style={styles.liText}>  Location: {this.state.location} </Text>
            </View>                
          </View>

          <View>
            
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
  button: {
    margin:5,
    backgroundColor: 'white',
    padding: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#cdcdcd',
  },
});
module.exports = DetailGymView;