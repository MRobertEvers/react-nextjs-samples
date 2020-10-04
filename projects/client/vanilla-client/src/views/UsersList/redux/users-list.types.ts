import type { APINextToken, APIUserModel } from '../../../api/fetch-users-pages';

export type UsersListStateUserMap = {
	[x: string]: APIUserModel;
};

export type UsersListSlice = {
	users: UsersListStateUserMap; // Keep user in hash-map so we can quickly look them up.
	nextToken?: APINextToken;
	isLoadingUsers: boolean;
	isLoadMoreAvailable: boolean;
	filter: string;
};
