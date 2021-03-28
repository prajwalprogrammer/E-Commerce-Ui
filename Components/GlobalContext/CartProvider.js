import React, { Component, createContext, useState } from "react";
import { Text, View } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

export const CartContext = createContext();
const SaveData=async()=>{
  var SaveData1=await AsyncStorage.getItem("MyCart")
  
  return SaveData1
}
const CartProvider = ({ children }) => {
  var MyCart1 = [];
  const [user, setUser] = useState(()=>SaveData());
 
  return (
    <CartContext.Provider
      value={{
        user,
        setUser,
        AddToCart: async (ProductId) => {
          // alert(ProductId);

          try {
            var MyCart = await AsyncStorage.getItem("MyCart");
            //;
            //alert(JSON.parse(MyCart))
            alert(MyCart)
            if (MyCart == null) {
              var MyCart1 = JSON.parse(MyCart);
            }
            MyCart1.push(ProductId);
            setUser([...user, ProductId]);
          } catch (error) {
            console.log(error);
          }

          try {
            await AsyncStorage.setItem("MyCart", JSON.stringify(MyCart1));
            //alert(JSON.parse(MyCart));
          } catch (error) {
            console.log(error);
          }

          // try {
          //   const myArray1 = await AsyncStorage.getItem("MyCart");
          //   if (myArray1 === null) {
          //     // We dont have data!!
          //     myArray.push(ProductId);
          //   } else {
          //     myArray.push(JSON.parse(myArray1));
          //     myArray.push(ProductId);
          //   }
          // } catch (error) {
          //   // Error retrieving data
          // }

          // try {
          //   await AsyncStorage.setItem("MyCart", JSON.stringify(myArray));
          // } catch (error) {
          //   // Error saving data
          // }

          // try {
          //   const myArray2 = await AsyncStorage.getItem("MyCart");
          //   if (myArray !== null) {
          //     // We have data!!
          //     alert("hii" + JSON.parse(myArray2));

          //   }
          // } catch (error) {
          //   // Error retrieving data
          // }
          // await AsyncStorage.clear()
        },
        DeleteFromCart: async (ProductId) => {
          //alert(ProductId)
          try {
            const MyArray = await AsyncStorage.getItem("MyCart");
            function removeDuplicates(array) {
              return array.filter((a, b) => array.indexOf(a) === b);
            }
            var RemovedIDs = removeDuplicates(JSON.parse(MyArray));
            const index = RemovedIDs.indexOf(ProductId);
            if (index > -1) {
              RemovedIDs.splice(index, 1);
              setUser(JSON.stringify(RemovedIDs));

            }
            
          } catch (error) {
            console.log(error);
          }
          try {
            await AsyncStorage.setItem("MyCart", JSON.stringify(RemovedIDs));

          } catch (error) {
            console.log(error);
          }
        },
      CheckTheProduct:async(ProductId)=>{
        //alert(ProductId)
        try {
          const MyArray3 = await AsyncStorage.getItem("MyCart");
          function removeDuplicates(array) {
            return array.filter((a, b) => array.indexOf(a) === b);
          }
            var RemovedIDs = removeDuplicates(JSON.parse(MyArray3));
           var N= RemovedIDs.includes(ProductId)
          //alert(N)
        } catch (error) {
          console.log(error)
        }
        return N;

      }
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
