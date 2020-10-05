import { configureStore as configureStoreToolkit, getDefaultMiddleware } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import type { RootState } from './root-state.types';
import { usersListSlice } from '../views/UsersList/redux/users-list.slice';
import { renderTestSlice } from '../views/RenderTest/redux/render-test.slice';

const rootReducer = combineReducers<RootState>({
	[usersListSlice.name]: usersListSlice.reducer,
	[renderTestSlice.name]: renderTestSlice.reducer
});

export function configureStore() {
	return configureStoreToolkit({
		reducer: rootReducer,
		middleware: getDefaultMiddleware()
	});
}
