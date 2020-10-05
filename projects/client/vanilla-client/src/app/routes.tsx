import * as React from 'react';
import { Suspense, lazy } from 'react';
import { BrowserRouter, Switch, Route, useParams } from 'react-router-dom';
import { LoadingIndicator } from '../components/LoadingIndicator';
import { High } from '../views/RenderTest/High';
import { Low } from '../views/RenderTest/Low';

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
					<Route path="/high">
						<High />
					</Route>
					<Route path="/low">
						<Low />
					</Route>
				</Switch>
			</LoadingSuspense>
		</BrowserRouter>
	);
}
