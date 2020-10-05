import { createSlice } from '@reduxjs/toolkit';
import { RenderTestSlice } from './render-test.types';
import { RenderTestActions } from './render-test.actions';

export const initialRenderTestSlice: RenderTestSlice = {
	name: '',
	description: ''
};

export const renderTestSlice = createSlice({
	name: 'renderTest',
	initialState: initialRenderTestSlice,
	// Ignore this field for typed reducers
	reducers: {},
	extraReducers: (builder) =>
		builder
			.addCase(RenderTestActions.setName, (slice, action) => {
				slice.name = action.payload;
			})
			.addCase(RenderTestActions.setDescription, (slice, action) => {
				slice.description = action.payload;
			})
			.addCase(RenderTestActions.setState, (slice, action) => {
				slice.description = action.payload.description;
				slice.name = action.payload.name;
			})
});
