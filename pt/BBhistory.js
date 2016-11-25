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

class BBhisotryView extends React.Component {

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
          yValues: [12.5, 12.5, 12.5, 12.5, 12.5, 14, 14, 15, 15],
          label: 'BB BENCH PRESS',
          config: {
            color: 'yellow',
            barSpacePercent: 40,
            barShadowColor: 'lightgrey',
            highlightAlpha: 90,
            highlightColor: 'red'
          }
        }],
        xValues: [startday,day2_format,day3_format,day4_format,day5_format,day6_format,endday],
      }

    };

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
    this.setState({
            data: {
        datasets: [{
          yValues: [12.5, 12.5, 12.5, 12.5, 12.5, 14, 14, 15, 15],
          label: this.props.rowData,
          config: {
            color: 'yellow',
            barSpacePercent: 40,
            barShadowColor: 'lightgrey',
            highlightAlpha: 90,
            highlightColor: 'red'
          }
        }],
        xValues: [startday,day2_format,day3_format,day4_format,day5_format,day6_format,endday],
      }
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
export default BBhisotryView;