import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import { wishlistReducer } from "./reducers/wishlist.js";
import { cartReducer } from "./reducers/cart.js";

export const store = configureStore({
    reducer: {
        user: userReducer,
        wishlist: wishlistReducer,
        cart: cartReducer
    }
});