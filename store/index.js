import { configureStore } from "@reduxjs/toolkit";
import users from "./slices/users.slice";  // Cambiado el nombre del import
import auth from "./slices/token.slice";
import income from "./slices/income.slice";
import expenses from "./slices/expenses.slice"
import balance from "./slices/balance.slice";
import monthSelected from "./slices/monthSelected";

const store = configureStore({
  reducer: {
    users,
    auth,
    income,
    expenses,
    balance,
    monthSelected,
    
  },
});

export default store;
