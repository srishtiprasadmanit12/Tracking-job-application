// import React,{useState,useContext, useReducer} from 'react'
// import reducer from './reducer'
// import { DISPLAY_ALERT } from "./actions";

// export const initialState={
//     isLoading:false,
//     showAlert:false,
//     alertText:'',
//     alertType:'',
// }

// const AppContext=React.createContext();
// const AppProvider=({children})=>{
//     const [state,dispatch]=useReducer(reducer,initialState);
//     //const [state,setState]=useState(initialState);
//     const displayAlert=()=>{
//         dispatch({type:DISPLAY_ALERT})
//     }
//     return(
//         <AppContext.Provider
//             value={{
//                 ...state,displayAlert
//             }}>
//             {children}
//         </AppContext.Provider>
//     )
// }
// //custom hook named useAppContext & we're hooking AppContext 
// //else everwhere we use we have to do createContext
// export const useAppContext = () => {
//     return useContext(AppContext)
//   }
// export {AppProvider}

import React, {useState,useReducer,useContext} from 'react'
import reducer from './reducer'
import {CLEAR_ALERT, DISPLAY_ALERT} from './actions'
import { clear } from '@testing-library/user-event/dist/clear'
const initialState={
isLoading:false,
showAlert:false,
alertText:'',
alertType:''
}

const AppContext=React.createContext()
const AppProvider=({children})=>{
    const [state,dispatch]=useReducer(reducer,initialState)


    const displayAlert=()=>{
      dispatch({type:DISPLAY_ALERT}) 
      clearAlert(); 
    }

    const clearAlert=()=>{
      setTimeout(()=>{
        dispatch({type:CLEAR_ALERT})
      },3000)
    }

    return (
        <AppContext.Provider value={{ ...state,displayAlert }}>
          {children}
        </AppContext.Provider>
      )
}
//custom hook 
const useAppContext = () => {
    return useContext(AppContext)
  }
  export  { AppProvider,initialState,useAppContext};