import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Image,
    Linking,
    TouchableOpacity,
    Share
} from 'react-native';
import { Global, executeSql } from '../constants';
import { useFocusEffect } from '@react-navigation/native';



export default function Card({ navigation, hotel , name, address , id , latitude, longitude,HandleDelete}) {
    console.log('id from fav', id)
    const [fav, setFav] = useState(false)
    const openGoogleMaps = () => {
        const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
        Linking.openURL(url);
    }

    useFocusEffect(
        React.useCallback(() => {
            const selectQuery = 'SELECT hotelID FROM fav';
            executeSql(selectQuery).then((result) => {
              const hotelUID = result._array.map((row) => row.hotelID);
              const isFav = hotelUID.includes(id);
             
              setFav(isFav);
            }).catch((err) => {
              console.log('err', err);
            });
        }, [])
      );
      const AddtoFav = () => {
        HandleDelete()
        console.log('fac run')
        if (fav === true) {
          console.log('del run')
          const DeleteQuery = 'DELETE FROM fav WHERE hotelID = ?';
          executeSql(DeleteQuery, [id]).then(() => {
            console.log('Deleted')
            setFav(false)
          }).catch((error) => {
            console.log('err', error)
          })
        } else {
          console.log('else run')
          const user = { name: name, address: address, hotelID: id, latitude: latitude, longitude: longitude };
          const insertQuery = 'INSERT INTO fav (name, address, hotelID, latitude, longitude) VALUES (?, ?, ?, ?, ?)';
          executeSql(insertQuery, [user.name, user.address, user.hotelID, user.latitude, user.longitude]).then(result => {
            console.log('Data inserted successfully', user);
            setFav(true)
          })
            .catch(error => {
              console.log('Error while inserting data:', error);
            });
      
        }
      };
    const onShare = async () => {
        try {
            const result = await Share.share({
                message: `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`
            });
            if (result.action === Share.sharedAction) {
                console.log("Shared Successfully!");
            } else if (result.action === Share.dismissedAction) {
                console.log("Share cancelled");
            }
        } catch (error) {
            console.log(error.message);
        }
    }
    const imageList = [
        require('../../assets/1.jpeg'),
        require('../../assets/2.jpeg'),
        require('../../assets/3.jpeg'),
        require('../../assets/4.jpeg'),
        require('../../assets/5.jpeg'),
        require('../../assets/6.jpeg'),
        require('../../assets/7.jpeg'),
        require('../../assets/8.jpeg'),
        require('../../assets/9.jpeg'),
       
        // add more images as needed
      ];
      const randomIndex = Math.floor(Math.random() * imageList.length);

    return (
        <TouchableHighlight underlayColor={'transparent'} onPress={()=> navigation.navigate('Description', {hotelName : name, latitude : latitude, longitude : longitude,  image : imageList[randomIndex]})}>
            <View style={styles.container}>
                <View style={{ height: 130, alignItems: 'center' }}>
                    <Image
                        resizeMethod={'auto'}
                        resizeMode={'cover'}
                        style={styles.imageStyle}
                        source={imageList[randomIndex]}
                    />

                </View>
                <View style={{ padding: 5, flexGrow: 1 }}>
                    <Text
                        style={{
                            fontSize: 19,
                            fontWeight: '700',
                            maxWidth: '75%',
                            paddingHorizontal: 2,
                            color: Global.main,
                        }}
                    >
                        {name}
                    </Text>
                   
                    <View style={styles.priceContainer}>

<View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <TouchableOpacity onPress={onShare}>
        <Image
            resizeMethod={'auto'}
            resizeMode={'cover'}
            style={{ width: 20, height: 20, marginRight: 10 }}
            source={require('../../assets/share.png')}
        />
    </TouchableOpacity>
    <TouchableOpacity onPress={AddtoFav}>
        <Image
            resizeMethod={'auto'}
            resizeMode={'cover'}
            style={{ width: 20, height: 20, tintColor: fav ? 'red' : 'grey'  }}
            source={require('../../assets/heart.png')}
        />
    </TouchableOpacity>
</View>
</View>

                   

                </View>
            </View>
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '95%',
        maxWidth: 355,
        alignSelf: 'center',
        marginBottom: 25,
        borderRadius: 5,
        borderColor: '#ddd',
        borderWidth: 1,
        elevation: 5,
        backgroundColor: 'white'
    },
    imageStyle: {
        width: '100%',
        height: 130,
        backgroundColor: '#EEE',
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5
    },
    servicesContainer: {
        flexGrow: 1,
        maxHeight: 80,
        marginTop: 12,
        marginRight: 90,
        padding: 3,
        textAlign: 'justify',
        lineHeight: 25,
    },
    priceContainer: {
        position: 'absolute',
        bottom: 8,
        right: 10,
        alignItems: 'flex-end',
    },
    priceHeader: {
        color: '#999',
        fontSize: 11,
        alignSelf: 'flex-end',
        textAlign: 'right',
        width: 80,
        marginBottom: 10
    },
    price: {
        fontSize: 21,
        color: '#2a7800',
        fontWeight: '700'
    }
});
