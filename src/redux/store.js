// import { configureStore } from "@reduxjs/toolkit";
// import { reducer } from "./reducer";

// const store = configureStore({
//    reducer: reducer
// })

// 


import { configureStore } from '@reduxjs/toolkit';
import { reducer } from "./reducer";

const store = configureStore({
   reducer: {
      todos: reducer,
   },
});

export default store;