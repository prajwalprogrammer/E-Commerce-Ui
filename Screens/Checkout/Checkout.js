import React,{useState} from 'react'
import {View,Text,StyleSheet, TouchableOpacity,Image,Button,ScrollView} from 'react-native'
import { Col, Row, Grid } from "react-native-easy-grid";
import DateTimePicker from '@react-native-community/datetimepicker';
import CheckBox from '@react-native-community/checkbox';

const Checkout = ({navigation}) => {
       const [date, setDate] = useState(new Date(1598051730000));
       const [mode, setMode] = useState('date');
       const [show, setShow] = useState(false);
       const [toggleCheckBox1, setToggleCheckBox1] = useState(false)
       const [toggleCheckBox2, setToggleCheckBox2] = useState(true) 

       const onChange = (event, selectedDate) => {
         const currentDate = selectedDate || date;
         setShow(Platform.OS === 'ios');
         setDate(currentDate);
       };
     
       const showMode = (currentMode) => {
         setShow(true);
         setMode(currentMode);
       };
     
       const showDatepicker = () => {
         showMode('date');
         
       };
     
       const showTimepicker = () => {
         showMode('time');
       };
    return (
        <ScrollView style={styles.containergrid}>
                  <View style={styles.innercontainer}>
             <Grid>
                 <Row style={{marginTop:10,marginBottom:10}}><Text>I'd Like :</Text></Row>
                 
                 <Row style={{marginTop:10,marginBottom:15}}>
                     <Col>
                    <Row style={{backgroundColor:"white",borderRadius:10,width:"80%",padding:2}}>
                      <Col size={10}>
                     <CheckBox
    disabled={false}
    value={toggleCheckBox1}
    onValueChange={(newValue) => {setToggleCheckBox1(newValue); setToggleCheckBox2(false)}}
  /></Col>
  <Col  size={30}>
  <Text style={{fontSize:20}}>Pick up</Text>
  </Col>
                </Row>    
                     </Col>
                     <Row style={{backgroundColor:"white",borderRadius:10,width:"80%",padding:2}}>
                     <Col size={10}>
                     <CheckBox
    disabled={false}
    value={toggleCheckBox2}
    onValueChange={(newValue) => {setToggleCheckBox2(newValue); setToggleCheckBox1(false)}}
  />
  </Col>
  <Col  size={30}>
  <Text style={{fontSize:20}}>Delivery</Text>
  </Col>
                </Row>   
                       </Row>
                {toggleCheckBox2 ? (      
                 <Row>
                     <View style={{backgroundColor:"white"}}>
                       <TouchableOpacity style={{padding:10}}>
                         <Text style={{fontSize:16}}>
                         Your Order Will be deliverd to: 
                         </Text>
                         </TouchableOpacity>
                         <View style={{backgroundColor:"#EFEFEF",padding:10,margin:10,marginBottom:30}}>
                        <Text>
                        3131 South West 89 Street, okhlahoma 73159
                        </Text>
                         </View>
                         
                         <View style={{backgroundColor:"#EFEFEF",padding:10,margin:10,marginBottom:30}}>
                         <Text>
                         If you have a change in Address, Please update it from your App profile from Homepage.                         </Text>
                         </View>
                     </View>
                 </Row>):
                 <View>
                           <Text>{"\n"}</Text>

                    <View>
        <TouchableOpacity style={{backgroundColor:"#759CFF",width:110,marginLeft:100,padding:10,borderRadius:10,marginBottom:10}}onPress={showDatepicker}>
        <Text>
        Choose Date
        </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity style={{backgroundColor:"#759CFF",width:110,marginLeft:100,padding:10,borderRadius:10}} onPress={showTimepicker}>
        <Text>
        Choose Time
        </Text>
        </TouchableOpacity>
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )} 
                 </View>}
             </Grid>

             <Text>{"\n"}</Text>

      </View>
      <TouchableOpacity  
      onPress={() => navigation.navigate('Finalscreen',{isdelivery: toggleCheckBox2 ? true : false })} 
      style={{alignItems:'center',
      backgroundColor:'#35B551',width:100,margin:10,marginLeft:140,padding:10,borderRadius:10}}>
        <Text style={{fontSize:16}}>Confirm</Text>
      </TouchableOpacity>
      
        </ScrollView>
    )
}

const styles = StyleSheet.create({

    containergrid:{
        backgroundColor:'#414141'
          },
          innercontainer:{
              margin:30,
              backgroundColor:"#DADADA",
              padding:10
          }

})

export default Checkout