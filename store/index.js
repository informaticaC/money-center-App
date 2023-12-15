import { configureStore } from "@reduxjs/toolkit";
import users from "./slices/users.slice";  // Cambiado el nombre del import

const store = configureStore({
  reducer: {
    users  // Cambiado de "users" a "user"
  },
});

export default store;
