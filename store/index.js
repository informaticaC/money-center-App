import { configureStore } from "@reduxjs/toolkit";
import users from "./slices/users.slice";  // Cambiado el nombre del import
import auth from "./slices/token.slice";
import incomes from "./slices/incomes.slice";
import balance from "./slices/balance.slice";
import monthSelected from "./slices/monthSelected";
import reload from "./slices/reload.slice";


const store = configureStore({
  reducer: {
    users,
    auth,
    incomes,
    balance,
    monthSelected,
    reload
  },
});

export default store;
