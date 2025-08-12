import React, { useContext } from 'react'
import { userContext } from './productdetails'



const AnotherPass = () => {
  let product=useContext(userContext)
console.log(product);

    return (
    <div>
        <h1>UserName:{product.pname}
          </h1>
    </div>
  )
}

export default AnotherPass