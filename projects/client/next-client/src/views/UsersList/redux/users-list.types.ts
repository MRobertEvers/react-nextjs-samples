export type APIUserModel = {
	// I'm going to minimally require that the client ALWAYS
	// requests the id and the name...
	id: string;
	name: string;
	dob?: string;
	address?: string;
	description?: string;
	createdAt?: number;
	updatedAt?: number;
};

export type APINextToken = {
	id: string;
};

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
