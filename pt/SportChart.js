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
  Picker,
  AsyncStorage
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

class SportChartView extends React.Component {

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
      sportselected:'',
      sportname:['BB BENCH PRESS', 'DB FLYS', 'INCLINE DB BENCH','Rower','Treadmill'],
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
      },
      type:'CHEST'


    };

  }
componentWillMount() {
        let _that=this; 
        function format (d) {
            return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
        }
        var today =new Date();
        var end = format(today);
        var day1=new Date(today.getTime() - (1000* 60 * 60 * 24)*6);
        var startday=format(day1);
        var urlitem = 'http://47.90.60.206:8080/pt_server/item.action';  
            fetch(urlitem).then(function(response) {  
                    return response.json();
                  }).then(function(res) { 
                   
                     if (res["data"]!=null) {
                     //get the sport item name from the database
                     var sportobj=res["data"];
                     var arr=[];
                     for(i in sportobj){
                      
                      arr.push(sportobj[i]["name"]);
                     }
                     console.log(arr);
                      _that.setState({
                        sportname:arr
                    })
                    }else{
                      Alert.alert('Fail to display','Please check your data'); 
                }
                
             
             });
        AsyncStorage.getItem('userid',(err, result) => {
          console.log(result); 
        var trainee_id=result;
        var type=this.state.type;
        var sporttype=type.replace(/\s+/g,'%20');
        console.log(trainee_id);
        console.log(type);
        console.log(sporttype);
        console.log(startday);
        console.log(end);
        var url = 'http://www.zhimainz.com:8080/pt_server/stat.action';
          // var url = 'http://192.168.20.12:8080/pt_server/traineelogin.action';
          url += '?trainee_id='+trainee_id+'&start='+startday+'&end='+end;
          console.log(url);
          fetch(url).then(function(response) { 
                return response.json();
              }).then(function(res) {
              console.log(res);
                if (res["data"]!=null) {
                  var energy=[];
                  var date=[];
                  for (var i = 0; i < res["data"].length; i++) {
                    energy.push(res["data"][i]["energy"]);
                    date.push(res["data"][i]["day"]);
                  };
                  console.log(energy);
                   console.log(date);
                 _that.setState(
                  {
                    data: {
                      datasets: [{
                        yValues: energy,
                        label: type,
                        config: {
                          color: 'red',
                          barSpacePercent: 40,
                          barShadowColor: 'lightgrey',
                          highlightAlpha: 90,
                          highlightColor: 'red'
                        }
                      }],
                      xValues: date
                    }
                  }
                );
                

              }else{
                Alert.alert('Fail to display','Please check your data'); 
              }
        });
      });

  }  
  render() {
    return (
      <View style={styles.container}>
        <Picker style={styles.sportact}
          prompt="Please choose sportclass"
          style={{width:200}}
          selectedValue={this.state.sportselected}
          onValueChange={(value) => this.setState({sportselected: value})}>
                    { this.state.sportname.map((s, i) => {
                        return <Picker.Item
                                 key={i}
                                 value={s}
                                 label={s} />
                     }) }
        </Picker>
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
  },
  sportact:{
    marginTop:20,
    height:50,
    width:200,
  },
});
export default SportChartView;