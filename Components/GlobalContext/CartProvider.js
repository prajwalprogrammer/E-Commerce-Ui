import React, { Component, createContext, useState } from "react";
import { Text, View } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

export const CartContext = createContext();
const SaveData = async () => {
  var SaveData1 = await AsyncStorage.getItem("MyCart");

  return SaveData1;
};
const CartProvider = ({ children }) => {
  var MyCart1 = [];
  const [Q, setQ] = useState(null);
  const [user, setUser] = useState(() => SaveData());
  const [Profile, setProfile] = useState();
  const [Prajwal, setPrajwal] = useState(null);
  return (
    <CartContext.Provider
      value={{
        Profile,
        setProfile,
        user,
        setUser,
        Prajwal,
        setPrajwal,
        setQ,
        Q,
        AddToCart: async (ProductId, Quantity = 1) => {
          // alert(Quantity);
          var array = [await AsyncStorage.getItem("countries")];

          var Qua = [await AsyncStorage.getItem("Quan")];

          try {
            //var MyCart = await AsyncStorage.getItem("MyCart");
            //;
            //alert(JSON.parse(MyCart))
            //  alert(MyCart)
            // await AsyncStorage.removeItem("countries");
            // await AsyncStorage.removeItem("Quan");

            if (Prajwal === null) {
            var countries = await AsyncStorage.getItem("countries");

            if (countries === null) {
              await AsyncStorage.setItem("countries", ProductId);
              await AsyncStorage.setItem("Quan", Quantity.toString());
            } else {
              await array.push(ProductId);
              await Qua.push(Quantity);
              await AsyncStorage.setItem("countries", array.toString());
              await AsyncStorage.setItem("Quan", Qua.toString());
            }
            await setQ(await AsyncStorage.getItem("Quan"));
            await setPrajwal(await AsyncStorage.getItem("countries"));

              // await AsyncStorage.setItem("Don", Prajwal);
            } else {
            var countries = await AsyncStorage.getItem("countries");
            if (countries === null) {
              await AsyncStorage.setItem("countries", ProductId);
              await AsyncStorage.setItem("Quan", Quantity.toString());
            } else {
              await array.push(ProductId);
              await Qua.push(Quantity);
              console.warn(Qua);

              await AsyncStorage.setItem("countries", array.toString());
              await AsyncStorage.setItem("Quan", Qua.toString());
            }
              // var countries = AsyncStorage.getItem("countries");
              // AsyncStorage.setItem("countries", (countries += ProductId));
              await setQ(await AsyncStorage.getItem("Quan"));
              await setPrajwal(await AsyncStorage.getItem("countries"));

              //await AsyncStorage.setItem("Don", Prajwal);
            }
            //MyCart1.push(ProductId);
            //setUser([...user, ProductId]);
          } catch (error) {
            console.log(error);
          }
          try {
            await AsyncStorage.getItem("countries").then((Val) => {});
            await AsyncStorage.getItem("Quan").then((Val) => {});
          } catch (error) {
            console.log(error);
          }

          // try {
          //   await AsyncStorage.setItem("MyCart", JSON.stringify(MyCart1));
          //   //alert(JSON.parse(MyCart));
          // } catch (error) {
          //   console.log(error);
          // }

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
          const array123 = await AsyncStorage.getItem("countries");
          var A1 = array123.split(",");
          //alert(A1[0])
          const index = A1.indexOf(ProductId);
          try {
            await A1.splice(index, 1);
            await AsyncStorage.setItem("countries", A1.toString());
            // await setPrajwal(await AsyncStorage.getItem("countries"));
            await setPrajwal(A1.toString());
          } catch (error) {
            console.log(error);
          }
          // try {
          //   function removeDuplicates(array) {
          //     return array.filter((a, b) => array.indexOf(a) === b);
          //   }
          //   var RemovedIDs = removeDuplicates(JSON.parse(MyArray));
          //   const index = RemovedIDs.indexOf(ProductId);
          //   if (index > -1) {
          //     RemovedIDs.splice(index, 1);
          //     setUser(JSON.stringify(RemovedIDs));
          //   }
          // } catch (error) {
          //   console.log(error);
          // }
          // try {
          //   await AsyncStorage.setItem("MyCart", JSON.stringify(RemovedIDs));
          // } catch (error) {
          //   console.log(error);
          // }
        },
        CheckTheProduct: async (ProductId) => {
          //alert(ProductId)
          try {
            const MyArray3 = await AsyncStorage.getItem("MyCart");
            function removeDuplicates(array) {
              return array.filter((a, b) => array.indexOf(a) === b);
            }
            var RemovedIDs = removeDuplicates(JSON.parse(MyArray3));
            var N = RemovedIDs.includes(ProductId);
            //alert(N)
          } catch (error) {
            console.log(error);
          }
          return N;
        },
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
