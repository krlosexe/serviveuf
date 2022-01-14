import React, { useState } from 'react'
import UserContext from './UserContext'


const UserProvider = ({ children }) => {
  

  const [ userDetails, setUserDetails ] = useState({
    email : null,
    fcmToken : null,
    last_names: null,
    names: null,
    password: null,
    updated_at: null,
    created_at : null,
    id : null
})

  const _retrieveData = async () => {

    try {
      
        const value = JSON.parse(await AsyncStorage.getItem('@Passport'));
            
        if (value && value.token !== undefined) {
       
            setUserDetails(value)
            return value
      }
    } catch (error) {
      // Error retrieving data
    }
  };



  setInterval(()=>{
    _retrieveData()   
    },2000)


  
  const obj = { ...userDetails , setUserDetails }
  

  return (
    <UserContext.Provider value={obj}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider