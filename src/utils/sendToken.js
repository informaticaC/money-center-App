import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function sendToken(idToken) {
    //redux
    const url_base = process.env.EXPO_PUBLIC_API_URL_BASE;
    const url = `${url_base}/users/verifyGoogleToken`;
     console.log('sendToken.js, line 8, idToken =========>>>>>>>>>',idToken);
    let tokenSend = {"idToken" : idToken }
    let response = '';
    if (idToken) {
        //console.log('Sending Google token to backend server:');//
        await axios.post(url, tokenSend)
          .then(res => {
            response = res.data;
			//console.log('response from back res.data.user:==>',res.data.user);
            //console.log('response from back res.data.token:==>',res.data.token);
            AsyncStorage.setItem("@user", JSON.stringify(res.data.user) ).then(() =>
                AsyncStorage.setItem("@token", JSON.stringify(res.data.token) ).then(() =>
                    {return response}
                )
            );
                   
          })
          .catch(err => {
              console.error('sendToken.js, Error de Axios:===>>>',err);
              return(null);
          })
    }else{
        console.log('there are no idToken to send!!!!');
        return(null);
    }
          return response; 
}

export default sendToken;