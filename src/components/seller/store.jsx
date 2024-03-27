// store.js

import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers'; // Assuming you have your root reducer defined in a file called reducers.js

const store = configureStore({
  reducer: rootReducer,
  // Other middleware and configuration can be added here
});

export default store;
