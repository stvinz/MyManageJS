import { createSlice } from '@reduxjs/toolkit'; 
import { nota } from '../services';

export const notaSlice = createSlice({
    name: 'nota',
    initialState: [{
        id: 'TEST', 
        dateCreated: new Date().toISOString().substr(0, 10), 
        name: 'TEST', 
        total: 'TEST'
    }],
    reducers: {
        refresh: async (state, action) => {
            try {
                state = await nota.get();
            }
            catch (err) {
                window.alert(err);
            }
        },
        highlight: async (state, action) => {
            try {
                await nota.highlight();
                state = await nota.get();
            }
            catch (err) {
                window.alert(err);
            }
        }
    }
});

export const { refresh } = notaSlice.actions
export default notaSlice.reducer;
