// web 83523683186-8bkf72s0295k3jq9upke9hep30a28ub5.apps.googleusercontent.com
// ios 83523683186-acfsse1jd9sq1pu7fp9egn3huufmgjte.apps.googleusercontent.com
// android 83523683186-k0o3j3cjd1ch3ucl279omcp4hk0pr4jr.apps.googleusercontent.com
import * as React from 'react'
import { StatusBar } from 'expo-status-bar'
import { Button, Image, StyleSheet, Text, View } from 'react-native'
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import sendToken from '../utils/sendToken';



WebBrowser.maybeCompleteAuthSession();


const GoogleLogin = () => {
	//console.log("Estoy en GoogleLogin!!");
	const navigation = useNavigation();

	const [userLocal, setUserLocal] = React.useState(AsyncStorage.getItem("@user"));
	const [userInfo, setUserInfo] = React.useState();
	// const [request, response, promptAsync] = Google.useAuthRequest({
	// 	androidClientId: "83523683186-k0o3j3cjd1ch3ucl279omcp4hk0pr4jr.apps.googleusercontent.com",
	// 	iosClientId: "83523683186-acfsse1jd9sq1pu7fp9egn3huufmgjte.apps.googleusercontent.com",
	// 	webClientId: "83523683186-8bkf72s0295k3jq9upke9hep30a28ub5.apps.googleusercontent.com"
	// });
	//const [userData, setuserData] = React.useState();

	const [request, response, promptAsyncIdToken] = Google.useIdTokenAuthRequest({
		androidClientId: "83523683186-k0o3j3cjd1ch3ucl279omcp4hk0pr4jr.apps.googleusercontent.com",
		iosClientId: "83523683186-acfsse1jd9sq1pu7fp9egn3huufmgjte.apps.googleusercontent.com",
		webClientId: "83523683186-8bkf72s0295k3jq9upke9hep30a28ub5.apps.googleusercontent.com"
	});
	

	React.useEffect(() => {
		console.log('handleSignInWithGoogle with response:', response);
	 		handleSignInWithGoogle();
			
 	}, [response]);

	// const fetchUser =
	function getActualUserInfo() {
		return new Promise((resolve, reject) => {
			let userinfo;
			userinfo = userInfo;
			resolve(userinfo);
		})
	}

	const isUserInfo = async function (){
		let userinfo = await getActualUserInfo();
		return userinfo;
		
	}

		
	async function handleSignInWithGoogle(){
		
		let user = await userLocal;
				
		if (!user) {
			if (response) {
				console.log('using data getted in promptAsyncIdToken........')
				console.log("There aren't user in storage, Google user from de bakend server");
				console.log('response from propmtAsyncIdToken:',response);
					//console.log("idToken:",resp.params.id_token);
				await sendToken(response.params.id_token);
				console.log(AsyncStorage.getItem("@user"));
				await AsyncStorage.getItem("@user").then(googleUser => console.log(googleUser));
				user = await AsyncStorage.getItem("@user");
				console.log(user);
				setUserInfo(JSON.parse(user));
				
			}
					// console.log(response.authentication.accessToken);
		}else {
			console.log('User desde Async Storage @user');
			setUserInfo(JSON.parse(user));
		}
	};
	
	function getUserInfo(token) {
		const url="https://www.googleapis.com/userinfo/v2/me";
		if(!token) return;
		//console.log('143 Send token:',token);
		//sendToken(token);
		try{
			axios.get(url, {headers: {Authorization: `Bearer ${token}`}})
			.then((res) => {
				setUserInfo(res.data);
				//console.log(res.data);
				AsyncStorage.setItem("@user", JSON.stringify(res.data));
				//console.log(AsyncStorage.getItem("@user"));
								
			})          
			.catch((err)=> console.log(err));
		} catch (error){
			console.log(error);
		}
	};
	
	const ShowUserInfo = ({user})=>{
		//console.log(user);
			
		return(
			<View style={styles.container}>
				<Image source={{uri: user?.image}} style={{width:60, height:60, borderRadius: 50}} />
				<Text style={styles.text}>Name: {user?.firstname+ ' ' +user?.lastname}</Text>
				<Text style={styles.text}>Email: {user?.email}</Text>
			</View>
		)
	}
	
	const handleRegister = (dataReturn) => {
			//console.log('dataReturn',dataReturn);
		  const url ="http://localhost:8080/api/v1/users";
		  axios.post(url, dataReturn)
			.then(res => console.log(res.data))
			.catch(err => console.log(err))
		};
	
  return (
	<>
		<View style={styles.container}>
        	<Text>GoogleLogin</Text>
			<Button title='Sign in with Google' onPress={() =>  promptAsyncIdToken() }></Button>
			{
				 userInfo? (
				 	<>
				 		<ShowUserInfo user={userInfo} />
				 	</>
			 ) : <Text>"Not logued yet"</Text>
			} 
			<Button title='Log out' onPress={() => AsyncStorage.removeItem("@user")}>Log off</Button>
	    	<StatusBar style='auto'/>
    	</View>
			
	</>
   

  );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: "#ccc",
        alignItems: "center",
        justifyContent: "center",
		
    },
	text: {
		color: "black",
	}
});

export default GoogleLogin