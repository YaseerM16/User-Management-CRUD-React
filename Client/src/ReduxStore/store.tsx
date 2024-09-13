import { configureStore, Store } from "@reduxjs/toolkit"
import UserSlice from "./UserSlice"
import AdminSlice from "./AdminSlice"


const store = configureStore({
    reducer: {
        userState: UserSlice,
        adminState: AdminSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
