import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  cart: [],
  auth: localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : false,
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {},
  token : localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : {},
  address : localStorage.getItem('address') ? JSON.parse(localStorage.getItem('address')) : {},
  order : localStorage.getItem('order') ? JSON.parse(localStorage.getItem('order')) : {},
  loading: false
};


export const counterSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.auth  = action.payload;
      localStorage.setItem('auth', JSON.stringify(action.payload));
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setUser: (state, action) => {
      state.user = action.payload
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    setToken: (state, action) => {
      state.token = action.payload
      localStorage.setItem('token', JSON.stringify(action.payload));
    },
    setAddress: (state, action) => {
      state.token = action.payload
      localStorage.setItem('address', JSON.stringify(action.payload));
    },
    setOrder: (state, action) => {
      state.token = action.payload
      localStorage.setItem('order', JSON.stringify(action.payload));
    },
  },
});

export default counterSlice.reducer;