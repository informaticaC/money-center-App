import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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
import { Provider } from "react-redux";
import store from './store/index'
import ObjetiveScreen from './src/screens/ObjetiveScreen';
import MovimientosScreen from './src/screens/MovimientosScreen';
import Menu from './src/components/shared/Menu';
import Header from './src/components/shared/Header';
import ExpenseForm from './src/screens/ExpenseForm';
import ObjetiveForm from './src/screens/ObjetiveForm';
import { RootSiblingParent } from 'react-native-root-siblings';
import FormRegister from './src/components/loginRegister/FormRegister';
import { useEffect, useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';


const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();
//
const MainTabs = () => {

  return (

    <Tab.Navigator tabBar={() => <Menu />}
      screenOptions={{
        header: () => <Header />,
      }}>
      <Tab.Screen name="inicio" component={HomeScreen} options={{ title: 'Home Screen' }} />
      <Tab.Screen name="metas" component={ObjetiveScreen} />
      <Tab.Screen name="movimientos" component={MovimientosScreen} />
      <Tab.Screen name="perfil" component={ProfileScreen} />
    </Tab.Navigator>

  );
};

export default function App() {

  useEffect (()=>{
    console.log('Showing Splash Screen');
    SplashScreen.preventAutoHideAsync();

  },[]);

  const [fontsLoaded] = useFonts({
    UrbanistRegular: require('./assets/fonts/UrbanistRegular.ttf'),
    UrbanistBold: require('./assets/fonts/UrbanistBold.ttf'),
    UrbanistMedium: require('./assets/fonts/UrbanistMedium.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if(fontsLoaded ) {
      console.log('fontsLoaded:', fontsLoaded);
      await SplashScreen.hideAsync();
    }
   }, [fontsLoaded]);

   const splashOff = async () => {
    await SplashScreen.hideAsync();
   }

   if (!fontsLoaded) {
    return null;
  } else { splashOff();  }
  
  return (
    <Provider store={store}>
      <RootSiblingParent>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="MoneyCenter" component={MoneyCenter} options={{ title: 'Money Center' }} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ title: 'Login Screen' }} />
            <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
            <Stack.Screen name="ConfirCode" component={ConfirCode} />
            <Stack.Screen name="ConfirChangePassword" component={ConfirChangePassword} />
            <Stack.Screen name="UserPage" component={UserPage} />
            <Stack.Screen name="GoogleLogin" component={GoogleLogin} />
            <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
            <Stack.Screen name="IncomeForm" component={IncomeForm} options={{title: 'Formulario de ingresos'}} />
            <Stack.Screen name="ExpenseForm" component={ExpenseForm} options={{title: 'Formulario de gastos'}} />
            <Stack.Screen name="ObjetiveForm" component={ObjetiveForm} options={{title: 'Formulario de metas de ahorro'}} />
            <Stack.Screen name="Otpverified" component={Otpverified} />
            <Stack.Screen name="FormRegister" component={FormRegister} />
          </Stack.Navigator>
        </NavigationContainer>
      </RootSiblingParent>
    </Provider>

  );
}
