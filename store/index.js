import { configureStore } from "@reduxjs/toolkit";
import users from "./slices/users.slice";  // Cambiado el nombre del import
import auth from "./slices/token.slice"

const store = configureStore({
  reducer: {
    users,
    auth  
  },
});

export default store;
