import React from 'react'
import {Link} from 'react-router-dom'
import img from '../assets/images/not-found.svg'
  
function Error() {
  return (
    <div>
       <imag src={img} alt='not-found'/>
       <Link to="/">Back Home</Link>
    </div>
  )
}

export default Error
