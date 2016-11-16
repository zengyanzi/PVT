
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

class MyrecordView extends React.Component {

  constructor() {
    super();
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
          yValues: [20, 80, 102, 101, 108, 80, 105, 89, 90],
          label: 'Real practise',
          config: {
            color: 'yellow',
            barSpacePercent: 40,
            barShadowColor: 'lightgrey',
            highlightAlpha: 90,
            highlightColor: 'red'
          }
        },{
          yValues: [80, 105, 102, 110, 114, 109, 105, 99, 95],
          label: 'Sport goal',
          config: {
            color: 'green',
            barSpacePercent: 40,
            barShadowColor: 'green',
            highlightAlpha: 90,
            highlightColor: 'red'
          }          
        }],
        xValues: [today_format, tomorrow_format, afttomorrow_format, 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
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