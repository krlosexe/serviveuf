import React from 'react'

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import UserProvider from './contexts/UserProvider'


import Home from './screens/Home'
import Login from './screens/Login'
import Register from './screens/Register'
import Forgout from './screens/ForgoutPassword'
import ForgoutPasswordSuccess from './screens/ForgoutPasswordSuccess'
import Dashboard from './screens/Dashboard'
import RequestService from './screens/RequestService'
const Drawer = createDrawerNavigator();


function App(){
  return (
    <NavigationContainer>
      <UserProvider>
       <Drawer.Navigator>
         <Drawer.Screen name="Home"                   component={ Home } />
         <Drawer.Screen name="Login"                  component={ Login } />
         <Drawer.Screen name="Register"               component={ Register } />
         <Drawer.Screen name="Forgout"                component={ Forgout } />
         <Drawer.Screen name="ForgoutPasswordSuccess" component={ ForgoutPasswordSuccess } />
         <Drawer.Screen name="Dashboard"              component={ Dashboard } />
         <Drawer.Screen name="RequestService"         component={ RequestService } />
         
       </Drawer.Navigator>
      </UserProvider>
    </NavigationContainer>
  )
}
console.disableYellowBox = true
export default App;

