
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
          yValues: [100, 105, 102, 110, 114, 109, 105, 99, 95],
          label: 'Bar dataset',
          config: {
            color: 'teal',
            barSpacePercent: 40,
            barShadowColor: 'lightgrey',
            highlightAlpha: 90,
            highlightColor: 'red'
          }
        }],
        xValues: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
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