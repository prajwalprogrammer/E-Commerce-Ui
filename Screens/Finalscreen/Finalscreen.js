import React,{useState,useEffect} from 'react'
import {View,Text,StyleSheet,TouchableOpacity,Image,ScrollView} from 'react-native'
import { Col, Row, Grid } from "react-native-easy-grid";


const FinalScreen = ({route}) => {
    const [isdelivery]=useState(route.params.isdelivery)
    useEffect(() => {
       console.log(isdelivery)
      
    }, [])
    return (
        <ScrollView style={styles.container}>
             <Image 
            source={   require('../../Assets/Banner.png')}                                               
            style={{ width: 350,  height: 370,marginTop:50     ,marginLeft:20       
            }}
          /> 
          
          {/* {isdelivery ?<> */}
           <View style={{position: 'absolute', top: 170, left: 30,  justifyContent: 'center', alignItems: 'center'}}>
       <Text>Dear Customer</Text>
       </View>
       <View style={{position: 'absolute', top: 200, left: 30,  justifyContent: 'center', alignItems: 'center'}}>
       <Text>Order Confirmation #1234</Text>
        </View>
        <View style={{position: 'absolute', top: 230, left: 30,  justifyContent: 'center', alignItems: 'center',width:180}}>
       <Text>Thank you for your business. 
           {isdelivery ? "Your order will be delivered to (%account.address%)." :"Your order will be ready for pick by ({%date.current()% + 36000})" }  </Text>
        </View>
        <View style={{position: 'absolute', top: 320, left: 30,  justifyContent: 'center', alignItems: 'center',width:180}}>
       <Text>Please reach out to us if you have any questions or concerns about this order. </Text>
        </View>        
            <Image 
            source={   require('../../Assets/Tick.png')}                                               
            style={{ width: 180,  height:180   ,marginLeft:120         
            }}
          /> 
          {/* </>:<></>} */}
         
        </ScrollView>
    )
}

const styles = StyleSheet.create({

    container:{
        backgroundColor:'#414141'
          },

})

export default FinalScreen