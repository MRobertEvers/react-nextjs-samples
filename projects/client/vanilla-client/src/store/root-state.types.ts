import { UsersListSlice } from '../views/UsersList/redux/users-list.types';
import { RenderTestSlice } from '../views/RenderTest/redux/render-test.types';

export type RootState = {
	usersList: UsersListSlice;
	renderTest: RenderTestSlice;
};
