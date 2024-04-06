import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useSelector } from 'react-redux';


const UserProfile = () => {
  const [avatarSource, setAvatarSource] = useState(null);
  const user = useSelector(state => state.users);
  
  //console.log('imagen:===>',user.image);
  
  useEffect(() => {
    console.log('global User, (state.users)', user);
    if (user?.image) {
      setAvatarSource({ uri: user?.image });
    }
    
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      //console.log('status of ImagePicker permissions',status)
      if (status !== 'granted') {
        alert('Se necesita permiso para acceder a la galería.');
      }
    })();
  }, [user]);

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setAvatarSource({ uri: result?.uri });
      }
    } catch (error) {
      console.error('Error al seleccionar la imagen:', error);
    }
  };

  return (
    <View style={styles.profile} >
      <TouchableOpacity onPress={selectImage}>
        {avatarSource ? (
          <Image source={ avatarSource } style={{ width: 80, height: 80, borderRadius: 100 }} />
        ) : (
          <View style={{ width: 80, height: 80, borderRadius: 100, backgroundColor: 'lightgray', justifyContent: 'center', alignItems: 'center' }}>
            <Text>imagen de perfil</Text>
          </View>
        )}
      </TouchableOpacity>
      <Text style={styles.textName}>Hola, {user?.firstname} !!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  profile:{
    flexDirection: 'row',
    paddingBottom: 15,
    paddingLeft: 8,
    
  },
  textName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    marginHorizontal: 15,
    alignSelf: 'center',
    textTransform: 'capitalize'
  },
})


export default UserProfile;

