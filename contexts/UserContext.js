import { createContext } from 'react'

const UserContext = createContext({
  setUserDetails: userDetails => {}
})

export default UserContext