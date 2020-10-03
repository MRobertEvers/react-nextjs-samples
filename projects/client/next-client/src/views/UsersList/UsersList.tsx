import { UsersListBody } from './components/UsersListBody';
import { UsersListHeader } from './components/UsersListHeader';
import { UsersListFooter } from './components/UsersListFooter';

import styles from './users-list.module.css';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { UsersListActions } from './redux/users-list.actions';

export function UsersList() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(UsersListActions.getPages({ pageCount: 1 }));
	}, []);

	return (
		<div className={styles['users-list']}>
			<div className={styles['users-list-infinite-scroll-container']}>
				<UsersListHeader />
				<UsersListBody />
				<UsersListFooter />
			</div>
		</div>
	);
}

export default UsersList;
