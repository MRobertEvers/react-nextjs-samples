import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { FetchGetPagesResult, fetchGetPages } from '../../../api/fetch-users-pages';

const PAGE_SIZE = 5;

type GetPagesThunkArgs = {
	pageCount: number;
};
type GetPagesThunkResult = {
	users: FetchGetPagesResult;
	nextToken: number;
};
const getPages = createAsyncThunk<GetPagesThunkResult, GetPagesThunkArgs>(
	'usersList/getPages',
	async function getPagesThunk(args) {
		const { pageCount } = args;

		const result = await fetchGetPages(0, pageCount * PAGE_SIZE);

		return {
			users: result,
			nextToken: pageCount * PAGE_SIZE
		};
	}
);

export const UsersListActions = {
	getPages: getPages,
	setFilter: createAction<string>('usersList/setFilter')
};
