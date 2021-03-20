import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image,TouchableOpacity } from "react-native"
import { Col, Row, Grid } from "react-native-easy-grid";

export const SLIDER_WIDTH = Dimensions.get('window').width 
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8)

export const CarouselCardItem = ({ item, index }) => {
  return (
    <View style={styles.container} key={index}>
      <Image
        source={{ uri: item.imageuri }}
        style={styles.image}
      />
      <Text style={styles.header}> $ {item.price}</Text>
      <Text style={styles.body}>{item.description}</Text>
      <Grid>
        <Col>
      <TouchableOpacity style={styles.tab} onPress={()=>{}}><Text style={styles.texts}>Add to Cart</Text></TouchableOpacity>
      </Col>
      <Col>
      <TouchableOpacity style={styles.tab} onPress={()=>{}}><Text style={styles.texts}>Quantity 1</Text></TouchableOpacity>
      </Col>
      </Grid>
    </View>
  )
}
const styles = StyleSheet.create({
  tab:{
    zIndex: 1,       
    marginTop:20,
    marginLeft:"5%",
    marginRight:"10%",
    width:"85%",
    alignItems: 'center',
    borderRadius:100,
    padding:2,
    backgroundColor:"#4166f5",        
  },
  texts:{
    fontSize:17,
    fontWeight:"bold",
    color:"white"  
  },
  container: {
      marginBottom:15,
      marginTop:20,
    backgroundColor: 'white',
    borderRadius: 8,
    width: ITEM_WIDTH,
    paddingBottom: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    height:300
  },
  image: {
    width: ITEM_WIDTH,
    height: 100,
  },
  header: {
    color: "#222",
    fontSize: 28,
    fontWeight: "bold",
    paddingLeft: 20,
    paddingTop: 10
  },
  body: {
    color: "#222",
    fontSize: 18,
    paddingLeft: 20,    
    paddingRight: 20
  }
})

export default CarouselCardItem