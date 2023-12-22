import AsyncStorage from '@react-native-async-storage/async-storage';

const getConfigToken = () => ({
    headers: {
      Authorization:`Bearer ${AsyncStorage.getItem("@token")}`
    }
  })
  
  export default getConfigToken