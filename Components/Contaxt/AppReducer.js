
export default(state,action)=> {
  switch(action.type){
    case 'DELETE_TRANSACTION':
      return{
        ...state,
        transations:state.transations.filter(transaction=>transaction.id !== action.payload)
      }
      case 'ADD_TRANSACTION':
        return{
          ...state,
          transations:[...state.transations,action.payload]
        }
    default :
    return state
  }
}
