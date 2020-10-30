import { configureStore } from '@reduxjs/toolkit';
import notaReducer from './slices/notaSlices';

export default configureStore({
    reducer: {
        nota: notaReducer
    }
});