
import React, { Component } from 'react';


import {

    StyleSheet,
    View,
    ListView,
    Text,
    BackAndroid,
    TouchableOpacity,
    navigator,
    ScrollView,
    DatePickerAndroid
} from 'react-native';
var Dimensions = require('Dimensions');

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
class MyhistoryView extends Component {

    constructor(props) {
        super(props);//这一句不能省略，照抄即可

        var getSectionData = (dataBlob, sectionID) => {
            return dataBlob[sectionID];
        };

        var getRowData = (dataBlob, sectionID, rowID) => {
            return dataBlob[sectionID + ':' + rowID];
        };


        this.state = {
            dataSource:new ListView.DataSource({
                getSectionData          : getSectionData,
                getRowData              : getRowData,
                rowHasChanged:(row1,row2)=> row1 !== row2,
                sectionHeaderHasChanged : (s1, s2) => s1 !== s2

            }),
        };
    }



    render(){


        //从网络上获取了数据的情况
        //var movie = this.state.movies[0];
        //return this.renderMovie(movie);

        return(

            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>My Plan</Text>
                </View>

                <ListView
                    dataSource = {this.state.dataSource}
                    style      = {styles.listview}
                    renderRow  = {this.renderRow}
                    renderSectionHeader = {this.renderSectionHeader}
                    />

            </View>


        );

    }

    renderSectionHeader(sectionData, sectionID) {
        return (
            <View style={styles.section}>
                <Text style={styles.text}>{sectionData}</Text>
            </View>
        );
    }

    renderRow (rowData, sectionID, rowID) {
    return (

            <View style={styles.rowStyle}>
                <Text style={styles.rowText}>{rowData.name} : {rowData.content} {rowData.target}{rowID}</Text>
            </View>

    );
}




    componentDidMount() {
        //this.fetchData();

        this.fetchData2();
    }

    fetchData2 () {
       var responseData={
            "results" : [
                {
                    "SDate":"Monday",
                    "id" : 12348124,
                    "types" : [{"type":{"name":"BACK","content":"MILITARY PRESS","target":"19"}}],
                },
                {
                    "SDate" : "Tuesday",
                    "id" : 1235513,
                    "types" : [{"type":{"name":"CHEST","content":"BB BENCH PRESS","target":"12"}}],
                },
                {
                    "SDate" : "Friday",
                    "id" : 1237141,
                    "types" : [{"type":{"name":"SHOULDER","content":"CLOSE MACHINE ROW","target":"6.5"}}],
                },
                {
                    "SDate" : "Sunday",
                    "id" : 1727272,
                    "types" : [{"type":{"name":"STOMACH","content":"LEGS PRESS","target":"80"}}],
                }
            ]
        };
 
         var SDates = responseData.results,
                length = SDates.length,
            //4个组织机构
                dataBlob = {},
                sectionIDs = [],
                rowIDs = [],
                SDate,
                types,
                typeLength,
                type,
                i,
                j;

            for (i = 0; i < length; i++) {
                //某个组织机构的所有信息organization
                SDate = SDates[i];

                sectionIDs.push(SDate.id);
                //片段id为 12348124 内容为 ：马云的淘宝
                dataBlob[SDate.id] = SDate.SDate;

                types = SDate.types;//某个组织的所有用户
                typeLength = types.length;//该组织一共有多少人？

                rowIDs[i] = [];//rowIDs是一个二维数组

                for(j = 0; j < typeLength; j++) {
                    type = types[j].type;
                    rowIDs[i].push(type.content);//二维数组放 

                    dataBlob[SDate.id + ':' + type.content] = type;
                }
            }


            this.setState({
                dataSource : this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs),
            });


    }
}
;
var styles = StyleSheet.create({

    container: {
        flex: 1
    },
    header: {
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3F51B5',
        flexDirection: 'column',
        paddingTop: 5
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white',
    },
    text: {
        color: 'white',
        paddingHorizontal: 8,
        fontSize: 16
    },
    rowStyle: {
        paddingVertical: 20,
        paddingLeft: 16,
        borderTopColor: 'white',
        borderLeftColor: 'white',
        borderRightColor: 'white',
        borderBottomColor: '#E0E0E0',
        borderWidth: 1
    },
    rowText: {
        color: '#212121',
        fontSize: 16
    },
    subText: {
        fontSize: 14,
        color: '#757575'
    },
    section: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 6,
        backgroundColor: '#2196F3'
    }

});

export default MyhistoryView;