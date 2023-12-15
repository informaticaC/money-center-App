import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet,ImageBackground} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from '../../assets/img/moneylogo.png';
import Fondo3 from '../../assets/img/fondo3.png';
import {useSelector, useDispatch } from 'react-redux';


const MoneyCenter = () => {

  const navigation = useNavigation();
  const [user, setUser] = React.useState(null);
  const [userStored, setUserStored] = React.useState(AsyncStorage.getItem("@user"));
  
  const users = useSelector(state => state.users)
  const dispatch = useDispatch()

  
  const  isLogged = () => { //función que devuelve una promesa de recuperar los datos del local storage y cargarlos en userStored
    return new Promise( async (resolve, reject) => {
		  setUserStored(await AsyncStorage.getItem("@user"));
      //setUsers(await AsyncStorage.getItem("@user"))
      resolve(userStored);
      
    })
	}

	React.useEffect(() => {
    
    isLogged()
      .then ((resolve) => {
        //console.log('resolve:',resolve);
        if (userStored) {
          //console.log(userStored)
          //setUser(JSON.parse(userStored));
          navigation.navigate('MainTabs', { screen: 'inicio'});
        }
        else{
          navigation.navigate("MoneyCenter");
          //console.log(user);
        }
      })
      .catch(reject => console.log(reject));

  }, [userStored]);

  //console.log('user:', user);

  const ShowUserInfo = ({users})=>{
		//console.log({users});
		
		return(
			<View style={styles.container}>
				<Text style={styles.text}>Name: {user.firstname+ ' ' + user.lastname}</Text>
				<Text style={styles.text}>Email: {user?.email}</Text>
				<Image source={{uri: user?.image}} style={{width:100, height:100, borderRadius: 50}} />
			</View>
		)
	}

  const logOut = async () => {
    console.log('Loggin Out!!')
    await AsyncStorage.removeItem("@user");
    setTimeout(() => {
      console.log('goin to Home Page');
      navigation.navigate("LoginScreen");
      
    }, 50);
    console.log('Already Out!!');
  }
    
  return (
    <ImageBackground
      source={Fondo3}
      style={styles.backgroundImage}
    >
      <View style={{flex:0.8, justifyContent: 'center', alignItems: 'center'}}>
        <View style={{justifyContent: 'center', alignItems: 'center', marginTop:50}}>
          <Image source={Logo} style={styles.logo}/>
          <Text style={styles.moneyCenterText}>Money Center</Text>
        </View>
          <Text style={styles.title}>¡Bienvenido!</Text>
          <Text style={styles.text}>Controla tus finanzas con nosotros</Text>
          <Text style={styles.title2}>¡Empieza hoy!</Text>
        <TouchableOpacity style={styles.button}
          onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('RegisterScreen')}
        > 
          <Text style={styles.buttonText}>Crear cuenta</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={logOut}>
           <Text>logOut</Text>
          </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
    backgroundImage: {
      flex: 1,
      resizeMode: 'cover',
    },
    title: {
      marginTop: 80,
      marginBottom: 70,
      fontSize:40,
      fontWeight: 'bold',    
     },

     title2: {
      marginBottom: 40,
      fontSize:20,
      fontWeight: 'bold',   
     },

     text: {
      fontSize: 18
     },

    moneyCenterText: {
      color: 'black', // Color de texto predeterminado
      fontSize: 24, // Tamaño de fuente
      fontWeight: 'bold', // Peso de fuente en negrita
    },
    
    button: {
      backgroundColor: "#22904E", // Color de fondo
      borderRadius: 10, // Bordes redondeados
      padding: 10, // Relleno interno
      margin: 10, // Margen superior
      width: '50%', // Ancho del botón
      alignItems: 'center', // Alinear contenido al centro horizontalmente
    },
    buttonText: {
      color: '#fff', 
      fontSize: 20, 
    },
    logo: {
      width: 140,
      height: 140,
      marginBottom: 5,
      borderRadius:5
      
    },
  });




export default MoneyCenter;