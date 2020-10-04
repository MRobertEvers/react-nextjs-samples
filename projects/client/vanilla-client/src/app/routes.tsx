import * as React from 'react';
import { Suspense, lazy } from 'react';
import { BrowserRouter, Switch, Route, useParams } from 'react-router-dom';
import { LoadingIndicator } from '../components/LoadingIndicator';
const UsersList = lazy(() => import('../views/UsersList'));
const UserProfile = lazy(() => import('../views/UserProfile'));

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

	return (
		<LoadingSuspense>
			<UserProfile id={id} />
		</LoadingSuspense>
	);
}

export function Routes() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact>
					<LoadingSuspense>
						<UsersList />
					</LoadingSuspense>
				</Route>
				<Route path="/user/:id">
					<WrappedUserProfile />
				</Route>
			</Switch>
		</BrowserRouter>
	);
}
