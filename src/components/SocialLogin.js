import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
//import Icon from 'react-native-vector-icons/FontAwesome';
// import GoogleLogin from './GoogleLogin';
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import axios from 'axios';
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
		androidClientId: "83523683186-k0o3j3cjd1ch3ucl279omcp4hk0pr4jr.apps.googleusercontent.com",
		iosClientId: "83523683186-acfsse1jd9sq1pu7fp9egn3huufmgjte.apps.googleusercontent.com",
		webClientId: "83523683186-8bkf72s0295k3jq9upke9hep30a28ub5.apps.googleusercontent.com"
	});

  React.useEffect(() => {

		console.log('handleSignInWithGoogle with response:', response);
    if (response) {
      handleSignInWithGoogle();
    }
			
 	}, [response]);

   async function handleSignInWithGoogle(){
		let user = await userLocal;
    
		if (!user) {
			if (response?.type === 'success' ) {
				console.log('using data getted in promptAsyncIdToken........')
				console.log("There aren't user in storage, Google user from de bakend server");
				console.log('response from propmtAsyncIdToken:',response);
					//console.log("idToken:",resp.params.id_token);
				await sendToken(response.params.id_token)
          .then(()=>{
            console.log('Navigating to UserPage');
            navigation.navigate('UserPage');
            })
          .catch(err => {
            console.log('SocialLogin err:==>', err);
            });
				user = await AsyncStorage.getItem("@user");
				console.log('user:==>',user);
				// //setUserInfo(JSON.parse(user));
			}
					// console.log(response.authentication.accessToken);
		}else {
			console.log('User desde Async Storage @user');
      navigation.navigate('UserPage');
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
    },

    socialLoginButton: {
      backgroundColor: '#fff',
      borderRadius: 20,
      borderWidth: 1,
      borderColor: 'rgba(0, 0, 0, 0.15)',
      marginTop: 25,
      marginBottom: 20,
      padding: 5,
      
    },
   
    socialLoginIcon: {
      width: 25,
      height: 25,
    },
  });

export default SocialLogin