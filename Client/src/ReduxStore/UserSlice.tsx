import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type userI = {
    profilePicture: {
        imageName: string,
        imageUrl: string,
    };
    name: string;
    email: string;
    phone: number;
    password: string;
    token: string;
    userId: string;
    Date: string
}

const initialStateObj: userI | null = {
    name: '',
    email: '',
    phone: 0,
    password: '',
    token: '',
    userId: '',
    profilePicture: {
        imageName: "",
        imageUrl: ""
    },
    Date: ""
}

export const userSlice = createSlice({
    name: 'user',
    initialState: initialStateObj,
    reducers: {

        setUserDetails: (state, action: PayloadAction<userI>) => {
            localStorage.setItem('user', JSON.stringify(action.payload))
            return action.payload
        },

        setUserProfile: (state, action: PayloadAction<{ imageName: string, imageUrl: string }>) => {
            state.profilePicture = action.payload
            localStorage.setItem('user', JSON.stringify(state))
        },

        onLoginDate: (state) => {
            state.Date = String(new Date())
        },

        logout: (state) => {
            localStorage.removeItem('user')
            return initialStateObj
        }

    }
})

export const { setUserDetails, setUserProfile, logout, onLoginDate } = userSlice.actions

export default userSlice.reducer