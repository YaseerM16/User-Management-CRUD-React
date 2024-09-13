import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type adminI = {
    adminJwt: string
}

const initialStateObj: adminI | null = {
    adminJwt: ""
}

export const asdminSlice = createSlice({
    name: 'admin',
    initialState: initialStateObj,
    reducers: {

        setAdminJwt: (state, action: PayloadAction<string>) => {

            localStorage.setItem('adminJWT', JSON.stringify(action.payload))
            // state.jwt = action.payload
            state.adminJwt = action.payload
            // return action.payload
        },


        logout: (state) => {
            localStorage.removeItem('adminJWT')
            return initialStateObj
        }

    }
})

export const { setAdminJwt, logout } = asdminSlice.actions

export default asdminSlice.reducer