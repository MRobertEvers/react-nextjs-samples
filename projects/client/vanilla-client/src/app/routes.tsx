import * as React from 'react';
import { BrowserRouter, Switch, Route, useParams } from 'react-router-dom';
import { UsersList } from '../views/UsersList';
import { UserProfile } from '../views/UserProfile';

function WrappedUserProfile() {
	const { id } = useParams() as any;
	return <UserProfile id={id} />;
}

export function Routes() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact>
					<UsersList />
				</Route>
				<Route path="/user/:id">
					<WrappedUserProfile />
				</Route>
			</Switch>
		</BrowserRouter>
	);
}
