import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import { setUsers } from '../../store/slices/users.slice';

async function sendToken(idToken) {
    //redux
    const url_base = process.env.EXPO_PUBLIC_API_URL_BASE;
    const url = `url_base/users/verifyGoogleToken`;
    const {userData} = useSelector(state => state)
    const dispatch =  useDispatch()
    //console.log('idToken =========>>>>>>>>>',idToken);
    let tokenSend = {"idToken" : idToken }
    let response;
    if (idToken) {
        console.log('Sending token:');
        axios.post(url, tokenSend)
                .then(res => {
                            response = res.data;
                            console.log('response from back user:==>',response.respuesta);
                            console.log('response from back token:==>',response.token);
                            dispatch(setUsers(res.data.respuesta))
                            AsyncStorage.setItem("@user", JSON.stringify(res.data.respuesta) );
                            AsyncStorage.setItem("@token", JSON.stringify(res.data.token) );
                        } )
                .catch(err => console.log(err))
    }else{
        console.log('there are no idToken to send!!!!!!!!!!!!!!!!_:_:_:_:_:_:_:_:_:_::_:_:_:');
    }
    
    //console.log(await AsyncStorage.getItem("@user", JSON.parse()));
    
    return response;
}

export default sendToken;