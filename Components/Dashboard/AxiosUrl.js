import axios from "axios";
import moment from 'moment'
export const Read = async () => {
  try {
    const { data } = await axios.get(
      `https://us-central1-mwcdispdepot-df9c9.cloudfunctions.net/app/api/category/read`
    );
    console.log("data" + JSON.stringify(data[0]));
    return data;
  } catch (error) {
    console.log(data);
  }
};
export const ShowData = async (Cid, C) => {
  //alert(Cid + C)
  const obj = { query: Cid, value: C };
  //console.log(JSON.stringify(obj))
  try {
    const { data } = await axios.post(
      `https://us-central1-mwcdispdepot-df9c9.cloudfunctions.net/app/api/product/search/`,
      obj
      // {
      //   "query": Cid,
      //   "value": "category_id",
      // }
    );
    console.log("show" + JSON.stringify(data[0].image[0]));
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const DailyDeal = async () => {
  try {
    const { data } = await axios.post(
      `https://us-central1-mwcdispdepot-df9c9.cloudfunctions.net/app/api/product/search/`,
      {
        query: "CAT0009",
        value: "category_id",
      }
    );
    console.log("Daily" + data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const GetMyCart = async (Pids) => {
  var DATA = [];
  try {
    const { data } = await axios.get(
      `https://us-central1-mwcdispdepot-df9c9.cloudfunctions.net/app/api/product/read/${Pids}`
    );

    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const SignUp = async (useName,password,name,address,email,phone,TaxId,setTaxExpire) => {
  //alert("gyy")
  const obj = {
    id: useName,
    isActive: false,
    Password:password,
    AccountName: name,
    AccountSince: moment(new Date()).format('lll'),//Current Date
    Contact: [
      {
        Address: address,
        EmailId: email,
        PhoneNumber:phone,
      },
    ],
    OrderList: null,
    Image:null,
    STD: {
      Sales_Id: TaxId,
      Sales_Tax_Link:
        "https://digitalasset.intuit.com/IMAGE/A06yW2VcG/w-9_tax_form.jpg",
      Sales_expire_Date: setTaxExpire,
    },
  };
  console.log(JSON.stringify(obj))
  try {
    const { data } =await axios.post(
      "https://us-central1-mwcdispdepot-df9c9.cloudfunctions.net/app/api/account/create",obj
    );
    console.log("daas"+data)
    return data;
  } catch (error) {
    console.log("ghk"+error);
  }
};


export const SignIn123=async(username,password)=>{
  try {
    const {data}= await axios.get(`https://us-central1-mwcdispdepot-df9c9.cloudfunctions.net/app/api/account/read/${username}`);
    console.log(data.Password)
    return data.Password
  } catch (error) {
    console.log(error)
  }
}
export const GetUserDetails=async(username)=>{
  try {
    const {data}= await axios.get(`https://us-central1-mwcdispdepot-df9c9.cloudfunctions.net/app/api/account/read/${username}`);
    console.log(data)
    return data
  } catch (error) {
    console.log(error)
  }
}

//Update
export const UpdateUser = async (useName,Status,name,Since,address,email,phone,TaxId,setTaxExpire,password,Image) => {
  //alert("gyy")
  const obj = {
    id: useName,
    isActive: Status,
    Password:password,
    AccountName: name,
    AccountSince: Since,//Current Date
    Contact: [
      {
        Address: address,
        EmailId: email,
        PhoneNumber:phone,
      },
    ],
    OrderList: null,
    STD: {
      Sales_Id: TaxId,
      Sales_Tax_Link:
        "https://digitalasset.intuit.com/IMAGE/A06yW2VcG/w-9_tax_form.jpg",
      Sales_expire_Date:moment(setTaxExpire).format('lll') ,
    },
    Image:Image
  };
  console.log(JSON.stringify(obj))
  try {
    const { data } =await axios.put(
      `https://us-central1-mwcdispdepot-df9c9.cloudfunctions.net/app/api/account/update/${useName}`,obj
    );
    console.log("daas"+data)
    return data;
  } catch (error) {
    console.log("ghk"+error);
  }
};

