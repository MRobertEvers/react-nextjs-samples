import * as React from 'react';
import { Suspense, lazy } from 'react';
import { BrowserRouter, Switch, Route, useParams } from 'react-router-dom';
import { LoadingIndicator } from '../components/LoadingIndicator';

const UsersList = lazy(() => import(/* webpackChunkName: "users-list" */ '../views/UsersList'));
const UserProfile = lazy(() => import(/* webpackChunkName: "user-profile" */ '../views/UserProfile'));

function LoadingSuspense(props: React.PropsWithChildren<{}>) {
	const { children } = props;
	return (
		<Suspense
			fallback={
				<LoadingIndicator
					style={{
						margin: 'auto',
						height: '32px',
						width: '32px'
					}}
				/>
			}
		>
			{children}
		</Suspense>
	);
}

function WrappedUserProfile() {
	const { id } = useParams() as any;

	return <UserProfile id={id} />;
}

export function Routes() {
	return (
		<BrowserRouter>
			<LoadingSuspense>
				<Switch>
					<Route path="/" exact>
						<UsersList />
					</Route>
					<Route path="/user/:id">
						<WrappedUserProfile />
					</Route>
					<Route path="/user/:id/slogans/:tagId">
						<WrappedUserSlogans />
					</Route>
				</Switch>
			</LoadingSuspense>
		</BrowserRouter>
	);
}
