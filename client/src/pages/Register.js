import React,{useState,useEffect} from 'react'
import {Logo,FormRow,Alert} from "../components"
import Wrapper from "../assets/wrappers/RegisterPage"
import { useAppContext } from "../context/appContext"
import {useNavigate} from 'react-router-dom'
const initialState={
  name:'',
  email:'',
  password:'',
  isMember:true,
  showAlert:false,
}
function Register() {
const navigate=useNavigate();
const [values,setValues]=useState(initialState);
//setting global contex & navigator

const { user,isLoading, showAlert,displayAlert,registerUser} = useAppContext()
const toggleMember=()=>{
  setValues({...values,isMember:!values.isMember})
}
const handleChange=(e)=>{
    //console.log(e.target);
    setValues({...values,[e.target.name]:e.target.value})
}
const onSubmit = (e) => {
  e.preventDefault()
  const { name, email, password, isMember } = values
  if (!email || !password || (!isMember && !name)) {
    displayAlert();
    return;
  }
  //if not empty then set up User
  const currentUser={name,email,password}
  if(isMember)
  {
   console.log('already a member'); 
  }
  else{
    registerUser(currentUser)
  }
 // console.log(values)
}
useEffect(()=>{
if(user)
{
  //if user exists then after 3 sec we'll navigate it to dashboard
  setTimeout(() => {
    navigate('/')
  }, 3000);
}
},[user,navigate])
  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={onSubmit}>
      <Logo />
        <h3>{values.isMember?"Login":"Register"}</h3>
        {showAlert &&<Alert />}
        {/* name field */}
        {!values.isMember&&(<FormRow 
        type="text" 
        name="name"
        value={values.name}
        handleChange={handleChange}
        />)}
        {/* email field */}
        <FormRow 
        type="email" 
        name="email"
        value={values.email}
        handleChange={handleChange}
        />
        {/* password field */}
        <FormRow 
        type="password" 
        name="password"
        value={values.password}
        handleChange={handleChange}
        />
          <button type='submit' className='btn btn-block' disabled={isLoading}>
          submit
        </button>
        <p>
          {values.isMember?'Not a member yet?':'Already a member?'}
       
        {/* <button type="submit" onClick={toggleMember} className='btn btn-block'>submit
        </button> */}
        <button type='button' onClick={toggleMember} className='member-btn'>
        {values.isMember ? 'Register' : 'Login'}
      </button>
        </p>
      </form>
    </Wrapper>
  )
}

export default Register

// import React from 'react'
// import {useState,useEffect} from 'react'
// import {Logo,FormRow,Alert} from '../components'
// import Wrapper from '../assets/wrappers/RegisterPage'
// import { useAppContext } from '../context/appContext'

// const initialState={
//   name:'',
//   email:'',
//   password:'',
//   isMember:true,
//   showAlert:false
// }

// const Register = () => {

//   const [values,setvalues] = useState(initialState);
//   //global state and useNavigate

//   const { isLoading, showAlert ,displayAlert} = useAppContext()

//   const toggleMember=()=>{
//     setvalues({...values,isMember:!values.isMember})
//   }

//   const handleChange=(e)=>{
//     //console.log(e.target);
//     setvalues({...values,[e.target.name]:e.target.value});

//   }
//   const onSubmit=(e)=>{
//     e.preventDefault()
//     //console.log(e.taregt);
//     const {name,email,password,isMember}=values
//     if(!email ||!password ||(!isMember&&!name))
//     {
//       displayAlert()
//       return;
//     }
//     console.log(values);
//   }

//   return (
//     <Wrapper className='full-page'>
//       <form className='form' onSubmit={onSubmit}>
//         <Logo />
//         {/* toggle h3 */}
//         <h3>{values.isMember?'Login':'Register'}</h3>
//         {showAlert && <Alert/>} 
//         {/* since now showAlert is global so can access anywhere */}
//         {/* toggle name */}
//         {/* name field */}
//         {!values.isMember &&(
//         <FormRow 
//         type="text"
//         name="name"
//         value={values.name}
//         handleChange={handleChange}
//         />)}
//         {/* email field */}
//         <FormRow 
//         type="email"
//         name="email"
//         value={values.email}
//         handleChange={handleChange}
//         />
//         {/* password field */}
//         <FormRow 
//         type="password"
//         name="password"
//         value={values.password}
//         handleChange={handleChange}
//         />

//         <button type='submit' className='btn btn-block' >
//          Submit
//         </button>
//         <p>
//         {values.isMember?'Not a member yet?':'Already a member?'}
//           <button type='button' onClick={toggleMember} className='member-btn'>Register</button>
//         </p>
//       </form>
//     </Wrapper>
//   )
// }

// export default Register
