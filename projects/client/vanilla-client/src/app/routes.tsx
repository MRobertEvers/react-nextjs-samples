import * as React from 'react';
import { Suspense, lazy } from 'react';
import { BrowserRouter, Switch, Route, useParams } from 'react-router-dom';
import { LoadingIndicator } from '../components/LoadingIndicator';

import UsersList from '../views/UsersList';
import UserProfile from '../views/UserProfile';
import UserTag from '../views/UserTag';

function WrappedUserProfile() {
	const { id } = useParams() as any;

	return <UserProfile id={id} />;
}

function WrappedUserTag() {
	const { id, tagId } = useParams() as any;

	return <UserTag userId={id} tagId={tagId} />;
}

export function Routes() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact>
					<UsersList />
				</Route>
				<Route path="/user/:id" exact>
					<WrappedUserProfile />
				</Route>
				<Route path="/user/:id/tags/:tagId">
					<WrappedUserTag />
				</Route>
			</Switch>
		</BrowserRouter>
	);
}
