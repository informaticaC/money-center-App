import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const UserProfile = () => {
  const [avatarSource, setAvatarSource] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Se necesita permiso para acceder a la galería.');
      }
    })();
  }, []);

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.cancelled) {
        setAvatarSource({ uri: result.uri });
      }
    } catch (error) {
      console.error('Error al seleccionar la imagen:', error);
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={selectImage}>
        {avatarSource ? (
          <Image source={avatarSource} style={{ width: 80, height: 80, borderRadius: 100 }} />
        ) : (
          <View style={{ width: 80, height: 80, borderRadius: 100, backgroundColor: 'lightgray', justifyContent: 'center', alignItems: 'center' }}>
            <Text>Seleccionar imagen de perfil</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default UserProfile;

