
import React from 'react';


import {
   Image,
  View,
  Text,
  StyleSheet,
  ViewPagerAndroid,
  BackAndroid,
  navigator,
  Animated,
  AsyncStorage,
  Alert
} from 'react-native';

import {BarChart} from 'react-native-mp-android-chart';

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

class MyrecordView extends React.Component {

  constructor() {
    super();
        function format (d) {
            return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
        }
        var today =new Date();
        var endday = format(today);
        var day6 = new Date(today.getTime() - 1000* 60 * 60 * 24);
        var day6_format = format(day6);
        var day5=new Date(today.getTime() - (1000* 60 * 60 * 24)*2);
        var day5_format=format(day5);
        var day4=new Date(today.getTime() - (1000* 60 * 60 * 24)*3);
        var day4_format=format(day4);
        console.log(day4_format); 
        var day3=new Date(today.getTime() - (1000* 60 * 60 * 24)*4);
        var day3_format=format(day3);
        console.log(day5_format); 
        var day2=new Date(today.getTime() - (1000* 60 * 60 * 24)*5);
        var day2_format=format(day2);
        var day1=new Date(today.getTime() - (1000* 60 * 60 * 24)*6);
        var startday=format(day1);
         

    this.state = {
      startday:startday,
      endday:endday,
      userid:null,
      legend: {
        enabled: true,
        textSize: 14,
        form: 'SQUARE',
        formSize: 14, 
        xEntrySpace: 10,
        yEntrySpace: 5,
        formToTextSpace: 5,
        wordWrapEnabled: true,
        maxSizePercent: 0.5
      },
      data: {
        datasets: [{
          yValues: [0,2,3,4,5,6,7],
          label: 'Real practise',
          config: {
            color: 'yellow',
            barSpacePercent: 40,
            barShadowColor: 'lightgrey',
            highlightAlpha: 90,
            highlightColor: 'red'
          }
        },{
          yValues: [0,2,3,4,5,6,7],
          label: 'Sport goal',
          config: {
            color: 'green',
            barSpacePercent: 40,
            barShadowColor: 'green',
            highlightAlpha: 90,
            highlightColor: 'red'
          }          
        }],
        xValues: [startday,day2_format,day3_format,day4_format,day5_format,day6_format,endday]
      },
      urldata:null
    };
        console.log(this.state.urldata);
  }


  render() {

    return (

      <View style={styles.container}>
        <BarChart
          style={styles.chart}
          data={this.state.data}
          animation={{durationX: 2000}}
          legend={this.state.legend}
          gridBackgroundColor={'#ffffff'}

          drawBarShadow={false}
          drawValueAboveBar={true}
          drawHighlightArrow={true}         
        />
      </View>
    );
  }
  componentDidMount() {
      let _that=this;
       AsyncStorage.getItem('userid',(err, result) => {
          console.log(result);
        var userid=result;
        var startday=this.state.startday;
        var endday=this.state.endday;
        console.log(userid);
        console.log(startday);
        console.log(endday);
        var url = 'http://47.90.60.206:8080/pt_server/sportchart.action';
          // var url = 'http://192.168.20.12:8080/pt_server/traineelogin.action';
          url += '?userid='+userid+'&start='+startday+'&end='+endday;
          console.log(url);
          fetch(url).then(function(response) { 
                return response.json();
              }).then(function(res) {
              console.log(res);
                if (res["data"]!=null) {
                  _that.setState(
                  {
                    data: {
                      datasets: [{
                        yValues: res["data"]["record"],
                        label: 'Real practise',
                        label: 'Real practise',
                        config: {
                          color: 'yellow',
                          barSpacePercent: 40,
                          barShadowColor: 'lightgrey',
                          highlightAlpha: 90,
                          highlightColor: 'red'
                        }
                      },{
                        yValues: res["data"]["plan"],
                        label: 'Sport goal',
                        config: {
                          color: 'green',
                          barSpacePercent: 40,
                          barShadowColor: 'green',
                          highlightAlpha: 90,
                          highlightColor: 'red'
                        }          
                      }],
                      xValues: res["data"]["date"]
                    }
                  }
                );
                

              }else{
                Alert.alert('Fail to display','Please check your data'); 
              }
        });
      });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  chart: {
    flex: 1
  }
});
export default MyrecordView;