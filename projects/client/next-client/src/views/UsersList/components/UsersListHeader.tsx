import { UsersListSearch } from './UsersListSearch';

import styles from './users-list-body.module.css';

export function UsersListHeader() {
	return (
		<div className={styles['users-list-body-header']}>
			<div className={styles['user-card-grid-element']}>
				<h1 className={styles['users-list-body-header-title']}>Users list</h1>
			</div>
			<div className={styles['user-card-grid-element users-list-header-spacer']}></div>
			<div className={styles['user-card-grid-element users-list-header-search']}>
				<div className={styles['users-list-header-search-center']}>
					<UsersListSearch />
				</div>
			</div>
		</div>
	);
}
