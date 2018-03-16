import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { clearLikedRestaurants } from '../actions';

class SettingsScreen extends Component {
  static navigationOptions = {
    header: {
      style: {
        marginTop: Platform.OS === 'android' ? 24 : 0
      }
    }
  }

  render() {
    return (
      <View>
        <Button
          title="clear"
          large
          icon={{ name: 'delete-forever' }}
          backgroundColor="#F44336"
          onPress={this.props.clearLikedRestaurants}
        />
      </View>
    );
  }
}

export default connect(null, { clearLikedRestaurants })(SettingsScreen);
