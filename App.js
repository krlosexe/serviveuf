import React from 'react'
import { NotifierWrapper } from 'react-native-notifier';

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

import RequestService from './screens/RequestService'
import RequestServiceDetail from './screens/RequestServiceDetail'
import RequestOfferts from './screens/RequestOfferts'
import RequestOffertsDetails from './screens/RequestOffertsDetails'
import MyRequestServices from './screens/MyRequestServices'
import MyOffertsServices from './screens/MyOffertsServices'
import Faq from './screens/Faq'
import Chat from './screens/Chat'
import CalificationServiceProvider from './screens/CalificationServiceProvider'
import CreditAccount from './screens/CreditAccount'
import MethodPay from './screens/MethodPay'
import PayToCard from './screens/PayToCard'
import PayToNequi from './screens/PayToNequi'
import PaymentSummary from './screens/PaymentSummary'
import ReportProblem from './screens/ReportProblem'
import ProfileEditCtagories from './screens/ProfileEditCtagories'
import Interes from './screens/Interes'
import Security from './screens/Security'
import IntroServiceProvider from './screens/IntroServiceProvider'

import Shop from './screens/Shop'

const Drawer = createDrawerNavigator();


function App(){
  return (

    <NotifierWrapper>
      <NavigationContainer>
        <UserProvider>
        <Drawer.Navigator>
          <Drawer.Screen name="Home"                        component={ Home } />
          <Drawer.Screen name="Login"                       component={ Login } />
          <Drawer.Screen name="Register"                    component={ Register } />
          <Drawer.Screen name="Forgout"                     component={ Forgout } />
          <Drawer.Screen name="ForgoutPasswordSuccess"      component={ ForgoutPasswordSuccess } />
          <Drawer.Screen name="Profile"                     component={ Profile } />
          <Drawer.Screen name="ServiceProviderRegister"     component={ ServiceProviderRegister } />
          <Drawer.Screen name="ProfileEdit"                 component={ ProfileEdit } />
          <Drawer.Screen name="MovementHistory"             component={ MovementHistory } />
          <Drawer.Screen name="Dashboard"                   component={ Dashboard } />
          <Drawer.Screen name="RequestService"              component={ RequestService } />
          <Drawer.Screen name="RequestServiceDetail"        component={ RequestServiceDetail } />
          <Drawer.Screen name="RequestOfferts"              component={ RequestOfferts } />
          <Drawer.Screen name="RequestOffertsDetails"       component={ RequestOffertsDetails } />
          <Drawer.Screen name="MyRequestServices"           component={ MyRequestServices } />
          <Drawer.Screen name="MyOffertsServices"           component={ MyOffertsServices } />
          <Drawer.Screen name="Faq"                         component={ Faq } />
          <Drawer.Screen name="Chat"                        component={ Chat } />
          <Drawer.Screen name="CalificationServiceProvider" component={ CalificationServiceProvider } />
          <Drawer.Screen name="CreditAccount"               component={ CreditAccount } />
          <Drawer.Screen name="MethodPay"                   component={ MethodPay } />
          <Drawer.Screen name="PayToCard"                   component={ PayToCard } />
          <Drawer.Screen name="PayToNequi"                  component={ PayToNequi } />
          <Drawer.Screen name="PaymentSummary"              component={ PaymentSummary } />
          <Drawer.Screen name="ReportProblem"               component={ ReportProblem } />
          <Drawer.Screen name="Security"                    component={ Security } />
          <Drawer.Screen name="ProfileEditCtagories"        component={ ProfileEditCtagories } />
          <Drawer.Screen name="Interes"                     component={ Interes } />
          <Drawer.Screen name="IntroServiceProvider"        component={ IntroServiceProvider } />
          <Drawer.Screen name="Shop"        component={ Shop } />
          
        </Drawer.Navigator>
        </UserProvider>
      </NavigationContainer>
    </NotifierWrapper>
  )
}
console.disableYellowBox = true
export default App;

