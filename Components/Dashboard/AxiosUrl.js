import axios from "axios";
import moment from "moment";

const instances = axios.create({
  baseURL: "https://us-central1-mwcdispdepot-df9c9.cloudfunctions.net/app",
});
export const Read = async () => {
  try {
    const { data } = await instances.get(`/api/category/read`);
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
    const { data } = await instances.post(
      `/api/product/search/`,
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
    const { data } = await instances.post(`/api/product/search/`, {
      query: "CAT0009",
      value: "category_id",
    });

    console.log("Daily" + data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const GetMyCart = async (Pids) => {
  var DATA = [];
  try {
    const { data } = await instances.get(`/api/product/read/${Pids}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const SignUp = async (
  useName,
  password,
  name,
  address,
  email,
  phone,
  TaxId
) => {
  //alert("gyy")
  const obj = {
    id: useName,
    isActive: false,
    Password: password,
    AccountName: name,
    AccountSince: moment(new Date()).format("lll"), //Current Date
    Contact: [
      {
        Address: address,
        EmailId: email,
        PhoneNumber: phone,
      },
    ],
    OrderList: null,
    Image: null,
    STD: {
      Sales_Id: TaxId,
      Sales_Tax_Link:
        "https://digitalasset.intuit.com/IMAGE/A06yW2VcG/w-9_tax_form.jpg",
      Sales_expire_Date: null,
    },
  };
  console.log(JSON.stringify(obj));
  try {
    const { data } = await instances.post("/api/account/create", obj);
    console.log("daas" + data);
    return data;
  } catch (error) {
    console.log("ghk" + error);
  }
};

export const SignIn123 = async (username, password) => {
  try {
    const { data } = await instances.get(`/api/account/read/${username}`);
    console.log(data.Password);
    return data.Password;
  } catch (error) {
    console.log(error);
  }
};
export const GetUserDetails = async (username) => {
  try {
    const { data } = await instances.get(`/api/account/read/${username}`);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

//Update

export const AddOrder = async (
  OrderData,
  username,
  AccountName,
  TimeAndDate,
  Total,
  type,
  UserInfo
) => {
  const OrderListData = [];
  OrderData.map((item)=>{
    OrderListData.push({
      Discount:item.Discount,
      Price_Unit:item.price,
      ProductId:item.id,
      ProductName:item.name,
      Quantity:item.Quantity,
    })
  })

  const OrderId = Math.floor(Math.random() * 100000);
  var DATA = {
    AccountName: AccountName,
    Accountid: username,
    DateTime: TimeAndDate,
    OrderDetail: OrderListData,
    Status: "Received",
    Total: Total,
    Type: type,
    id: "ORD-" + OrderId,
  };

  const AccountOrderListData = {
    DateTime: TimeAndDate,
    OrderId: "ORD-" + OrderId,
    Status: "Received",
    Total: Total,
  };
  try {
    const { data } = await instances.post(`/api/orders/create`, DATA);
    if (data) {
      await UpdateUserOrder(UserInfo, AccountOrderListData, OrderListData).then((res) =>
        console.log("object" + res)
      );
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const ProductQuantityUpdate = async (id, quantity) =>{
  const obj={
    quantity:quantity
  }
  alert("quan"+quantity) 
  console.log("hoo"+obj)
  const {data}=await instances.put(`/api/product/update/${id}`,obj)
  console.log(data)
}

export const UpdateUserOrder = async (Profile, Order,OrderListData) => {
  var obj ={}
  if(Profile.OrderList){
    obj = {
      OrderList: [Order,...Profile.OrderList],
    };
  }else{
    obj = {
      OrderList: [Order],
    };
  }
  try {
    OrderListData.map(item=>{
      alert(item.ProductId + item.Quantity);
      ProductQuantityUpdate(item.ProductId,item.SubQuantity)
    })
  } catch (error) {
    console.log(error);
  }
  
  try {
    const { data } = await instances.put(
      `/api/account/update/${Profile.id}`,
      obj
    );
    console.log("daas" + data);
    return data;
  } catch (error) {
    console.log("ghk" + error);
  }
};



//
export const UpdateUser = async (
  useName,
  Status,
  name,
  Since,
  address,
  email,
  phone,
  TaxId,
  password,
  Image
) => {
  //alert("gyy")
  const obj = {
    id: useName,
    isActive: Status,
    Password: password,
    AccountName: name,
    AccountSince: Since, //Current Date
    Contact: [
      {
        Address: address,
        EmailId: email,
        PhoneNumber: phone,
      },
    ],
    OrderList: null,
    STD: {
      Sales_Id: TaxId,
      Sales_Tax_Link:
        "https://digitalasset.intuit.com/IMAGE/A06yW2VcG/w-9_tax_form.jpg",
      Sales_expire_Date: null,
    },
    Image: Image,
  };
  console.log(JSON.stringify(obj));
  try {
    const { data } = await instancess.put(
      `/api/account/update/${useName}`,
      obj
    );
    console.log("daas" + data);
    return data;
  } catch (error) {
    console.log("ghk" + error);
  }
};
