import {ADD} from '../Types/Types'

export const add = (data) =>{

 return{
    type:ADD,
    payload:{
     data
    }
 }
}

