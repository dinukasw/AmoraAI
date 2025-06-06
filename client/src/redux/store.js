import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import { persistReducer, persistStore } from "redux-persist";
import adminReducer from "./user/adminSlice"; // Add this line to import adminReducer
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
    user: userReducer,
    admin: adminReducer, 
});

const persistConfig = {
    key: "root",
    version: 1,
    storage,
};

const presistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: presistedReducer ,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});


export const presistor = persistStore(store);
