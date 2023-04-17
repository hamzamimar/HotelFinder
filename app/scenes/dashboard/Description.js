import React from 'react';
import { View, ScrollView, TouchableOpacity ,Linking} from 'react-native';
import { Text, Image, Icon } from 'react-native-elements';

const HotelDescriptionScreen = ({route}) => {
    const { hotelName, latitude, longitude, image } = route.params;
    console.log('routes',hotelName, latitude, longitude, image )
    const openGoogleMaps = () => {
        const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
        Linking.openURL(url);
    }
    return (
        <ScrollView style={{ flex: 1 }}>
            <Image
                source={image}
                style={{ width: '100%', height: 250 }}
            />
            <View style={{ padding: 20 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:'space-between' }}>
                    <View>
                        <Text h4 style={{color:'black'}}>{hotelName}</Text>
                    </View>
                    <TouchableOpacity onPress={openGoogleMaps}>
                        <Icon name="map-marker" type="font-awesome" color="red" />
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
                        <Icon name="star" type="font-awesome" color="#FFD700" />
                        <Text style={{ marginLeft: 5 }}>4.5</Text>
                    </View>

                </View>
                <Text style={{ marginBottom: 20 }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed iaculis nisi in elit consequat tincidunt.
                    Phasellus eget erat vel purus blandit rhoncus sed quis nunc.
                </Text>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                    <Icon name="phone" type="font-awesome" color="#666" />
                    <Text style={{ marginLeft: 5 }}>(123) 456-7890</Text>
                </View>
               
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                    <Icon name="bed" type="font-awesome" color="#666" />
                    <Text style={{ marginLeft: 5 }}>2 guests, 1 room</Text>
                </View>
                <Text h5 style={{ marginBottom: 10 }}>Amenities</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                    <Icon name="wifi" type="font-awesome" color="#666" />
                    <Text style={{ marginLeft: 5 }}>Free Wi-Fi</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                    <Icon name="coffee" type="font-awesome" color="#666" />
                    <Text style={{ marginLeft: 5 }}>Restaurant</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                    <Icon name="swimming-pool" type="font-awesome-5" color="#666" />
                    <Text style={{ marginLeft: 5 }}>Swimming pool</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                    <Icon name="car" type="font-awesome" color="#666" />
                    <Text style={{ marginLeft: 5 }}>Free parking</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                    <Icon name="concierge-bell" type="font-awesome-5" color="#666" />
                    <Text style={{ marginLeft: 5 }}>Room service</Text>
                </View>
            </View>
        </ScrollView>
    );
};

export default HotelDescriptionScreen;
