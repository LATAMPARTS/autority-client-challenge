import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	client: { toggleForm: false, formId: undefined, deleteId: null }
};

export const ReducerSlice = createSlice({
	name: 'autority-challenge',
	initialState,
	reducers: {
		toggleChangeAction: (state): void => {
			state.client.toggleForm = !state.client.toggleForm;
		},
		updateAction: (state, action): void => {
			state.client.formId = action.payload;
		},
		deleteAction: (state, action): void => {
			state.client.deleteId = action.payload;
		}
	}
});

export const { toggleChangeAction, updateAction, deleteAction } = ReducerSlice.actions;

export default ReducerSlice.reducer;
