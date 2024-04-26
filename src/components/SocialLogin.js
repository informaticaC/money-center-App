import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch} from 'react-redux';
import { setUsers } from '../../store/slices/users.slice';
import { setToken } from '../../store/slices/token.slice';
import { View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
// import GoogleLogin from './GoogleLogin';
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import sendToken from '../utils/sendToken';
// import HomePage from '../screens/HomePage';
// import UserPage from '../screens/UserPageScreen';
import Apple from '../../assets/img/apple.png';
import Gooogle from '../../assets/img/Google.png';
import Facebook from '../../assets/img/facebook.png';

WebBrowser.maybeCompleteAuthSession();

const SocialLogin = () => {

  const navigation = useNavigation();
  const [userLocal, setUserLocal] = React.useState(AsyncStorage.getItem("@user"));
  const [userInfo, setUserInfo] = React.useState();
  const [request, response, promptAsyncIdToken] = Google.useIdTokenAuthRequest({
		androidClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
		iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
		webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID
	});

  const dispatch = useDispatch();
  
  useEffect(() => {

		//console.log('SocialLogin.js, line 35, handleSignInWithGoogle with response:', response);
    //console.log('SocialLogin.js, line 36, handleSignInWithGoogle with request:', request);
    if (response) {
      handleSignInWithGoogle();
    }
			
 	}, [response]);

   async function handleSignInWithGoogle(){
		let user = await userLocal;
    if (!user) {
			if (response?.type === 'success' ) {
				//console.log('using data getted in promptAsyncIdToken........')
				console.log("SocialLogin.js,line 48, There aren't user in storage, Google user from de bakend server");
				//console.log('response from propmtAsyncIdToken:',response);
					//console.log("idToken:",resp.params.id_token);
				await sendToken(response.params.id_token)
          .then((response)=>{
            //actualizar Redux!!
            console.log('SocialLogin.js, line 53, response:===>>>', response);
            const googleUser = response.user;
            const googleUserToken = response.token;
            console.log('SocialLogin.js, line 57, response.googleUser:===>>>', googleUser);
            if (googleUser === undefined){
              AsyncStorage.removeItem("@user");
              AsyncStorage.removeItem("@token");
              dispatch(setUsers(null));
              dispatch(setToken(null));
              navigation.navigate('MoneyCenter');
            }
            dispatch(setUsers(googleUser));
            dispatch(setToken(googleUserToken));
            //console.log('Navigating to MainTabs, { screen: "inicio" }');
            AsyncStorage.getItem("@user").then( usr => {
              user = usr;
              //console.log('line 63, SocialLogin.js, user:======>>>>>', user );
              navigation.navigate('MainTabs', { screen: 'inicio' });

            }  );
            //navigation.navigate('UserPage');e
            })
          .catch(err => {
            console.error('SocialLogin, line 74, err:==>', err);
            navigation.navigate('MoneyCenter');
            });
				  //console.log('user:==>',user);
			}
					// console.log(response.authentication.accessToken);
		}else {
			console.log('User desde Async Storage @user ::',user);
      navigation.navigate('MainTabs', { screen: 'inicio' });
			//setUserInfo(JSON.parse(user));
		}
	};  

  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.socialLoginButton} onPress={() =>  promptAsyncIdToken() }>
          <Image source={Gooogle} style={styles.socialLoginIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialLoginButton} onPress={() => alert('Iniciar sesión con Apple')}>
          <Image source={Apple} style={styles.socialLoginIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialLoginButton} onPress={() => alert('Iniciar sesión con Facebook')}>
          <Image source={Facebook} style={styles.socialLoginIcon} />
        </TouchableOpacity>
      </View>
  )
};

const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      gap: 15,
      justifyContent: "center",
    },

    socialLoginButton: {
      backgroundColor: '#fff',
      borderRadius: 20,
      borderWidth: 1,
      borderColor: 'rgba(0, 0, 0, 0.15)',
      marginTop: 20,
      marginBottom: 20,
      padding: 5,
      
    },
   
    socialLoginIcon: {
      width: 25,
      height: 25,
    },
  });

export default SocialLogin