import { createSlice } from '@reduxjs/toolkit';
import { UsersListSlice } from './users-list.types';
import { UsersListActions } from './users-list.actions';

export const initialUsersListSlice: UsersListSlice = {
	users: {},
	isLoadingUsers: false,
	isLoadMoreAvailable: true,
	filter: ''
};

export const usersListSlice = createSlice({
	name: 'usersList',
	initialState: initialUsersListSlice,
	// Ignore this field for typed reducers
	reducers: {},
	extraReducers: (builder) =>
		builder
			.addCase(UsersListActions.getPages.pending, (slice, action) => {
				slice.isLoadingUsers = true;
			})
			.addCase(UsersListActions.getPages.rejected, (slice, action) => {
				slice.isLoadMoreAvailable = false;
				slice.isLoadingUsers = false;
			})
			.addCase(UsersListActions.getPages.fulfilled, (slice, action) => {
				const newUsers = action.payload.users;
				for (let newUser of newUsers) {
					slice.users[newUser.id] = newUser;
				}
				slice.isLoadingUsers = false;
			})
			.addCase(UsersListActions.setFilter, (slice, action) => {
				const newFilter = action.payload;
				slice.filter = newFilter;
			})
});
