import { UsersListBody } from './components/UsersListBody';
import { UsersListHeader } from './components/UsersListHeader';
import { UsersListFooter } from './components/UsersListFooter';

import styles from './users-list.module.css';

export function UsersList() {
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
