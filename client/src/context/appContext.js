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

import React, {useState,useReducer,useContext,registerUser} from 'react'
import reducer from './reducer'
import axios from 'axios'
import {DISPLAY_ALERT,CLEAR_ALERT,REGISTER_USER_BEGIN,REGISTER_USER_SUCCESS,REGISTER_USER_ERROR} from './actions'
import { clear } from '@testing-library/user-event/dist/clear'
const initialState={
isLoading:false,
showAlert:false,
alertText:'',
alertType:'',
user:null,
taken:null,
userLocation:'',
jobLocation:''
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
    
    const registerUser=async (currentUser)=>{
      // console.log(currentUser)
      dispatch({type:REGISTER_USER_BEGIN})
      try{
        const response=await axios.post('/api/v1/auth/register',currentUser)
        console.log(response);
        const {user,token,location}=response.data
        dispatch({
          type:REGISTER_USER_SUCCESS,
          payload:{user,token,location},
        })
        //local storage later
      }catch(error){
       console.log(error.response)
       dispatch({
        type:REGISTER_USER_ERROR,
        payload:{msg:error.response.data.msg},
      
      })
      }
      clearAlert()
    }

    return (
        <AppContext.Provider value={{ ...state,displayAlert,registerUser}}>
          {children}
        </AppContext.Provider>
      )
}
//custom hook 
const useAppContext = () => {
    return useContext(AppContext)
  }
  export  { AppProvider,initialState,useAppContext,registerUser};