import React from 'react'
import {View,Text,StyleSheet} from 'react-native'


const Contact = ({navigation,route}) => {
    return (
        <View>
            <Text>{route.params.name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({

    

})

export default Product