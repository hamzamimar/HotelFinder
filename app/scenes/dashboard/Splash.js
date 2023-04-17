import React from 'react';
import { useEffect } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions
} from 'react-native';

export default function Welcome({navigation}) {
useEffect(()=>{
    setTimeout(()=>{
  navigation.replace("Drawer")
    },2000)
})
    return (
        <View style={{ flexGrow: 1, height: '100%', backgroundColor:Global.main }}>
         
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: Dimensions.get('window').height/3 }}>
                    <Image 
                        style={{
                            width: 55,
                            height: 55,
                           
                        }}
                        source={require('../../../assets/Images/logo-white.png')}
                    />
                    <View
                       
                    >
                        <Text style={ styles.title }>Hotels</Text>
                        <Text style={ styles.title }>Reservation</Text>
                    </View>
                </View>
                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0
    },
    container: {
        flex: 1,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        color: 'white',
        marginLeft: 10
    }
})