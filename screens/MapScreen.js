import React, { Component } from 'react';
import { Slider, View, Text, ActivityIndicator } from 'react-native';
import { Constants, MapView, Location, Permissions } from 'expo';
import { connect } from 'react-redux';
import { Button, Icon } from 'react-native-elements';
import geolib from 'geolib';
import pin from '../assets/app.png';
import restaurants from '../api/restaurants.json';


import * as actions from '../actions';

class MapScreen extends Component {
    static navigationOptions = {
      title: 'Map',
      tabBarIcon: ({ tintColor }) => {
          return <Icon name='my-location' size={30} color={tintColor} />;
        }
    }

    state = {
        radius: 30000,
        mapLoaded: false,
        region: {
          longitude: 24.945831,
          latitude: 60.192059,
          longitudeDelta: 0.04,
          latitudeDelta: 0.09
          },
        locationResult: null,
        location: {coords: { latitude: 24.945831, longitude: 24.945831}},
        markers: restaurants,
      }

    componentDidMount() {
        this.setState({ mapLoaded: true });
        this.getLocationAsync();
      }

    getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
          this.setState({
            locationResult: 'Permission to access location was denied',
            location,
          });
        }
    
        let location = await Location.getCurrentPositionAsync({});
        
        this.setState({ region: { longitude: location.coords.longitude, 
                                  latitude: location.coords.latitude,
                                  longitudeDelta: 0.04,
                                  latitudeDelta: 0.09 }, 
                        locationResult: JSON.stringify(location), 
                        location, 
                      });
      };

    onRegionChangeComplete = (region) => {
        this.setState({ region });
      }

      onButtonPress = () => {
        const filteredRestaurants = restaurants.filter(this.filterByRadius);
        this.props.fetchNearbyRestaurants(filteredRestaurants, () => {
          this.props.navigation.navigate('restaurant');
        });
      }
      
    filterByRadius = (el) => {
      return geolib.isPointInCircle( this.state.location.coords, el.location, this.state.radius)
    }
    
    render() {
      
      if (!this.state.mapLoaded) {
        return (
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <ActivityIndicator size="large" />
          </View>
        );
      }
      
      return (
        <View style={{ flex: 1 }}>
          
          <MapView
            region= {this.state.region}
            style={{ flex: 1 }}
            onRegionChangeComplete={this.onRegionChangeComplete}
          >
              {this.state.markers.map((marker, index) => {
                if (geolib.isPointInCircle( this.state.location.coords, 
                  marker.location, 
                  this.state.radius)){
                  return <MapView.Marker
                    key={index}
                    coordinate={marker.location}
                    title={marker.name}
                    description={marker.description}
                  />}}
                )}
          </MapView>
              
          <View style={styles.buttonContainer}>
            <View style={styles.container}>
                    <Slider
                      value={this.state.radius}
                      onValueChange={radius => this.setState({ radius })}
                      maximumValue={50000}
                    />
                    <Text>
                      radius(m): {this.state.radius}
                    </Text>
            </View>
            <Button
              large
              title="Search within radius"
              backgroundColor="#009688"
              icon={{ name: 'search' }}
              onPress={this.onButtonPress}
            />
          </View>
        </View>
      );
     }
  }


const styles = {
    container: {
      flex: 1,
      marginLeft: 10,
      marginRight: 10,
      alignItems: "stretch",
      justifyContent: "center"
    },
    buttonContainer: {
      position: 'absolute',
      bottom: 20,
      left: 0,
      right: 0
    }
  }

export default connect(null, actions)(MapScreen);
