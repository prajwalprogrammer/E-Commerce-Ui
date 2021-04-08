import axios from "axios";
import moment from "moment";

const instances = axios.create({
  baseURL: "https://us-central1-mwcdispdepot-df9c9.cloudfunctions.net/app",
});
export const Read = async () => {
  try {
    const { data } = await instances.post(`/api/category/search`, {
      query: true,
      value: "isActive",
    });
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
    const ActiveProduct = [];
    data.filter((item) => item.isActive && ActiveProduct.push(item));
    console.log("show" + JSON.stringify(data[0].image[0]));
    return ActiveProduct;
  } catch (error) {
    console.log(error);
  }
};
export const DailyDeal = async () => {
  try {
    const { data } = await instances.get(`/api/product/read`);
    const DailyItemList = [];
    const ActiveList = [];
    data.filter(
      (item) => item.discount > 0 && item.isActive && DailyItemList.push(item)
    );
    // DailyDeal.map((item) => {
    //   item.hasOwnProperty("isActive")
    //     ? item.isActive && ActiveList.push(item)
    //     : ActiveList.push(item);
    // });
    return DailyItemList;
  } catch (error) {
    console.log(error);
  }
};

export const ReadAllProducts = async () => {
  const obj = { query: true, value: "isActive" };
  try {
    const { data } = await axios.post(
      "https://us-central1-mwcdispdepot-df9c9.cloudfunctions.net/app/api/product/search/",
      obj
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const GetProduct = async (Pids, Nav, Quan) => {
  var DATA = [];
  try {
    const { data } = await instances.get(`/api/product/read/${Pids}`);
    console.log(data);
    // alert(data.quantity +"yy" +Quan)
    Nav.navigate("Product", {
      name: data.name,
      description: data.description,
      uri1: data.image,
      Quantity: data.quantity,
      price: data.price,
      Cid: data.category_id,
      Pid: data.id,
      Discount: data.discount,
      NewQuan: Quan,
    });
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
  phone
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
      Sales_Id: null,
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
    console.log(data);
    return data;
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
  OrderData.map((item) => {
    OrderListData.push({
      Discount: item.Discount,
      Price_Unit: item.ProductPrice,
      ProductId: item.id,
      ProductName: item.name,
      Quantity: item.Quantity,
    });
  });

  const OrderId = Math.floor(Math.random() * 100000);
  var DATA = {
    AccountName: AccountName,
    Accountid: username,
    DateTime: TimeAndDate,
    OrderDetail: OrderListData,
    Status: "Received",
    Total: Total,
    Type: type,
    orderCreatedDate: moment(new Date()).format("ll"),
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
      await UpdateUserOrder(
        UserInfo,
        AccountOrderListData,
        OrderData
      ).then((res) => console.log("object" + res));
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const ProductQuantityUpdate = async (id, quantity) => {
  const obj = {
    quantity: quantity,
  };
  //alert("quan"+quantity)
  console.log("hoo" + obj);
  const { data } = await instances.put(`/api/product/update/${id}`, obj);
  console.log(data);
};

export const UpdateUserOrder = async (Profile, Order, OrderListData) => {
  console.log("OrderListData" + OrderListData);
  var obj = {};
  if (Profile.OrderList) {
    obj = {
      OrderList: [Order, ...Profile.OrderList],
    };
  } else {
    obj = {
      OrderList: [Order],
    };
  }

  try {
    const { data } = await instances.put(
      `/api/account/update/${Profile.id}`,
      obj
    );
    console.log("daas" + data);
    if (data) {
      OrderListData.map(async (item) => {
        console.log("item" + item.id + item.SubQuantity);
        await ProductQuantityUpdate(item.id, item.SubQuantity);
      });
    }
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
  Image,
  Link,
  Date
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

    STD: {
      Sales_Id: TaxId,
      Sales_Tax_Link: Link,
      Sales_expire_Date: Date,
    },
  };
  console.log(JSON.stringify(obj));
  try {
    const { data } = await instances.put(`/api/account/update/${useName}`, obj);
    console.log("daas" + data);
    return data;
  } catch (error) {
    console.log("ghk" + error);
  }
};

export const UpdateImage = async (URL, data1) => {
  obj = {
    STD: {
      ...data1.STD,
      Sales_Tax_Link: URL,
    },
  };
  // alert(URL)
  try {
    const { data } = await instances.put(
      `/api/account/update/${data1.id}`,
      obj
    );
    //alert(data)
    return URL;
  } catch (err) {
    console.log(err);
  }
};
