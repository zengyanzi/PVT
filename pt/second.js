
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  BackAndroid,
  TouchableHighlight,
  ScrollView,
  ListView,
} from 'react-native';

var SecondView = React.createClass({

	render: function () {
		return (
			<View style={styles.style_0}>
				<Text style={styles.view}>{this.props.rowID}</Text>
			</View>
          );
	},
});

var styles = StyleSheet.create({
	style_0:{
		flex:1,
		borderWidth:1,
		borderColor:'red',
		justifyContent:'center',
		alignItems:'center',
	},
	view:{
		borderWidth:3,
		height:50,
		width:150,
		borderColor:'blue',
		fontSize:18,
	},
});
export default SecondView;
