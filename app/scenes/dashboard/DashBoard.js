
import React, { useEffect, useState, useMemo } from 'react';
import { ActivityIndicator, ScrollView, View, Text, TouchableHighlight, StyleSheet, FlatList, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import { ClearData, addCityHotel, addHotels } from "../../actions";
import Card from '../../components/Card';
import DropDownPicker from 'react-native-dropdown-picker'
import { Global } from '../../constants';
import { getHotels, getTestHotels,HotelsByCity } from '../../api';
export default function DashBoard(props) {
    const dispatch = useDispatch();
    const { navigate } = props.navigation;

    //1 - DECLARE VARIABLES
    const [error, setError] = useState(null);
    const [isFetching, setIsFetching] = useState(true);
    const [selectedValue, setSelectedValue] = useState('BHX');
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Birmingham', value: 'BHX' },
        { label: 'London', value: 'LCY' },
        { label: 'Manchester', value: 'MAN' },
        { label: 'Edinburgh', value: 'EDI' },
        { label: 'Nottingham', value: 'EMA' },
       
    ]);
    //Access Redux Store State
    const hotels = useSelector(state => state.hotelReducer.hotels);
    const hotelsMemo = useMemo(() => hotels, [hotels]);
    //==================================================================================================

    //2 - MAIN CODE BEGINS HERE

    useEffect(() => {
        getData();
    }, []);

 

    async function getData() {
        setIsFetching(true);

        try {
           getHotels().then((data)=>{
            // console.log('dd', data.data)
         dispatch(addHotels(data.data))

           }).catch((err)=>{
            console.log('dd', err)
           })
            // dispatch(addHotels(data.data))
        } catch (error) {
            setError(error);
        } finally {
            setIsFetching(false)
        }
    }
    const SearchByCity = async(item)=>{
        dispatch(ClearData());

      setIsFetching(true);

      try {
        HotelsByCity(item.value).then((data)=>{
         console.log(`data for ${item.value}`, data.data)
      dispatch(addCityHotel(data.data))

        }).catch((err)=>{
         console.log('dd', err)
        })
       
     } catch (error) {
         setError(error);
     } finally {
         setIsFetching(false)
     }
    }
    return (
        <ScrollView style={{ backgroundColor: "#fff" }}>
           <View style={{zIndex: 99999}}>
                <View style={{
                    width: '100%',
                    alignSelf: 'center',
                    alignItems: 'center',
                    backgroundColor: Global.main,
                    padding: 30,
                    zIndex: 9999,
                }}>
                    <DropDownPicker
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                        zIndex={99999}
                        style={{
                            zIndex: 9999,
                          }}
                          containerStyle={{
                            height: 40,
                            paddingHorizontal: 0,
                            width: 320,
                            zIndex: 99999,
                          }}
                        onSelectItem={SearchByCity}
                    />
                  
                  
                    <View style={{marginTop: 20, width: '100%', maxWidth: 450, backgroundColor: 'transparent'}}>
                                <View style={styles.dateANDroomcontainer} >
                                    <TouchableHighlight
                                        underlayColor={'transparent'}
                                        style={{ width: '50%'}}
                                        
                                    >
                                        <View style={{ borderRightColor: 'white', borderRightWidth: 1, paddingHorizontal: 20 }}>
                                            <Text style={styles.tags} >Find Hotels In Your City</Text>
                                          
                                        </View>
                                    </TouchableHighlight> 
                                    <TouchableHighlight
                                        underlayColor={'transparent'}
                                        style={{width: '50%'}}
                                       
                                    >
                                        <View style={{ paddingHorizontal: 20 }}>
                                            <Text style={styles.tags}>Add to Favorite</Text>
                                            
                                        </View>
                                    </TouchableHighlight> 
                                </View>
                               
                            </View>
                </View>
            </View>
            <View style={{marginTop: 10, zIndex: 100}}>
            <FlatList
        data={hotelsMemo.slice(0, 30)}
        renderItem={({ item, index }) => <Card navigation={props.navigation} hotel={item} name={item.name} address={item.address?.countryCode} id={item.hotelId} latitude={item.geoCode.latitude} longitude={item.geoCode.longitude} index={1} />}
        keyExtractor={item => item.hotelId}
        style={{ zIndex: 2 }}
      />
</View>
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    inputcontainer: {
        borderColor: 'transparent',
        backgroundColor: 'white',
        padding: 10,
        height: 40,
        borderRadius: 30
    },
    input: {
        color: '#555',
        marginLeft: 2,
        fontSize: 14
    },
    buttonstyle: {
        width: '100%',
        height: 45,
        alignSelf: 'center',
        backgroundColor: 'transparent'
    },
    buttonscontainer: {
        position: 'relative',
        flexDirection: 'row',
        width: '100%'
    },
    dateANDroomcontainer: {
        position: 'relative',
        flexDirection: 'row',
        width: '100%',
        paddingVertical: 8,
        borderColor: 'transparent',
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        borderTopColor: 'white',
        borderTopWidth: 1
    },
    buttontitlestyle: {
        color: 'red',
        marginLeft: 6,
        fontSize: 14
    },
    tags: {
        color: '#AAA',
        fontSize: 12
    },
    choice: {
        color: '#EEE',
        fontSize: 14
    }
})

DashBoard.navigationOptions = ({ navigation }) => {
    return { title: `MeNews` }
};