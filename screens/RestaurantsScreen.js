import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import { connect } from 'react-redux';
import { MapView } from 'expo';
import { Card, Button, Icon } from 'react-native-elements';
import Swipe from '../components/Swipe';
import * as actions from '../actions';

class RestaurantsScreen extends Component {
  static navigationOptions = {
    title: 'Restaurants',
      tabBarIcon: ({ tintColor }) => {
        return <Icon name="description" size={30} color={tintColor} />;
      }
  }

  renderCard(restaurant) {
    const initialRegion = {
      longitude: restaurant.location.longitude,
      latitude: restaurant.location.latitude,
      latitudeDelta: 0.045,
      longitudeDelta: 0.02
    };

    return (
      <Card title={restaurant.name}>
        <View style={{ height: 300 }}>
          <MapView
            scrollEnabled={false}
            style={{ flex: 1 }}
            cacheEnabled={Platform.OS === 'android' ? true : false}
            initialRegion={initialRegion}
          >
            <MapView.Marker
                    key={restaurant.name}
                    coordinate={restaurant.location}
                    title={restaurant.name}
                    description={restaurant.description}
                  />
          </MapView>
        </View>
        <View style={styles.detailWrapper}>
          <Text>{restaurant.name}</Text>
          <Text>{restaurant.phone_number}</Text>
        </View>
        <Text>
          {restaurant.description}
        </Text>
      </Card>
    );
  }

  renderNoMoreCards = () => {
    return (
      <Card title="No More restaurants">
        <Button
          title="Back To Map"
          large
          icon={{ name: 'my-location' }}
          backgroundColor="#03A9F4"
          onPress={() => this.props.navigation.navigate('map')}
        />
      </Card>
    );
  }

  render() {
    return (
      <View style={{ marginTop: 10 }}>
        <Swipe
          data={this.props.restaurants}
          renderCard={this.renderCard}
          renderNoMoreCards={this.renderNoMoreCards}
          onSwipeRight={restaurant => this.props.likeRestaurant(restaurant)}
          keyProp="id"
        />
      </View>
    );
  }
}

const styles = {
  detailWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10
  }
};

function mapStateToProps(state ) {
    //console.log(state.restaurants);
    
  return { restaurants: state.restaurants };
}

export default connect(mapStateToProps, actions)(RestaurantsScreen);
