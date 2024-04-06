import { configureStore } from "@reduxjs/toolkit";
import users from "./slices/users.slice";  // Cambiado el nombre del import
import auth from "./slices/token.slice";
import incomes from "./slices/incomes.slice";
import balance from "./slices/balance.slice";

const store = configureStore({
  reducer: {
    users,
    auth,
    incomes,
    balance
  },
});

export default store;
