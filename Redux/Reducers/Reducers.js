import {ADD} from '../Types/Types'

export const Reducers = (state=[],action) =>{

switch(action.type){

 case ADD : 
 return [
   
   ...action.payload.data
   
    
 ] 
 default: return state
}

}

