import React, { Component } from 'react';
import { View, Text, Platform, ScrollView, Linking } from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { MapView } from 'expo';
import SettingsScreen from './SettingsScreen';


class ReviewScreen extends Component {
  static navigationOptions = { 
    title: 'Favorites',
    tabBarIcon: ({ tintColor }) => {
        return <Icon name="favorite" size={30} color={tintColor} />;
    },
    headerRight: <SettingsScreen />
      };
    

  renderLikedRestaurants() {
    return this.props.likedRestaurants.map(restaurant => {
      const { phone_number, location, name, id, description } = restaurant;
      const initialRegion = {
        longitude: location.longitude,
        latitude: location.latitude,
        latitudeDelta: 0.045,
        longitudeDelta: 0.02
      };

      return (
        <Card title={name} key={id}>
          <View style={{ height: 200 }}>
            <MapView
              style={{ flex: 1 }}
              cacheEnabled={Platform.OS === 'android'}
              scrollEnabled={false}
              initialRegion={initialRegion}
            >
                  <MapView.Marker
                    key={id}
                    coordinate={location}
                    title={name}
                    description={description}
                  />
            </MapView>
            <View style={styles.detailWrapper}>
              <Text style={styles.italics}>{name}</Text>
              <Text style={styles.italics}>{phone_number}</Text>
            </View>
            <Button
              title="call now!"
              backgroundColor="#03A9F4"
              onPress={() => Linking.openURL('tel:'+phone_number)}
            />
          </View>
        </Card>
      );
    });
  }

  render() {
    return (
      <ScrollView>
        {this.renderLikedRestaurants()}
      </ScrollView>
    );
  }
}

const styles = {
  italics: {
    fontStyle: 'italic'
  },
  detailWrapper: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
}

function mapStateToProps(state) {
  return { likedRestaurants: state.favorites };
}

export default connect(mapStateToProps)(ReviewScreen);
