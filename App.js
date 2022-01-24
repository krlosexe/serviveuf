import React from 'react'

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import UserProvider from './contexts/UserProvider'


import Home from './screens/Home'
import Login from './screens/Login'
import Register from './screens/Register'
import Forgout from './screens/ForgoutPassword'
import ForgoutPasswordSuccess from './screens/ForgoutPasswordSuccess'

import Profile from './screens/Profile'
import ProfileEdit from './screens/ProfileEdit'

import ServiceProviderRegister from './screens/ServiceProviderRegister'


import MovementHistory from './screens/MovementHistory'

import Dashboard from './screens/Dashboard'
import StepOne from './screens/StepOne'
import StepTwo from './screens/StepTwo'
import StepThree from './screens/StepThree'
import RequestService from './screens/RequestService'
import RequestServiceDetail from './screens/RequestServiceDetail'
import RequestOfferts from './screens/RequestOfferts'
import RequestOffertsDetails from './screens/RequestOffertsDetails'




const Drawer = createDrawerNavigator();


function App(){
  return (
    <NavigationContainer>
      <UserProvider>
       <Drawer.Navigator>
         <Drawer.Screen name="Home"                     component={ Home } />
         <Drawer.Screen name="Login"                    component={ Login } />
         <Drawer.Screen name="Register"                 component={ Register } />
         <Drawer.Screen name="Forgout"                  component={ Forgout } />
         <Drawer.Screen name="ForgoutPasswordSuccess"   component={ ForgoutPasswordSuccess } />
         <Drawer.Screen name="Profile"                  component={ Profile } />
         <Drawer.Screen name="ServiceProviderRegister"  component={ ServiceProviderRegister } />
         <Drawer.Screen name="ProfileEdit"              component={ ProfileEdit } />
         <Drawer.Screen name="MovementHistory"          component={ MovementHistory } />
         <Drawer.Screen name="Dashboard"                component={ Dashboard } />
         <Drawer.Screen name="StepOne"                  component={ StepOne } />
         <Drawer.Screen name="StepTwo"                  component={ StepTwo } />
         <Drawer.Screen name="StepThree"                component={ StepThree } />
         <Drawer.Screen name="RequestService"           component={ RequestService } />
         <Drawer.Screen name="RequestServiceDetail"     component={ RequestServiceDetail } />
         <Drawer.Screen name="RequestOfferts"           component={ RequestOfferts } />
         <Drawer.Screen name="RequestOffertsDetails"    component={ RequestOffertsDetails } />
       </Drawer.Navigator>
      </UserProvider>
    </NavigationContainer>
  )
}
console.disableYellowBox = true
export default App;

