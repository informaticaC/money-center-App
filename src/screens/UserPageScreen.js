import React, { useState } from 'react';
import {View,ScrollView,Image,Dimensions,TouchableOpacity,StyleSheet,Text} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'; // Importa el icono de flecha
import AsyncStorage from '@react-native-async-storage/async-storage';
import Google from '../../assets/img/Google.png';
import Fabicon from '../../assets/favicon.png'
import Icon from '../../assets/icon.png'


const UserPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  //-----inicio de funciones y constantes de Google Login-----
  const [userStored, setUserStored] = React.useState(AsyncStorage.getItem("@user"));//user logueado por google
  const [user, setUser] = React.useState(null); //user mostrado

  console.log('userStored:', userStored);
  
  const  isLogged = () => { //función que devuelve una promesa de recuperar los datos del local storage y cargarlos en userStored
    return new Promise( async (resolve, reject) => {
		  setUserStored(await AsyncStorage?.getItem("@user"));
      resolve(userStored);
    })
	}

	React.useEffect(() => {
    console.log('Is logged?');
    setTimeout(()=>{
      isLogged().then((resolve)=>{
        //console.log('resolve:',resolve);
        if (userStored) {
          setUser(JSON.parse(resolve));
        }
        else{
          //navigation.navigate("Login Screen");
          console.log(user);
        }
      })
      .catch(reject => console.log(reject));
    },100)


   

  }, [userStored]);
 
  
  const ShowUserInfo = ({user})=>{
		console.log({user});
		
		return(
			<View style={styles.showUserInfo}>
				<Text style={styles.text}>Name: {user?.firstname+ ' ' + user.lastname}</Text>
				<Text style={styles.text}>Email: {user?.email}</Text>
				<Image source={{uri: user?.image}} style={{width:100, height:100, borderRadius: 50}} />
			</View>
		)
	}

  const logOut = async () => {
    console.log('Loggin Out!!');
    
    await AsyncStorage.removeItem("@token")
    await AsyncStorage.removeItem("@user")
    setTimeout(() => {
      console.log('goin to LoginScreen');
      navigation.navigate("LoginScreen");
      
    }, 150)
    
  }
//-----fin de funciones y constantes de Google Login------

  const images = [
    (Fabicon),
    (Icon),
    (Fabicon),
  ];

  const handleScroll = (event) => {
    const slideWidth = Dimensions.get('window').width;
    const offset = event.nativeEvent.contentOffset.x;
    const newIndex = Math.floor(offset / slideWidth);
    setCurrentIndex(newIndex);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <View style={styles.container}>
      
      {
        user? <ShowUserInfo user={user} /> : <Text>"Not logued yet"</Text>
      }
      <TouchableOpacity onPress={handlePrevious} style={styles.arrow}>
        <FontAwesomeIcon name="chevron-left" size={30} color="blue" />
      </TouchableOpacity>
      
      {/* <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
      >
        {images.map((image, index) => (
          <Image key={index} source={image} style={styles.image} />
        ))}
      </ScrollView> */}
      <TouchableOpacity onPress={handleNext} style={styles.arrow}>
        <FontAwesomeIcon name="chevron-right" size={30} color="blue" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.socialLoginButton} onPress={() =>  logOut() }>
          <View style={styles.socialLoginOption}>
            <Text style={styles.socialLoginText}>Logout </Text>
            <Image source={Google} style={styles.socialLoginIcon} />
          </View>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row', // Asegura que las flechas estén en línea con el slider
  },
  arrow: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
  },
  image: {
    width: Dimensions.get('window').width,
    height: 200,
  },
  showUserInfo:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default UserPage;
