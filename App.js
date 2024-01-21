import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MoneyCenter from './src/screens/MoneyCenter';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import Otpverified from './src/screens/Otpverified';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import UserPage from './src/screens/UserPageScreen';
import GoogleLogin from './src/components/GoogleLogin';
import ConfirCode from './src/screens/ConfirCode';
import ConfirChangePassword from './src/screens/ConfirChangePassword';
import IncomeForm from './src/screens/IncomeForm';
import ProfileScreen from './src/screens/ProfileScreen';
import {Provider} from "react-redux";
import store from "./store/index";
import ObjetiveScreen from './src/screens/ObjetiveScreen';
import MovimientosScreen from './src/screens/MovimientosScreen';
import Menu from './src/components/shared/Menu';
import Header from './src/components/shared/Header';
import ExpenseForm from './src/screens/ExpenseForm';
import ObjetiveForm from './src/screens/ObjetiveForm';
 
const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();
//
const MainTabs = () => {
  
  return (
    
    <Tab.Navigator tabBar={() => <Menu  />}  screenOptions={{
      header: () => <Header />, }}>
      <Tab.Screen name="inicio" component={HomeScreen} options={{title: 'HomeScreen'}} />
      <Tab.Screen name="metas" component={ObjetiveScreen} />
      <Tab.Screen name="movimientos" component={MovimientosScreen} />
      <Tab.Screen name="perfil" component={ProfileScreen} />
    </Tab.Navigator>
    
  );
};

export default function App() {
  
  return (
    <Provider store = {store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="MoneyCenter" component={MoneyCenter} options={{title: 'Money Center'}} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
          <Stack.Screen name="ConfirCode" component={ConfirCode} />
          <Stack.Screen name="ConfirChangePassword" component={ConfirChangePassword} />
          <Stack.Screen name="UserPage" component={UserPage} />
          <Stack.Screen name="GoogleLogin" component={GoogleLogin} />
          <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
          <Stack.Screen name="IncomeForm" component={IncomeForm} />
          <Stack.Screen name="ExpenseForm" component={ExpenseForm} />
          <Stack.Screen name="ObjetiveForm" component={ObjetiveForm} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
   
  );
}

/*
<Stack.Screen name="Otpverified" component={Otpverified} />
<Stack.Screen name="IncomeScreens" component={IncomeScreen}  />
*/