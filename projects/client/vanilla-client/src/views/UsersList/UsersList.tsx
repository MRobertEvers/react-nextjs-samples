import * as React from 'react';
import { UsersListBody } from './components/UsersListBody';
import { UsersListHeader } from './components/UsersListHeader';
import { UsersListFooter } from './components/UsersListFooter';
import { Page } from '../../components/Page';

import styles from './users-list.module.css';
import { Link } from 'react-router-dom';

export function UsersList() {
	return (
		<Page title="Users">
			<Link to="/high">High</Link>
			<Link to="/low">Low</Link>
			<div className={styles['users-list']}>
				<div className={styles['users-list-infinite-scroll-container']}>
					<UsersListHeader />
					<UsersListBody />
					<UsersListFooter />
				</div>
			</div>
		</Page>
	);
}
