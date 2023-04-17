import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native';
import { executeSql } from '../../constants';
import { useFocusEffect } from '@react-navigation/native';
import Card from '../../components/FavCard';
import { Icon } from 'react-native-elements';

const Favorite = (props) => {


  const [favorites, setFavorites] = useState([]);
  const [del, setDel] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      getFavorites();
    }, [del])
  );

  const HandleDelete = () => {
    setDel(!del)
  }

  const getFavorites = () => {
    const selectQuery = 'SELECT * FROM fav';
    executeSql(selectQuery)
      .then(result => {
        const favoriteHotels = result._array;
        setFavorites(favoriteHotels);
      })
      .catch(error => {
        console.log('Error while retrieving data:', error);
      });
  };

  const renderFavorites = () => {
    if (favorites.length > 0) {
      return (
        <FlatList
          data={favorites}
          renderItem={({ item, index }) => {
            return (
              <Card
              navigation={props.navigation}
                name={item.name}
                address={item.address}
                id={item.hotelID}
                latitude={item.latitude}
                longitude={item.longitude}
                index={1}
                style={{ zIndex: 0 }}
                HandleDelete={HandleDelete}
              />
            );
          }}
          keyExtractor={item => item.hotelID}
        />
      );
    } else {
      return (
        <View style={{ alignItems: 'center', marginTop: 250 }}>
          <Icon name="heart-alt" type="fontisto" size={80} color="#FF1493" />
          <Text style={{ marginTop: 10, fontSize: 20 }}>No favorites yet</Text>
        </View>
      );
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView style={{ backgroundColor: "#fff" }}>
        {renderFavorites()}
      </ScrollView>
    </View>
  );
};

export default Favorite;
