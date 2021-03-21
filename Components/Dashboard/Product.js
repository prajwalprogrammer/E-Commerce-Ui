import React,{useState,useEffect} from 'react'
import {View,Text,StyleSheet,Image,TouchableOpacity,ScrollView} from 'react-native'
import { Col, Row, Grid } from "react-native-easy-grid";
import
 MaterialIcons
from 'react-native-vector-icons/MaterialIcons';
import NumericInput from 'react-native-numeric-input'


const Product = ({navigation,route}) => {
    
  const [value,setvalue]=useState(1)
    useEffect(()=>{console.log(route.params.description)},[])
    return (
        <ScrollView style={{backgroundColor:'#6a5acd'}}>
          <View style={{margin:20}}>
            <Image 
                source={{uri:route.params.uri1}}                                               
                style={{
                  width: 350,
                  height: 300,    
                  borderRadius:10          
                }}
              />   
              </View>    
              <View style={{margin:20}}>
            <Text style={{fontSize:24,color:"white",color:"white",fontWeight:'bold'  }} > {route.params.name}</Text>
            <Text style={{fontSize:20,color:"white"}}> $ {route.params.price}</Text>
            <Text style={styles.texts}>
                  <MaterialIcons name="star-rate" color="yellow" size={25}/>
                  <MaterialIcons name="star-rate" color="yellow" size={25}/>
                  <MaterialIcons name="star-rate" color="yellow" size={25}/>
                  <MaterialIcons name="star-rate" color="yellow" size={25}/>
                  </Text>
                  <Text>{"\n"}</Text>
            <Text  style={{fontSize:25,color:"white",fontWeight:'bold'}}> Know More About :</Text>
            <View style={{marginLeft:10,marginTop:10}}>
            <Text style={{color:"white",fontSize:15}}>  {route.params.know_more}</Text>
            <Text style={{color:"white",fontSize:15}}>  {route.params.description}</Text>
            </View>
            </View>
            <Grid >
        <Col>
      <TouchableOpacity style={styles.tab1} onPress={()=>{}}><Text style={styles.texts}>Add to Cart</Text></TouchableOpacity>
      </Col>
      <Col>
      <View style={styles.tab2}>
      <NumericInput textColor ="white" rounded type='up-down' minValue={1}  maxValue={5} onChange={value => console.log(value)} />
      </View>
      </Col>
      </Grid>
<Text>{"\n"}</Text>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:'#414141'
      },
  tab1:{
    zIndex: 1,       
    marginTop:20,
    marginLeft:"15%",
    marginRight:"10%",
    width:"100%",
    alignItems: 'center',
    borderRadius:5,
    padding:10,
    backgroundColor:"#35B551",  
    height:50,
    borderWidth:1,
    borderColor:"white"
  },
  tab2:{
    zIndex: 1,       
    marginTop:20,
    marginLeft:"20%",
    marginRight:"10%",
    width:"60%",
    alignItems: 'center',
    borderRadius:5,
       
    height:47,
    color:"white",
    backgroundColor:"#85C5EA",
   
  },
  texts:{
    fontSize:17,
    fontWeight:"bold",
    color:"white"  
  },

})

export default Product